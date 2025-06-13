const mongoose = require('mongoose');
const Image = require('../models/Image');
const path = require('path');
const fs = require('fs');
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

// Gallery images data (from your frontend)
const galleryImagesData = [
    {
        title: "VIP Arrival Services",
        description: "Luxury helicopter arrival services for VIP clients",
        image: "/images/kahua-VIP-arrival-scaled.jpg",
        order: 1
    },
    {
        title: "Premium VIP Experience",
        description: "High-end transportation solutions",
        image: "/images/kahua-VIP-arrival-scaled (1).jpg",
        order: 2
    },
    {
        title: "Raptor ATV Operations",
        description: "All-terrain vehicle transport and support",
        image: "/images/Raptor_ATV_action-scaled.jpg",
        order: 3
    },
    {
        title: "Oahu Magnum Experience",
        description: "Spectacular flights over Hawaiian waters",
        image: "/images/Oahu-Magnum-Experience-over-water-scaled.jpg",
        order: 4
    },
    {
        title: "Wedding Photography Flight",
        description: "Aerial cinematography for special events",
        image: "/images/OA_WEDD_MAG_OFF_004-SHIBSTY-1-scaled.jpg",
        order: 5
    },
    {
        title: "Wedding Aerial Services",
        description: "Professional wedding photography from above",
        image: "/images/OA_WEDD_MAG_OFF_004-SHIBSTY-1-scaled (1).jpg",
        order: 6
    },
    {
        title: "Hawaiian Landscape",
        description: "Breathtaking views of Hawaii's natural beauty",
        image: "/images/IMG_7097-scaled-1-1462x2048.jpg",
        order: 7
    },
    {
        title: "Coastal Operations",
        description: "Professional helicopter operations along the coast",
        image: "/images/IMG_7075-scaled.jpg",
        order: 8
    },
    {
        title: "Island Aviation",
        description: "Expert aviation services across the Hawaiian Islands",
        image: "/images/IMG_7065-scaled.jpg",
        order: 9
    },
    {
        title: "Horseback & Blue Sky",
        description: "Perfect day for aerial adventures",
        image: "/images/Horseback_blueSky.jpg",
        order: 10
    },
    {
        title: "Koh Coast Flight",
        description: "Flying along Hawaii's stunning coastline",
        image: "/images/HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg",
        order: 11
    },
    {
        title: "Bell 407 & Hughes 500",
        description: "Our professional helicopter fleet in action",
        image: "/images/Bell-407-Hughes-500-Flight-over-Old-Flow.jpg",
        order: 12
    },
    {
        title: "Fleet Operations",
        description: "Multiple aircraft coordinated operations",
        image: "/images/Bell-407-Hughes-500-Flight-over-Old-Flow (1).jpg",
        order: 13
    },
    {
        title: "Professional Aviation",
        description: "Expert helicopter services and operations",
        image: "/images/L1030042-2-1-scaled-1-1366x2048.jpg",
        order: 14
    }
];

const populateImages = async () => {
    try {
        await connectDB();
        
        // Clear existing images
        await Image.deleteMany({});
        console.log('Cleared existing images');
        
        // Create new images
        const createdImages = await Image.insertMany(galleryImagesData);
        console.log(`Created ${createdImages.length} images successfully`);
        
        // Display created images
        createdImages.forEach((image, index) => {
            console.log(`${index + 1}. ${image.title} - ${image.image}`);
        });
        
        console.log('\nImages population completed successfully!');
        
    } catch (error) {
        console.error('Error populating images:', error);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run the script
if (require.main === module) {
    populateImages();
}

module.exports = { populateImages, galleryImagesData }; 