import React from 'react';
import './ImageCarousel3D.css';

const ImageCarousel3D = () => {
  // Image URLs served by the backend static uploads route
  const images = [
    '/uploads/6-gallery-wedding-aerial.jpg',
    '/uploads/1-gallery-vip-arrival.jpg',
    '/uploads/2-gallery-vip-premium.jpg',
    '/uploads/3-gallery-raptor-atv.jpg',
    '/uploads/4-gallery-oahu-magnum.jpg',
    '/uploads/14-gallery-professional-aviation.jpg',
    '/uploads/7-gallery-hawaiian-landscape.jpg',
    '/uploads/13-gallery-fleet-ops.jpg',
    '/uploads/1750106077204-gallery.jpg',
    '/uploads/11-gallery-koh-coast.jpg',
  ];

  return (
    <section className="image-carousel w-full relative py-12 flex items-center justify-center overflow-hidden">
      {/* Lucid backdrop */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl pointer-events-none -z-10"></div>

      {/* 3D Rotating Slider */}
      <div
        className="carousel-slider"
        style={{
          '--quantity': images.length,
        }}
      >
        {images.map((src, idx) => (
          <div
            className="carousel-item"
            key={idx}
            style={{
              '--position': idx + 1,
            }}
          >
            <img src={src} alt={`Carousel ${idx + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel3D; 