import styles from "../style.module.css";

export const metadata = {
  title: "Cookie Policy | Forge - Skill Exchange Platform",
  description:
    "Learn about how Forge uses cookies to enhance user experience, analyze usage, and improve our services. Manage your cookie preferences and understand the types of cookies we use.",
};

const CookiePolicy = () => {
  return (
    <>
      <div className="container">
        <div className={styles.container}>
          <h1 className="section-title">Forge Cookie Policy</h1>
          <span>Last Updated: Aug 12, 2024</span>
          <ol className={styles.terms}>
            <li>
              <h3>Introduction</h3>
              Forge uses cookies and similar technologies to enhance your
              experience, analyze usage, and improve our services. This Cookie
              Policy explains what cookies are, how we use them, and how you can
              manage your preferences.
            </li>
            <li>
              <h3>What Are Cookies?</h3>
              Cookies are small text files placed on your device by websites you
              visit. They help websites remember your preferences, login
              information, and provide a more personalized experience.
            </li>
            <li>
              <h3>Types of Cookies We Use</h3>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> These cookies are
                  necessary for the operation of Forge. They enable you to
                  navigate the app and use its features.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> These cookies collect
                  information about how you use Forge, such as which pages you
                  visit and if you encounter any errors. This helps us improve
                  the app’s performance.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> These cookies allow Forge
                  to remember your preferences and settings, such as language or
                  region, to provide a more personalized experience.
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> These cookies are used
                  to deliver ads relevant to your interests and to measure the
                  effectiveness of advertising campaigns. They may track your
                  browsing habits across different sites.
                </li>
                <li>
                  <strong>Third-Party Cookies:</strong> Some cookies may be set
                  by third parties (e.g., advertisers or analytics providers).
                  These third-party cookies may track your activities across
                  other websites.
                </li>
              </ul>
            </li>
            <li>
              <h3>How We Use Cookies</h3>
              <ul>
                <li>
                  <strong>To Enhance Your Experience:</strong> Cookies help us
                  remember your preferences and provide a more tailored
                  experience.
                </li>
                <li>
                  <strong>To Analyze Usage:</strong> We use performance cookies
                  to understand how users interact with Forge and to identify
                  areas for improvement.
                </li>
                <li>
                  <strong>To Deliver Relevant Ads:</strong> Advertising cookies
                  allow us to serve ads that are more relevant to your interests
                  and to track the effectiveness of our marketing efforts.
                </li>
              </ul>
            </li>
            <li>
              <h3>Managing Your Cookies</h3>
              You can manage your cookie preferences through your browser
              settings. Most browsers allow you to refuse or delete cookies.
              However, please note that disabling cookies may affect the
              functionality of Forge and limit your access to certain features.
            </li>
          </ol>
          <p>
            <h3>Browser Settings</h3>
            You can typically find cookie management options in the
            &quot;Privacy&quot; or &quot;Security&quot; sections of your
            browser’s settings. Opt-Out of Advertising Cookies: You can opt-out
            of targeted advertising cookies by using tools provided by
            organizations such as the{" "}
            <a
              href="https://www.digitaladvertisingalliance.org"
              target="_blank"
            >
              Digital Advertising Alliance
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
