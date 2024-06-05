import React from 'react';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import '../css/Homepage.css';
import FOTO1 from "../image/FOTO1.JPG"
import FOTO2 from "../image/FOTO2.JPG"
import FOTO3 from "../image/FOTO3.JPG"
import FOTO4 from "../image/FOTO4.JPG"

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Home = () => {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Nunito, sans-serif' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        style={{
          backgroundImage: `url(${FOTO1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 'bold', color: '#1e90ff' }}
        >
          The Floating School
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.5rem',
            backgroundColor: '#00008b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Let's Sail to Serve!
        </motion.button>
      </motion.div>
      
      <Element name="what-is-floating-school">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ padding: '3rem 0', backgroundColor: '#f0f8ff', color: '#333' }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e90ff' }}>What is the Floating School?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
            The Floating School is an innovative education program that brings learning to remote areas through a mobile platform. Our mission is to ensure that every child has access to quality education regardless of their location.
          </p>
        </motion.section>
      </Element>

      <Element name="our-vision">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ padding: '3rem 0', backgroundColor: '#ffffff' }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e90ff' }}>Our Vision</h2>
          <motion.div
            className="cards-container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card" variants={fadeInUp}>
              <img src={FOTO2} alt="Vision 1" />
              <div className="card-content">
                <h3>Increase Welfare</h3>
                <p>Our mission is to increase the welfare of our community by ensuring fair and equal opportunities for all.</p>
                <a href="/vision/1">Read More</a>
              </div>
            </motion.div>
            <motion.div className="card" variants={fadeInUp}>
              <img src={FOTO3} alt="Vision 2" />
              <div className="card-content">
                <h3>Integrated Transportation</h3>
                <p>We aim to create an integrated transportation system that is easy, affordable, and accessible for everyone.</p>
                <a href="/vision/2">Read More</a>
              </div>
            </motion.div>
            <motion.div className="card" variants={fadeInUp}>
              <img src={FOTO4} alt="Vision 3" />
              <div className="card-content">
                <h3>Educational Access</h3>
                <p>Designing a future with easy access to education for all, ensuring no child is left behind.</p>
                <a href="/vision/3">Read More</a>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </Element>

      <Element name="our-vision-objectives">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ padding: '3rem 0', backgroundColor: '#ffffff' }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e90ff' }}>Vision & Objectives</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', textAlign: 'left' }}>
            The Floating School’s vision is to improve the quality of youth in the islands through a creative workshop which will enhance their skills based on their passions and talents.
          </p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e90ff', marginTop: '2rem' }}>Objectives:</h3>
          <ul style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', textAlign: 'left', listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Provide high quality and enrichment programs for young teenagers in the island;</li>
            <li>Engage youth in weekly development workshops based on their passions and interests;</li>
            <li>Connect groups of young people between islands in Pangkep Regency;</li>
            <li>Teach youth how to successfully develop their talent and earn money from their talent;</li>
            <li>Expose youth to several careers in various fields.</li>
          </ul>
        </motion.section>
      </Element>

      <Element name="our-impact">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ padding: '3rem 0', backgroundColor: '#f0f8ff' }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e90ff' }}>Our Impact</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', textAlign: 'left' }}>
            <p>The Floating School is a semi-traditional boat which transports books, stationeries, education materials, and also mentors who will give fun creative workshops to youth in three different islands.</p>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              <li><strong>5 Islands</strong></li>
              <li><strong>170 Students</strong></li>
              <li><strong>76 Volunteers</strong></li>
            </ul>
            <p>Locations:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>The Floating School Pangkep: Satando, Saugi, Sapuli, Samatellu Island</li>
              <li>The Floating School Aceh: Pulo Aceh</li>
            </ul>
          </div>
        </motion.section>
      </Element>

      <Element name="our-mission">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ padding: '3rem 0', backgroundColor: '#f          0f8ff' }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e90ff' }}>Our Mission</h2>
            <motion.img
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              src={FOTO1}
              alt="Mission"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.section>
        </Element>
  
        <Element name="be-our-partner">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            style={{ padding: '3rem 0', backgroundColor: '#ffffff' }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e90ff' }}>Be Our Partner</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.5rem',
                backgroundColor: '#00008b',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() => window.location.href = 'https://wa.me/6281341146287'}
            >
              Contact Us
            </motion.button>
          </motion.section>
        </Element>
      </div>
    );
  };
  
  export default Home;
  
