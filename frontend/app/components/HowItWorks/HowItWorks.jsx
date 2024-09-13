import styles from "./style.module.css";
import { FaUserPlus, FaSearch, FaFire, FaSeedling } from "react-icons/fa";
import { AnimatedItem } from "..";

const steps = [
  {
    title: "Sign Up",
    text: "Create your profile and list the skills you want to share or learn.",
    icon: <FaUserPlus />,
  },
  {
    title: "Find a Match",
    text: "Browse through available skills and connect with members who match your interests.",
    icon: <FaSearch />,
  },
  {
    title: "Earn Embers",
    text: "If you don’t find a match, no worries! Complete tasks for others in the community and earn Embers to use for future skill exchanges.",
    icon: <FaFire />,
  },
  {
    title: "Redeem and Grow",
    text: "Use your earned Embers to unlock new learning opportunities, gain new skills, and grow your expertise.",
    icon: <FaSeedling />,
  },
];
const HowItWorks = () => {
  return (
    <section id="how-it-works" className={styles.howitworks}>
      <div className="container">
        <h2 className="section-title">How Forge Works</h2>
        <div className={styles.cardsContainer}>
          {steps.map((step, index) => (
            <AnimatedItem
              key={index}
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.card}>
                {step.icon}
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
