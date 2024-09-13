import { Footer } from "../../components";
import styles from "../style.module.css";

const TermsOfService = () => {
  return (
    <>
      <div className="container">
        <div className={styles.container}>
          <h1 className="section-title">Forge Terms of Service</h1>
          <span>Last Updated: Aug 19, 2024</span>
          <ol className={styles.terms}>
            <li>
              Acceptance of Terms By using Forge, you agree to be bound by these
              terms and conditions. If you do not agree to any of these terms,
              please do not use Forge.
            </li>
            <li>
              Account Creation You must have the legal capacity to enter into a
              binding contract to create an account and use Forge. Freelancers
              must provide accurate and up-to-date information when creating
              their profiles on Forge.
            </li>
            <li>
              Use of Forge Forge grants freelancers and clients a limited,
              non-exclusive, non-transferable license to access and use the app
              for the purpose of connecting freelancers with clients. Forge may
              not be used for any other purpose, including, but not limited to,
              illegal activities or activities that infringe on intellectual
              property rights.
            </li>
            <li>
              User Responsibilities Freelancers: Must ensure that all
              information in their Forge profiles is accurate and not
              misleading. Freelancers are responsible for the quality and timely
              delivery of the services they offer through Forge. Clients: Must
              clearly describe the scope, expectations, and deadlines for
              projects. Clients are responsible for making payments for services
              rendered in a timely manner through Forge.
            </li>
            <li>
              Contracts and Payments Forge may facilitate the creation of
              contracts between freelancers and clients. However, Forge is not a
              party to these contracts. Payments must be made through Forge’s
              secure payment system, and any disputes regarding payments or
              services must be resolved between the freelancer and the client.
            </li>
            <li>
              Dispute Resolution In the event of disputes between freelancers
              and clients, Forge provides a dispute resolution mechanism.
              Decisions made through this mechanism are final and binding.
            </li>
            <li>
              Termination Forge reserves the right to suspend or terminate your
              access to the app at any time, without notice, for conduct that
              violates these Terms of Service, the rights of other users, or is
              harmful to Forge.
            </li>
            <li>
              Limitation of Liability Forge provides a platform for freelancers
              and clients to connect but does not guarantee the quality or
              completion of any services offered. Forge is not liable for any
              direct, indirect, incidental, or consequential damages arising
              from the use of the app, including disputes between freelancers
              and clients.
            </li>
            <li>
              Governing Law These terms shall be governed by and construed in
              accordance with the laws of Egypt, without regard to its conflict
              of law provisions.
            </li>
            <li>
              Changes to Terms Forge may update these Terms of Service from time
              to time. When we do, we will revise the &quot;Last Updated&quot;
              date above. Continued use of Forge after such changes will
              constitute your consent to the updated terms.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
