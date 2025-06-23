import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqCategories = [
    {
      category: "General Services",
      icon: "🚁",
      faqs: [
        {
          question: "What types of helicopter services do you offer?",
          answer: "We provide a wide range of FAA-certified helicopter services including aerial lifts, external sling loads, film & photography, logistics support, personnel transport, and specialized aviation solutions across Hawaii. Our experienced team brings decades of aviation experience to every mission."
        },
        {
          question: "Which Hawaiian islands do you serve?",
          answer: "We operate across all major Hawaiian Islands including Hawaiʻi (Big Island), Maui, Oʻahu, Kauaʻi, Lānaʻi, Molokaʻi, and Kahoʻolawe. Whether the terrain is remote, rugged, or urban, our aircraft and crew are equipped to deliver reliable solutions wherever the mission takes us."
        },
        {
          question: "How do I schedule a helicopter service?",
          answer: "You can reach out to us via phone at (808) 930-9826 or email at info@wvx.aero. We'll discuss your project needs and help schedule the right aircraft and crew for your mission. Our team will work with you to ensure all requirements are met."
        },
        {
          question: "Can you handle last-minute or urgent requests?",
          answer: "Yes, depending on aircraft availability and weather conditions, we can often respond to urgent requests quickly. Contact us directly at (808) 930-9826 for time-sensitive needs and we'll do our best to accommodate your schedule."
        }
      ]
    },
    {
      category: "Safety & Certifications",
      icon: "🛡️",
      faqs: [
        {
          question: "Are your pilots and aircraft FAA-certified?",
          answer: "Yes, absolutely. All of our pilots, aircraft, and operations are fully FAA-certified to ensure the highest level of safety and compliance. We maintain all required certifications including Part 135, Part 133, and Part 137 operations certificates."
        },
        {
          question: "What safety standards do you follow?",
          answer: "We uphold the highest safety standards on every mission and in every flight. Our aircraft undergo rigorous maintenance following manufacturer specifications and FAA regulations. Safety is our top priority and we follow strict protocols for weather monitoring, aircraft maintenance, and crew training."
        },
        {
          question: "What is your experience level?",
          answer: "Our team brings decades of aviation experience to every mission. We have extensive experience operating in Hawaiian conditions across all major islands, with deep knowledge of local terrain, weather patterns, and operational challenges."
        },
        {
          question: "What weather conditions prevent flying?",
          answer: "We operate under strict weather minimums for visibility, wind speed, and ceiling heights. Flights may be postponed for severe weather including thunderstorms, high winds, dense fog, or low visibility conditions. Safety always takes precedence over schedule, and our pilots make weather decisions based on current and forecasted conditions."
        }
      ]
    },
    {
      category: "Booking & Operations",
      icon: "📋",
      faqs: [
        {
          question: "How far in advance should I book?",
          answer: "For scheduled services, we recommend booking as far in advance as possible to ensure aircraft and crew availability. Popular times and specialized missions may require advance scheduling. Contact us to discuss your timeline and we'll work to accommodate your needs."
        },
        {
          question: "What factors affect service pricing?",
          answer: "Pricing depends on several factors including flight duration, distance, aircraft type required, crew requirements, special equipment needs, mission complexity, and timing. We provide detailed quotes for all services and work with you to find cost-effective solutions."
        },
        {
          question: "What are your business hours?",
          answer: "Our regular business hours are Monday-Friday: 6:00 AM - 10:00 PM and Saturday-Sunday: 8:00 AM - 6:00 PM. We can often accommodate missions outside these hours depending on the requirements and crew availability."
        },
        {
          question: "Do you provide project planning and consultation?",
          answer: "Yes, we collaborate closely with clients to deliver solutions that meet unique goals. Our team can assist with mission planning, logistics coordination, and technical consultation to ensure your project's success."
        }
      ]
    },
    {
      category: "Aircraft & Capabilities",
      icon: "✈️",
      faqs: [
        {
          question: "What types of aircraft do you operate?",
          answer: "We operate modern, FAA-certified helicopters suitable for various missions. Our fleet is equipped to handle everything from personnel transport to heavy-lift operations, with aircraft selected based on mission requirements, payload, and operational conditions."
        },
        {
          question: "What is your lifting capacity?",
          answer: "Our external sling load capabilities vary by aircraft type and operational conditions. We can transport construction materials, supplies, equipment, and oversized items. Weight and balance calculations are performed for each mission to ensure safe operations."
        },
        {
          question: "Can you transport passengers and cargo?",
          answer: "Yes, we provide both passenger transport and cargo operations. Passenger capacity varies by aircraft type and mission requirements. All transport operations follow strict safety protocols and weight limitations are calculated for each flight."
        },
        {
          question: "Do you handle specialized equipment?",
          answer: "Yes, we can accommodate specialized equipment for various missions including film & photography gear, scientific instruments, and construction equipment. Our team works with you to ensure proper mounting and operational requirements are met."
        }
      ]
    },
    {
      category: "Film & Photography",
      icon: "🎬",
      faqs: [
        {
          question: "Do you offer aerial filming and photography services?",
          answer: "Absolutely. We work closely with creative teams to provide stable, professional aerial footage using industry-grade mounts and equipment. Our experienced pilots understand the requirements for quality aerial cinematography and photography."
        },
        {
          question: "What equipment can you accommodate for filming?",
          answer: "We can accommodate various camera systems and mounts for professional film and photography work. Our team works with production crews to ensure proper equipment installation and optimal shooting conditions."
        },
        {
          question: "Do you work with film production companies?",
          answer: "Yes, we regularly work with film production companies, photographers, and creative teams across Hawaii. Our pilots are experienced in providing the stable, precise flying required for professional aerial cinematography."
        },
        {
          question: "Can you coordinate with other production elements?",
          answer: "Yes, we can coordinate with ground crews, other aircraft, and production schedules to ensure seamless integration with your overall production timeline and requirements."
        }
      ]
    },
    {
      category: "Logistics & Support",
      icon: "📦",
      faqs: [
        {
          question: "What logistics services do you provide?",
          answer: "We provide comprehensive logistics support including cargo transport, personnel movement, supply delivery to remote locations, and coordination with ground operations. Our team adapts to needs and can tailor solutions to match the scale, terrain, and challenge of your project."
        },
        {
          question: "Can you access remote locations?",
          answer: "Yes, helicopters excel at accessing remote or hard-to-reach locations that may be inaccessible by road or other transportation methods. This capability is particularly valuable for construction projects, research operations, and supply delivery in challenging terrain."
        },
        {
          question: "Do you coordinate with other contractors?",
          answer: "Yes, we regularly coordinate with construction companies, research teams, government agencies, and other contractors to provide integrated aviation solutions. We work as part of your team to ensure mission success."
        },
        {
          question: "What documentation do you provide?",
          answer: "We provide all necessary documentation including flight logs, safety records, and mission reports as required. Our operations maintain detailed records for compliance and client requirements."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our FAA-certified helicopter services, 
              safety procedures, and operational capabilities across Hawaii.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Our team is here to help. Contact us directly for personalized assistance 
              or immediate answers to your specific mission requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <a
                href="tel:(808)930-9826"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 sm:px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (808) 930-9826
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-4 sm:px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Popular Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We know every mission is unique, and you might have a few questions before liftoff. 
              Below are answers to some of the most common inquiries about our helicopter services, 
              operations, and how we work across the Hawaiian Islands.
            </p>
          </motion.div>

          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{category.icon}</span>
                    <h3 className="text-2xl font-bold text-white">
                      {category.category}
                    </h3>
                  </div>
                </div>

                {/* FAQs */}
                <div className="p-6">
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 10 + faqIndex;
                      return (
                        <div key={faqIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleFAQ(globalIndex)}
                            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-300 flex justify-between items-center"
                          >
                            <span className="font-semibold text-gray-800 pr-4">
                              {faq.question}
                            </span>
                            <svg
                              className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${
                                openFAQ === globalIndex ? 'rotate-180' : ''
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          <motion.div
                            initial={false}
                            animate={{
                              height: openFAQ === globalIndex ? 'auto' : 0,
                              opacity: openFAQ === globalIndex ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 bg-white border-t border-gray-200">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Your Mission Off the Ground?
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Whether you're planning a project, requesting a quote, or need immediate aerial support, 
              the Vertical Worx team is ready to connect. Let's discuss your mission requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <a
                href="tel:(808)930-9826"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (808) 930-9826
              </a>
              <a
                href="mailto:info@wvx.aero"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-800 px-4 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQs; 