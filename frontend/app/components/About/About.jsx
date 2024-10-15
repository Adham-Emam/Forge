import styles from "./style.module.css";
import img1 from "../../assets/about-img1.png";
import img2 from "../../assets/about-img2.png";
import img3 from "../../assets/about-img3.png";
import Image from "next/image";
import { AnimatedItem } from "..";

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <h2 className="section-title">Crafting the Future with Forge</h2>
        <p>
          In a world where skills are the tools and knowledge is the metal,
          Forge stands as the anvil where connections are made, and expertise is
          crafted.
        </p>
        <div className={styles.aboutSection}>
          <div>
            <AnimatedItem
              initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <h3>Our Mission</h3>
            </AnimatedItem>
            <AnimatedItem
              initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p>
                To empower individuals to forge new skills, share their
                expertise, and build a stronger, more connected community. At
                Forge, we ignite the sparks of collaboration, turning them into
                the flames of progress.
              </p>
            </AnimatedItem>
          </div>
          <AnimatedItem
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Image
              src={img1}
              alt="About Image"
              width={400}
              height={400}
              loading="eager"
            />
          </AnimatedItem>
        </div>
        <div className={`${styles.aboutSection} ${styles.even}`}>
          <div>
            <AnimatedItem
              initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <h3>Our Values</h3>
            </AnimatedItem>
            <ul>
              <li>
                <AnimatedItem
                  initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <strong>Craftsmanship:</strong> We honor the art of
                  skill-building, where every connection is an opportunity to
                  create something meaningful.
                </AnimatedItem>
              </li>
              <li>
                <AnimatedItem
                  initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <strong>Community:</strong> Forge is built on the strength of
                  its members, where learning and teaching go hand in hand.
                </AnimatedItem>
              </li>
              <li>
                <AnimatedItem
                  initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <strong>Mastery:</strong> We believe in the relentless pursuit
                  of excellence, where every skill can be honed, and every
                  talent can shine
                </AnimatedItem>
              </li>
            </ul>
          </div>
          <AnimatedItem
            initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Image
              src={img2}
              alt="About Image"
              width={400}
              height={400}
              loading="eager"
            />
          </AnimatedItem>
        </div>
        <div className={styles.aboutSection}>
          <div>
            <AnimatedItem
              initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3>Our Vision</h3>
            </AnimatedItem>
            <AnimatedItem
              initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <p>
                To create a world where learning is as accessible as a handshake
                and as impactful as a well-forged blade. Through Forge, we aim
                to build a global community where skills are shared, knowledge
                is exchanged, and mastery is achieved together.
              </p>
            </AnimatedItem>
          </div>
          <AnimatedItem
            initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Image
              src={img3}
              alt="About Image"
              width={400}
              height={400}
              loading="eager"
            />
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
};

export default About;
