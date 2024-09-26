import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../Home/HeroSection";
import Footer from "./Footer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <h1 className={styles.logo}>Relief</h1>
        </div>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/">Resources</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <button className={styles.headerBtn}>
                <Link to="/disForm" style={{color: "#141315"}}>Report Disaster</Link>
              </button>
            </li>

            <li>
              <button className={styles.headerBtn}>
                <Link to="/card"  style={{color: "#141315"}}>View Disaster</Link>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <HeroSection />

        <section className={styles.CallToAction}>
          <h2>Join Us in Making a Difference</h2>
          <p>
            Become a part of our mission to provide effective disaster relief
            and support to those in need.
          </p>
          <button className={styles.CtaBtn}>
            <Link to="/signup">Get Started</Link>
          </button>
        </section>

        <section className={styles.testimonials}>
          <h2>What People Are Saying</h2>
          <div className={styles.testimonialItems}>
            <Testimonial
              quote="This platform has transformed how we manage resources during crises."
              author="John Doe, Relief Coordinator"
            />
            <Testimonial
              quote="A game-changer in disaster management!"
              author="Jane Smith, Volunteer"
            />
          </div>
        </section>

        <section className={styles.stats}>
          <h2>Our Impact</h2>
          <div className={styles.statsItems}>
            <Stat number="1000+" text="Lives Impacted" />
            <Stat number="500+" text="Resources Managed" />
            <Stat number="200+" text="Volunteers Engaged" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Testimonial = ({ quote, author }) => (
  <div className={styles.testimonialItem}>
    <p>"{quote}"</p>
    <h4>- {author}</h4>
  </div>
);

const Stat = ({ number, text }) => (
  <div className={styles.statItem}>
    <h3>{number}</h3>
    <p>{text}</p>
  </div>
);

export default Home;
