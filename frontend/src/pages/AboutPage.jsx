export default function AboutPage() {
  return (
    <div className="container-reading py-12 md:py-20 px-4 md:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-evora-text-primary md:text-5xl">About Evora</h1>
        <p className="mt-4 text-lg text-evora-text-secondary">Discover the story and mission behind the most refined event platform.</p>
      </div>
      <div className="prose prose-evora max-w-none text-evora-text-secondary">
        <p className="mb-6">
          Evora was born out of a simple observation: managing and discovering events shouldn't feel like a chore. We set out to build a platform that strips away the noise and focuses on what truly matters—connecting people through unforgettable experiences.
        </p>
        <h2 className="mt-10 mb-4 font-display text-2xl font-semibold text-evora-text-primary">Our Mission</h2>
        <p className="mb-6">
          To empower organizers with elegant tools that scale, and to provide attendees with a seamless, highly-curated discovery experience. We believe that technology should elevate the human connection, not complicate it.
        </p>
        <h2 className="mt-10 mb-4 font-display text-2xl font-semibold text-evora-text-primary">Why We're Different</h2>
        <p className="mb-6">
          Unlike legacy platforms bloated with features you don't need, Evora is intentionally designed. Every pixel, every interaction, and every workflow is crafted with absolute precision. We refuse to settle for "good enough" because we know your events are extraordinary.
        </p>
      </div>
    </div>
  );
}
