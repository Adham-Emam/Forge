import { Footer } from "../../components";
import styles from "../style.module.css";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container">
        <div className={styles.container}>
          <h1 className="section-title">Forge Privacy Policy</h1>
          <span>Last Updated: Aug 15, 2024</span>
          <ol className={styles.terms}>
            <li>
              IntroductionForge values your privacy and is committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, and safeguard your data when you use our app.
            </li>
            <li>
              Information We Collect Personal Information: When you create an
              account, we collect personal details such as your name, email
              address, phone number, and payment information. Profile
              Information: Information you provide for your profile, including
              your skills, work experience, and portfolio. Usage Data: We
              collect data on how you use Forge, including IP addresses, browser
              types, and interactions within the app. Cookies and Tracking
              Technologies: We use cookies and similar technologies to enhance
              your experience and gather analytics data.
            </li>
            <li>
              How We Use Your Information Account Management: To create and
              manage your account, including authentication and support. Service
              Delivery: To facilitate transactions between freelancers and
              clients and to provide and improve our services. Communication: To
              send you updates, notifications, and promotional material related
              to Forge. Analytics: To analyze usage patterns and improve the
              functionality and performance of Forge.
            </li>
            <li>
              Data Sharing and Disclosure With Service Providers: We may share
              your information with third-party service providers who assist us
              in operating Forge and providing our services (e.g., payment
              processors). For Legal Reasons: We may disclose your information
              if required by law or in response to valid requests from legal
              authorities. Business Transfers: In the event of a merger,
              acquisition, or sale of all or a portion of our assets, your
              information may be transferred as part of the transaction.
            </li>
            <li>
              Your Rights and Choices Access and Correction: You can access,
              update, or correct your personal information through your account
              settings. Data Deletion: You may request the deletion of your
              account and personal data by contacting us directly. Opt-Out: You
              can opt-out of receiving promotional emails by following the
              unsubscribe link provided in those communications.
            </li>
            <li>
              Data SecurityWe implement appropriate security measures to protect
              your personal information from unauthorized access, disclosure,
              alteration, or destruction. However, no method of transmission
              over the Internet or electronic storage is completely secure.
            </li>
            <li>
              International Data TransfersYour data may be transferred to and
              processed in countries other than your own. By using Forge, you
              consent to the transfer of your information to these countries,
              which may have different data protection laws.
            </li>
            <li>
              Changes to This Privacy PolicyWe may update this Privacy Policy
              from time to time. When we do, we will revise the &quot;Last
              Updated&quot; date above. Continued use of Forge after such
              changes will constitute your consent to the updated policy.
            </li>
            <li>
              Contact UsIf you have any questions or concerns about this Privacy
              Policy or our data practices, please contact us at{" "}
              <a href="mailto:contact@forgeapp.com">contact@forgeapp.com</a>. We
              will respond to your inquiry within 5 working days .
            </li>
          </ol>
        </div>
      </div>
      
    </>
  );
};

export default PrivacyPolicy;
