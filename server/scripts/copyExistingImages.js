const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Image = require('../models/Image');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vertical-worx');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Mapping of old image paths to new filenames and data
const imageMapping = {
    'kahua-VIP-arrival-scaled.jpg': {
        newName: '1-gallery-vip-arrival.jpg',
        title: 'VIP Arrival Services',
        description: 'Luxury helicopter arrival services for VIP clients',
        order: 1
    },
    'kahua-VIP-arrival-scaled (1).jpg': {
        newName: '2-gallery-vip-premium.jpg',
        title: 'Premium VIP Experience',
        description: 'High-end transportation solutions',
        order: 2
    },
    'Raptor_ATV_action-scaled.jpg': {
        newName: '3-gallery-raptor-atv.jpg',
        title: 'Raptor ATV Operations',
        description: 'All-terrain vehicle transport and support',
        order: 3
    },
    'Oahu-Magnum-Experience-over-water-scaled.jpg': {
        newName: '4-gallery-oahu-magnum.jpg',
        title: 'Oahu Magnum Experience',
        description: 'Spectacular flights over Hawaiian waters',
        order: 4
    },
    'OA_WEDD_MAG_OFF_004-SHIBSTY-1-scaled.jpg': {
        newName: '5-gallery-wedding-photo.jpg',
        title: 'Wedding Photography Flight',
        description: 'Aerial cinematography for special events',
        order: 5
    },
    'OA_WEDD_MAG_OFF_004-SHIBSTY-1-scaled (1).jpg': {
        newName: '6-gallery-wedding-aerial.jpg',
        title: 'Wedding Aerial Services',
        description: 'Professional wedding photography from above',
        order: 6
    },
    'IMG_7097-scaled-1-1462x2048.jpg': {
        newName: '7-gallery-hawaiian-landscape.jpg',
        title: 'Hawaiian Landscape',
        description: 'Breathtaking views of Hawaii\'s natural beauty',
        order: 7
    },
    'IMG_7075-scaled.jpg': {
        newName: '8-gallery-coastal-ops.jpg',
        title: 'Coastal Operations',
        description: 'Professional helicopter operations along the coast',
        order: 8
    },
    'IMG_7065-scaled.jpg': {
        newName: '9-gallery-island-aviation.jpg',
        title: 'Island Aviation',
        description: 'Expert aviation services across the Hawaiian Islands',
        order: 9
    },
    'Horseback_blueSky.jpg': {
        newName: '10-gallery-horseback-sky.jpg',
        title: 'Horseback & Blue Sky',
        description: 'Perfect day for aerial adventures',
        order: 10
    },
    'HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg': {
        newName: '11-gallery-koh-coast.jpg',
        title: 'Koh Coast Flight',
        description: 'Flying along Hawaii\'s stunning coastline',
        order: 11
    },
    'Bell-407-Hughes-500-Flight-over-Old-Flow.jpg': {
        newName: '12-gallery-bell-hughes.jpg',
        title: 'Bell 407 & Hughes 500',
        description: 'Our professional helicopter fleet in action',
        order: 12
    },
    'Bell-407-Hughes-500-Flight-over-Old-Flow (1).jpg': {
        newName: '13-gallery-fleet-ops.jpg',
        title: 'Fleet Operations',
        description: 'Multiple aircraft coordinated operations',
        order: 13
    },
    'L1030042-2-1-scaled-1-1366x2048.jpg': {
        newName: '14-gallery-professional-aviation.jpg',
        title: 'Professional Aviation',
        description: 'Expert helicopter services and operations',
        order: 14
    }
};

const copyImagesAndPopulateDB = async () => {
    try {
        await connectDB();
        
        // Define paths
        const clientImagesPath = path.join(__dirname, '../../client/src/images');
        const serverUploadsPath = path.join(__dirname, '../uploads');
        
        // Ensure uploads directory exists
        if (!fs.existsSync(serverUploadsPath)) {
            fs.mkdirSync(serverUploadsPath, { recursive: true });
            console.log('Created uploads directory');
        }
        
        // Clear existing images from database
        await Image.deleteMany({});
        console.log('Cleared existing images from database');
        
        const createdImages = [];
        
        // Read files and create database entries
        for (const [originalName, imageData] of Object.entries(imageMapping)) {
            const sourcePath = path.join(clientImagesPath, originalName);
            
            try {
                // Check if source file exists
                if (fs.existsSync(sourcePath)) {
                    console.log(`Processing: ${originalName}`);
                    
                    // Read the image file as binary data
                    const imageBuffer = fs.readFileSync(sourcePath);
                    const mimetype = originalName.endsWith('.jpg') || originalName.endsWith('.jpeg') ? 'image/jpeg' : 'image/png';

                    // Create database entry with binary image data
                    const dbImage = await Image.create({
                        title: imageData.title,
                        description: imageData.description,
                        image: {
                            data: imageBuffer,
                            contentType: mimetype,
                            filename: imageData.newName,
                            originalName: originalName,
                            size: imageBuffer.length
                        },
                        order: imageData.order,
                        isActive: true
                    });
                    
                    createdImages.push(dbImage);
                    console.log(`Created DB entry: ${imageData.title}`);
                } else {
                    console.warn(`Source file not found: ${sourcePath}`);
                }
            } catch (error) {
                console.error(`Error processing ${originalName}:`, error.message);
            }
        }
        
        console.log(`\n✅ Successfully processed ${createdImages.length} images`);
        console.log('\nDatabase entries:');
        createdImages.forEach((image, index) => {
            console.log(`${index + 1}. ${image.title} - ${image.image.filename} (${(image.image.size / 1024).toFixed(2)} KB)`);
        });
        
    } catch (error) {
        console.error('Error copying images and populating database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    }
};

// Run the script
if (require.main === module) {
    copyImagesAndPopulateDB();
}

module.exports = { copyImagesAndPopulateDB }; 