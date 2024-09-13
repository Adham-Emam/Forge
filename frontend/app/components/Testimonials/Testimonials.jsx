import styles from "./style.module.css";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import Image from "next/image";
import { AnimatedItem } from "..";
import { delay } from "framer-motion";

const Rating = ({ count }) => {
  return (
    <span>
      {[...Array(count)].map((_, index) => (
        <FaStar key={index} />
      ))}
    </span>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <h2 className="section-title">Crafted Stories</h2>
        <p>
          Our users are the heart of Forge. Here’s what some of them have to say
          about their journey of learning, teaching, and mastering new skills
          with us.
        </p>
        <div className={styles.testimonialContainer}>
          <AnimatedItem
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.testimonial}>
              <div>
                <Image src={user1} alt="User" width={50} height={50} />
                <div>
                  <Rating count={5} />
                  <h3>Anna S.</h3>
                </div>
              </div>
              <p>
                Forge connected me with a community of passionate learners and
                skilled mentors. I’ve not only gained new skills but also earned
                Embers that I can use to continue my journey. It’s more than
                just learning—it’s crafting your future.
              </p>
              <FaQuoteRight />
            </div>
          </AnimatedItem>
          <AnimatedItem
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className={styles.testimonial}>
              <div>
                <Image src={user2} alt="User" width={50} height={50} />
                <div>
                  <Rating count={5} />
                  <h3>James M.</h3>
                </div>
              </div>
              <p>
                As a professional blacksmith, I’ve always believed in the power
                of hands-on learning. Forge has allowed me to share my craft
                with others and earn Embers along the way. It’s truly a
                community where mastery is forged together.
              </p>
              <FaQuoteRight />
            </div>
          </AnimatedItem>
          <AnimatedItem
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className={styles.testimonial}>
              <div>
                <Image src={user3} alt="User" width={50} height={50} />
                <div>
                  <Rating count={5} />
                  <h3>Elena R.</h3>
                </div>
              </div>
              <p>
                I was looking for a way to expand my knowledge without spending
                a fortune on classes. Forge gave me the perfect platform to
                learn from others while earning Embers to fuel my learning
                journey. It’s an incredible feeling to be part of a community
                that values skill and craftsmanship.
              </p>
              <FaQuoteRight />
            </div>
          </AnimatedItem>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
