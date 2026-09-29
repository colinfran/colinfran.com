import { FC } from "react"

const PrivacyPolicyPage: FC = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-24">
        <header className="mb-12 border-b border-border pb-10">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Legal</p>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">Last updated: September 28, 2026</p>
        </header>

        <article className="space-y-12 text-[15px] leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">Overview</h2>

            <p>
              colinfran.com is a personal website operated by Colin Franceschini. I respect your
              privacy and do not collect, store, or sell personal information about visitors to this
              website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              Information I Collect
            </h2>

            <div className="space-y-4">
              <p>
                I do not intentionally collect any personal information from visitors to this
                website. You can browse the website without creating an account, providing your
                name, or providing your email address.
              </p>

              <p>
                The only personal information stored or processed by this website is my own
                information for my own personal use.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              Cookies and Tracking
            </h2>

            <p>
              This website does not use cookies, tracking technologies, or advertising trackers to
              collect information about visitors.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              Third-Party Services
            </h2>

            <p>
              This website may use third-party services to host and deliver the website. These
              services may automatically process basic technical information, such as an IP address,
              as part of operating their infrastructure. I do not use this information to identify
              or track individual visitors.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              Data Sharing
            </h2>

            <p>I do not sell, rent, or share visitor personal information with third parties.</p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              Children's Privacy
            </h2>

            <p>
              This website does not knowingly collect personal information from children or adults.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              Changes to This Policy
            </h2>

            <p>
              I may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">Contact</h2>

            <p>
              If you have questions about this Privacy Policy, you can contact me at{" "}
              <a
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                href="mailto:privacy@colinfran.com"
              >
                privacy@colinfran.com
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
