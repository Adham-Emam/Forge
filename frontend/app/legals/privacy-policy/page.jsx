import styles from "../style.module.css";

export const metadata = {
  title: "Privacy Policy | Forge - Skill Exchange Platform",
  description:
    "Read the Privacy Policy for Forge, the platform where users exchange skills for embers. Learn how we collect, use, and protect your personal data.",
};

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container">
        <div className={styles.container}>
          <h1 className="section-title">Forge Privacy Policy</h1>
          <span>Last Updated: Aug 15, 2024</span>
          <ol className={styles.terms}>
            <li>
              <h3>Introduction</h3>
              Forge values your privacy and is committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, and safeguard your data when you use our app.
            </li>
            <li>
              <h3>Information We Collect</h3>
              <ul>
                <li>
                  <strong>Personal Information:</strong> When you create an
                  account, we collect personal details such as your name, email
                  address, phone number, and payment information.
                </li>
                <li>
                  <strong>Profile Information:</strong> Information you provide
                  for your profile, including your skills, work experience, and
                  portfolio.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect data on how you use
                  Forge, including IP addresses, browser types, and interactions
                  within the app.
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> We use
                  cookies and similar technologies to enhance your experience
                  and gather analytics data.
                </li>
              </ul>
            </li>
            <li>
              <h3>How We Use Your Information</h3>
              <ul>
                <li>
                  <strong>Account Management:</strong> To create and manage your
                  account, including authentication and support.
                </li>
                <li>
                  <strong>Service Delivery:</strong> To facilitate transactions
                  between freelancers and clients and to provide and improve our
                  services.
                </li>
                <li>
                  <strong>Communication:</strong> To send you updates,
                  notifications, and promotional material related to Forge.
                </li>
                <li>
                  <strong>Analytics:</strong> To analyze usage patterns and
                  improve the functionality and performance of Forge.
                </li>
              </ul>
            </li>
            <li>
              <h3>Data Sharing and Disclosure</h3>
              <ul>
                <li>
                  <strong>With Service Providers:</strong> We may share your
                  information with third-party service providers who assist us
                  in operating Forge and providing our services (e.g., payment
                  processors).
                </li>
                <li>
                  <strong>For Legal Reasons:</strong> We may disclose your
                  information if required by law or in response to valid
                  requests from legal authorities.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or sale of all or a portion of our assets, your
                  information may be transferred as part of the transaction.
                </li>
              </ul>
            </li>
            <li>
              <h3>Your Rights and Choices</h3>
              <ul>
                <li>
                  <strong>Access and Correction:</strong> You can access,
                  update, or correct your personal information through your
                  account settings.
                </li>
                <li>
                  <strong>Data Deletion:</strong> You may request the deletion
                  of your account and personal data by contacting us directly.
                </li>
                <li>
                  <strong>Opt-Out:</strong> You can opt-out of receiving
                  promotional emails by following the unsubscribe link provided
                  in those communications.
                </li>
              </ul>
            </li>
            <li>
              <h3>Data Security</h3>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, disclosure,
              alteration, or destruction. However, no method of transmission
              over the Internet or electronic storage is completely secure.
            </li>
            <li>
              <h3>International Data Transfers</h3>
              Your data may be transferred to and processed in countries other
              than your own. By using Forge, you consent to the transfer of your
              information to these countries, which may have different data
              protection laws.
            </li>
            <li>
              <h3>Changes to This Privacy Policy</h3>
              We may update this Privacy Policy from time to time. When we do,
              we will revise the "Last Updated" date above. Continued use of
              Forge after such changes will constitute your consent to the
              updated policy.
            </li>
            <li>
              <h3>Contact Us</h3>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at{" "}
              <a href="mailto:contact@forgeapp.com">contact@forgeapp.com</a>. We
              will respond to your inquiry within 5 working days.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
