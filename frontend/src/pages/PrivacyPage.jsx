export default function PrivacyPage() {
  return (
    <div className="container-reading py-12 md:py-20 px-4 md:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-evora-text-primary md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-lg text-evora-text-secondary">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="prose prose-evora max-w-none text-evora-text-secondary space-y-6">
        <p>
          At Evora, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform.
        </p>
        
        <h2 className="font-display text-2xl font-semibold text-evora-text-primary mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect includes personal data, such as your name, email address, and demographic information, that you voluntarily give to us when you register with the platform.
        </p>

        <h2 className="font-display text-2xl font-semibold text-evora-text-primary mt-8 mb-4">2. Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the platform to manage your bookings, improve our services, and communicate with you about upcoming events.
        </p>

        <h2 className="font-display text-2xl font-semibold text-evora-text-primary mt-8 mb-4">3. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
        </p>
      </div>
    </div>
  );
}
