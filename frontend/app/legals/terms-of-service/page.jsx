import styles from "../style.module.css";

export const metadata = {
  title: "Terms of Service | Forge - Skill Exchange Platform",
  description:
    "Read the Terms of Service for Forge, the platform where users exchange skills for embers. Learn about the rules, obligations, and rights as a user.",
};

const TermsOfService = () => {
  return (
    <>
      <div className="container">
        <div className={styles.container}>
          <h1 className="section-title">Forge Terms of Service</h1>
          <span>Last Updated: Aug 19, 2024</span>
          <ol className={styles.terms}>
            <li>
              <h3>Acceptance of Terms</h3>
              By using Forge, you agree to be bound by these terms and
              conditions. If you do not agree to any of these terms, please do
              not use Forge.
            </li>
            <li>
              <h3>Account Creation</h3>
              You must have the legal capacity to enter into a binding contract
              to create an account and use Forge. Freelancers must provide
              accurate and up-to-date information when creating their profiles
              on Forge.
            </li>
            <li>
              <h3>Use of Forge</h3>
              Forge grants freelancers and clients a limited, non-exclusive,
              non-transferable license to access and use the app for the purpose
              of connecting freelancers with clients. Forge may not be used for
              any other purpose, including, but not limited to, illegal
              activities or activities that infringe on intellectual property
              rights.
            </li>
            <li>
              <h3>User Responsibilities</h3>
              <ul>
                <li>
                  <strong>Freelancers:</strong> Must ensure that all information
                  in their Forge profiles is accurate and not misleading.
                  Freelancers are responsible for the quality and timely
                  delivery of the services they offer through Forge.
                </li>
                <li>
                  <strong>Clients:</strong> Must clearly describe the scope,
                  expectations, and deadlines for projects. Clients are
                  responsible for making payments for services rendered in a
                  timely manner through Forge.
                </li>
              </ul>
            </li>
            <li>
              <h3>Contracts and Payments</h3>
              Forge may facilitate the creation of contracts between freelancers
              and clients. However, Forge is not a party to these contracts.
              Payments must be made through Forge’s secure payment system, and
              any disputes regarding payments or services must be resolved
              between the freelancer and the client.
            </li>
            <li>
              <h3>Dispute Resolution</h3>
              In the event of disputes between freelancers and clients, Forge
              provides a dispute resolution mechanism. Decisions made through
              this mechanism are final and binding.
            </li>
            <li>
              <h3>Termination</h3>
              Forge reserves the right to suspend or terminate your access to
              the app at any time, without notice, for conduct that violates
              these Terms of Service, the rights of other users, or is harmful
              to Forge.
            </li>
            <li>
              <h3>Limitation of Liability</h3>
              Forge provides a platform for freelancers and clients to connect
              but does not guarantee the quality or completion of any services
              offered. Forge is not liable for any direct, indirect, incidental,
              or consequential damages arising from the use of the app,
              including disputes between freelancers and clients.
            </li>
            <li>
              <h3>Governing Law</h3>
              These terms shall be governed by and construed in accordance with
              the laws of Egypt, without regard to its conflict of law
              provisions.
            </li>
            <li>
              <h3>Changes to Terms</h3>
              Forge may update these Terms of Service from time to time. When we
              do, we will revise the &quot;Last Updated&quot; date above.
              Continued use of Forge after such changes will constitute your
              consent to the updated terms.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
