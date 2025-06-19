import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import ImageCarousel3D from '../components/ImageCarousel3D';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <ContactForm />
    </div>
  );
};

export default Home;