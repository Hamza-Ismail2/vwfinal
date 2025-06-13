const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const Image = require('../models/Image');
const connectDB = require('../config/db');

(async () => {
  try {
    await connectDB();

    const uploadsDir = path.join(__dirname, '../uploads');
    let files = fs.readdirSync(uploadsDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

    // If uploads directory is empty, seed it with sample images from client/src/images
    if (files.length === 0) {
      const seedMapping = {
        'kahua-VIP-arrival-scaled.jpg': '1-gallery-vip-arrival.jpg',
        'kahua-VIP-arrival-scaled (1).jpg': '2-gallery-vip-premium.jpg',
        'Raptor_ATV_action-scaled.jpg': '3-gallery-raptor-atv.jpg',
        'Oahu-Magnum-Experience-over-water-scaled.jpg': '4-gallery-oahu-magnum.jpg',
        'OA_WEDD_MAG_OFF_004-SHIBSTY-1-scaled.jpg': '5-gallery-wedding-photo.jpg',
        'OA_WEDD_MAG_OFF_004-SHIBSTY-1-scaled (1).jpg': '6-gallery-wedding-aerial.jpg',
        'IMG_7097-scaled-1-1462x2048.jpg': '7-gallery-hawaiian-landscape.jpg',
        'IMG_7075-scaled.jpg': '8-gallery-coastal-ops.jpg',
        'IMG_7065-scaled.jpg': '9-gallery-island-aviation.jpg',
        'Horseback_blueSky.jpg': '10-gallery-horseback-sky.jpg',
        'HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg': '11-gallery-koh-coast.jpg',
        'Bell-407-Hughes-500-Flight-over-Old-Flow.jpg': '12-gallery-bell-hughes.jpg',
        'Bell-407-Hughes-500-Flight-over-Old-Flow (1).jpg': '13-gallery-fleet-ops.jpg',
        'L1030042-2-1-scaled-1-1366x2048.jpg': '14-gallery-professional-aviation.jpg'
      };

      const sourceDir = path.join(__dirname, '../../client/src/images');

      Object.entries(seedMapping).forEach(([src, dest]) => {
        const srcPath = path.join(sourceDir, src);
        const destPath = path.join(uploadsDir, dest);
        if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied ${src} -> ${dest}`);
        }
      });

      // refresh file list
      files.push(...fs.readdirSync(uploadsDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)));
    }

    const customMeta = {
      '1-gallery-vip-arrival': {
        title: 'VIP Arrival At Helipad',
        description: 'Executive guests disembark a sleek helicopter onto a tropical helipad, highlighting Vertical Worx VIP charter service.'
      },
      '2-gallery-vip-premium': {
        title: 'Premium Cabin Interior',
        description: 'Luxurious leather cabin seats demonstrate the comfort of Vertical Worx premium charters.'
      },
      '3-gallery-raptor-atv': {
        title: 'Raptor ATV Sling Load',
        description: 'Bell 407 lifts a Raptor ATV for rapid remote deployment, showcasing our precision external load expertise.'
      },
      '4-gallery-oahu-magnum': {
        title: "O'ahu Coastal Patrol",
        description: "Magnum-style MD500 cruises along O'ahu's coastline on a scenic air-tour."
      },
      '5-gallery-wedding-photo': {
        title: 'Wedding Aerial Portrait',
        description: 'Newly-wed couple pose beside a red helicopter for an unforgettable wedding photo-shoot.'
      },
      '6-gallery-wedding-aerial': {
        title: 'Aerial Wedding Fly-over',
        description: 'Bride and groom wave from a helicopter above their beachfront ceremony.'
      },
      '7-gallery-hawaiian-landscape': {
        title: "Hawaiian Waterfall Vista",
        description: "Helicopter passes a towering waterfall deep within Kaua'i's emerald valleys."
      },
      '8-gallery-coastal-ops': {
        title: 'Coastal Search & Rescue',
        description: 'Crew performs training manoeuvres above turquoise coastal waters.'
      },
      '9-gallery-island-aviation': {
        title: 'Island Hop Charter',
        description: 'Airbus H130 skirts low over crystal-clear lagoon en-route to a neighbouring island.'
      },
      '10-gallery-horseback-sky': {
        title: 'Horseback Adventure Transfer',
        description: 'Guests on horseback await a helicopter pickup for an all-terrain adventure.'
      },
      '11-gallery-koh-coast': {
        title: 'Kohala Sea Cliffs',
        description: 'A helicopter hugs dramatic Kohala coast sea-cliffs during a private tour.'
      },
      '12-gallery-bell-hughes': {
        title: 'Bell 206 JetRanger',
        description: 'Classic Bell JetRanger poised on the tarmac ready for an inter-island mission.'
      },
      '13-gallery-fleet-ops': {
        title: 'Fleet Readiness Line-up',
        description: 'Vertical Worx fleet serviced and pre-flighted, ready for multi-mission operations.'
      },
      '14-gallery-professional-aviation': {
        title: 'Professional Flight Crew',
        description: 'Uniformed pilot briefs passengers before boarding for a scenic flight.'
      }
    };

    let added = 0;
    let updated = 0;
    for (const file of files) {
      // Build metadata (custom or generated) first
      const baseName = path.basename(file, path.extname(file));

      let title, description;
      if (customMeta[baseName]) {
        ({ title, description } = customMeta[baseName]);
      } else {
        // auto logic
        let cleaned = baseName
          .replace(/^\d+\s*[-_]?/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b(?:gallery|img|image|photo|picture)\b/gi, '')
          .replace(/\s+/g, ' ')
          .trim();
        // deduplicate
        const uniqueWords = [];
        cleaned.split(' ').forEach(w => {
          const lw = w.toLowerCase();
          if (!uniqueWords.map(u => u.toLowerCase()).includes(lw)) uniqueWords.push(w);
        });
        cleaned = uniqueWords.join(' ');
        title = cleaned ? cleaned.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Untitled';
        description = `Vertical Worx helicopter services – ${title}. Stunning aerial perspective.`;
      }

      const stats = fs.statSync(path.join(uploadsDir, file));
      const url = `/uploads/${file}`;

      const existing = await Image.findOne({ filename: file });
      if (existing) {
        await Image.updateOne({ _id: existing._id }, {
          $set: {
            title,
            description,
            url,
            size: stats.size,
          }
        });
        updated++;
      } else {
        await Image.create({
          title,
          description,
          url,
          filename: file,
          originalName: file,
          contentType: `image/${path.extname(file).replace('.', '')}`,
          size: stats.size,
          order: 0,
        });
        added++;
      }
    }

    console.log(`Populate complete. Added ${added} new images, updated ${updated}.`);
    process.exit(0);
  } catch (err) {
    console.error('Populate error:', err);
    process.exit(1);
  }
})(); 