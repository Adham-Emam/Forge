import styles from "../style.module.css";

const CookiePolicy = () => {
  return (
    <>
      <div className="container">
        <div className={styles.container}>
          <h1 className="section-title">Forge Cookie Policy</h1>
          <span>Last Updated: Aug 12, 2024</span>
          <ol className={styles.terms}>
            <li>
              Introduction Forge uses cookies and similar technologies to
              enhance your experience, analyze usage, and improve our services.
              This Cookie Policy explains what cookies are, how we use them, and
              how you can manage your preferences.
            </li>
            <li>
              What Are Cookies? Cookies are small text files placed on your
              device by websites you visit. They help websites remember your
              preferences, login information, and provide a more personalized
              experience.
            </li>
            <li>
              Types of Cookies We Use Essential Cookies: These cookies are
              necessary for the operation of Forge. They enable you to navigate
              the app and use its features. Performance Cookies: These cookies
              collect information about how you use Forge, such as which pages
              you visit and if you encounter any errors. This helps us improve
              the app’s performance. Functional Cookies: These cookies allow
              Forge to remember your preferences and settings, such as language
              or region, to provide a more personalized experience. Advertising
              Cookies: These cookies are used to deliver ads relevant to your
              interests and to measure the effectiveness of advertising
              campaigns. They may track your browsing habits across different
              sites.
            </li>
            <li>
              How We Use Cookies To Enhance Your Experience: Cookies help us
              remember your preferences and provide a more tailored experience.
              To Analyze Usage: We use performance cookies to understand how
              users interact with Forge and to identify areas for improvement.
              To Deliver Relevant Ads: Advertising cookies allow us to serve ads
              that are more relevant to your interests and to track the
              effectiveness of our marketing efforts.
            </li>
            <li>
              Managing Your Cookies You can manage your cookie preferences
              through your browser settings. Most browsers allow you to refuse
              or delete cookies. However, please note that disabling cookies may
              affect the functionality of Forge and limit your access to certain
              features.
            </li>
          </ol>
          <p>
            Browser Settings: You can typically find cookie management options
            in the &quot;Privacy&quot; or &quot;Security&quot; sections of your
            browser’s settings. Opt-Out of Advertising Cookies: You can opt-out
            of targeted advertising cookies by using tools provided by
            organizations such as the Digital Advertising Alliance
          </p>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
