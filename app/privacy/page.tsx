import { FC } from "react";

const PrivacyPolicyPage:FC = () => {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>

        <p>
          <strong>Last updated: September 28, 2026</strong>
        </p>

        <h2>Overview</h2>

        <p>
          colinfran.com is a personal website operated by Colin Franceschini.
          I respect your privacy and do not collect, store, or sell personal
          information about visitors to this website.
        </p>

        <h2>Information I Collect</h2>

        <p>
          I do not intentionally collect any personal information from
          visitors to this website. You can browse the website without
          creating an account, providing your name, or providing your email
          address.
        </p>

        <p>
          The only personal information stored or processed by this website is
          my own information for my own personal use.
        </p>

        <h2>Cookies and Tracking</h2>

        <p>
          This website does not use cookies, tracking technologies, or
          advertising trackers to collect information about visitors.
        </p>

        <h2>Third-Party Services</h2>

        <p>
          This website may use third-party services to host and deliver the
          website. These services may automatically process basic technical
          information, such as an IP address, as part of operating their
          infrastructure. I do not use this information to identify or track
          individual visitors.
        </p>

        <h2>Data Sharing</h2>

        <p>
          I do not sell, rent, or share visitor personal information with
          third parties.
        </p>

        <h2>Children's Privacy</h2>

        <p>
          This website does not knowingly collect personal information from
          children or adults.
        </p>

        <h2>Changes to This Policy</h2>

        <p>
          I may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated "Last updated" date.
        </p>

        <h2>Contact</h2>

        <p>
          If you have questions about this Privacy Policy, you can contact me
          at{" "}
          <a href="mailto:privacy@colinfran.com">
            privacy@colinfran.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;
