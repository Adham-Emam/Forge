import Navbar from "../Navbar/Navbar";
import styles from "./style.module.css";
import Button from "../Button/Button";
import HeroImage from "../../assets/hero-section-image.png";
import Image from "next/image";

import { AnimatedItem } from "..";

const HeroSection = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <section id="hero" className={styles.hero}>
          <div className={styles.content}>
            <AnimatedItem
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h1>
                Forge Your Future,
                <br /> One Skill at a Time.
              </h1>
            </AnimatedItem>
            <AnimatedItem
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <p>
                In the heart of the forge, masters and apprentices come
                together. Exchange your knowledge, shape new skills, and craft
                your path to mastery. Join a community where learning is forged
                in the fire of collaboration.
              </p>
            </AnimatedItem>
            <AnimatedItem
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Button href="/dashboard">Enter the Forge</Button>
            </AnimatedItem>
          </div>
          <AnimatedItem
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={HeroImage}
              alt="Forge Hero Section"
              width={450}
              height={450}
              priority={true}
            />
          </AnimatedItem>
        </section>
      </div>
    </>
  );
};

export default HeroSection;
