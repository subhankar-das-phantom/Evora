export default function TermsPage() {
  return (
    <div className="container-reading py-12 md:py-20 px-4 md:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-evora-text-primary md:text-5xl">Terms & Conditions</h1>
        <p className="mt-4 text-lg text-evora-text-secondary">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="prose prose-evora max-w-none text-evora-text-secondary space-y-6">
        <p>
          Welcome to Evora. These Terms & Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.
        </p>

        <h2 className="font-display text-2xl font-semibold text-evora-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By creating an account, browsing events, or purchasing tickets, you confirm that you have read, understood, and agreed to these Terms & Conditions entirely.
        </p>

        <h2 className="font-display text-2xl font-semibold text-evora-text-primary mt-8 mb-4">2. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. Any activities that occur under your account are your sole responsibility. We reserve the right to terminate accounts that violate our community standards.
        </p>

        <h2 className="font-display text-2xl font-semibold text-evora-text-primary mt-8 mb-4">3. Event Bookings and Cancellations</h2>
        <p>
          All ticket sales are subject to the specific event organizer's refund and cancellation policies. Evora facilitates the transaction but is not liable for event cancellations, postponements, or disputes between attendees and organizers.
        </p>

        <h2 className="font-display text-2xl font-semibold text-evora-text-primary mt-8 mb-4">4. Platform Integrity</h2>
        <p>
          You agree not to misuse our platform or help anyone else do so. This includes attempting to compromise our security, scraping our data, or using our services for any illegal activities.
        </p>
      </div>
    </div>
  );
}
