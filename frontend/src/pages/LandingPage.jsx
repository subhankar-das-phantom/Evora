import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Zap, Users, Calendar, MapPin } from "lucide-react";
import { HeroGeometric } from "@/components/ui/HeroGeometric";
import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function LandingPage() {

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      {/* ─── Hero ─── */}
      <HeroGeometric
        badge="Welcome to the future of events"
        title1="Experience Events"
        title2="Reimagined."
        description="A premium, highly-curated platform designed to discover, manage, and scale the world's most exclusive gatherings with absolute precision."
      >
        <div className="mt-8 flex justify-center items-center w-full px-4 sm:px-0 z-20 relative mx-auto">
          <Link to="/events" className="inline-flex h-14 items-center justify-center rounded-xl bg-evora-primary px-8 text-base font-medium text-evora-primary-foreground shadow-soft transition-all duration-fast ease-premium hover:bg-evora-primary-hover w-full sm:w-auto gap-2">
            Explore Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </HeroGeometric>

      {/* ─── Trusted Numbers ─── */}
      <section className="border-y border-evora-border bg-evora-surface-secondary">
        <motion.div 
          className="container-content grid grid-cols-2 gap-8 py-16 sm:grid-cols-4 md:py-20 px-4 md:px-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { value: "12K+", label: "Events Hosted" },
            { value: "280K+", label: "Tickets Booked" },
            { value: "4.9", label: "Average Rating" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="flex flex-col items-center text-center">
              <span className="font-display text-4xl sm:text-5xl font-semibold text-evora-text-primary">{stat.value}</span>
              <span className="mt-2 text-xs sm:text-sm text-evora-text-secondary">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Why Evora ─── */}
      <section className="container-content py-20 md:py-32 px-4 md:px-8">
        <motion.div 
          className="mb-12 md:mb-16 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-evora-primary">Why Evora</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-evora-text-primary sm:text-4xl md:text-5xl">
            Built for people who refuse to settle.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-evora-text-secondary font-light leading-relaxed">
            Every detail is intentionally designed so you can focus on what matters — creating unforgettable moments.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { icon: Sparkles, title: "Curated Experiences", desc: "Every event on Evora is vetted to ensure a premium, unforgettable experience for all attendees." },
            { icon: Zap, title: "Instant Booking", desc: "Seamlessly secure your spot with our optimized checkout flow. Designed for speed, built for reliability." },
            { icon: Shield, title: "Absolute Clarity", desc: "Our interface strips away the noise, focusing purely on what matters: the event, the schedule, and your attendees." },
            { icon: Users, title: "Community First", desc: "Connect with like-minded individuals at events curated for meaningful, lasting connections." },
            { icon: Calendar, title: "Smart Scheduling", desc: "Intelligent date suggestions and conflict detection ensure you never miss what matters most." },
            { icon: MapPin, title: "Location Intelligence", desc: "Discover events near you with precision mapping and smart venue recommendations." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariants}
              className="group flex flex-col rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 sm:p-7 shadow-soft transition-all duration-medium ease-premium hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evora-primary/10 text-evora-primary transition-colors duration-fast group-hover:bg-evora-primary group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-evora-text-primary">{title}</h3>
              <p className="mt-2 text-sm text-evora-text-secondary leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="border-y border-evora-border bg-evora-surface-secondary">
        <div className="container-content py-20 md:py-32 px-4 md:px-8">
          <motion.div 
            className="mb-12 md:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-evora-primary">How It Works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-evora-text-primary sm:text-4xl md:text-5xl">
              Three steps to your next experience.
            </h2>
          </motion.div>

          <motion.div 
            className="grid gap-10 sm:gap-12 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { step: "01", title: "Discover", desc: "Browse curated events by category, location, or date. Our intelligent search surfaces exactly what you're looking for." },
              { step: "02", title: "Book Instantly", desc: "Select your tickets and confirm in seconds. No queues, no waiting, no friction. Just seamless reservation." },
              { step: "03", title: "Experience", desc: "Show up with your digital ticket, enjoy the event, and rate the experience to help our community grow." },
            ].map(({ step, title, desc }, i) => (
              <motion.div key={i} variants={fadeUpVariants} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <span className="font-display text-5xl sm:text-6xl font-bold text-evora-text-muted/30">{step}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-evora-text-primary">{title}</h3>
                <p className="mt-2 text-sm text-evora-text-secondary leading-relaxed max-w-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="container-content py-20 md:py-32 px-4 md:px-8">
        <motion.div 
          className="mb-12 md:mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-evora-primary">What People Say</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-evora-text-primary sm:text-4xl md:text-5xl">
            Loved by organizers and attendees alike.
          </h2>
        </motion.div>

        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { name: "Priya Sharma", role: "Event Organizer", quote: "Evora transformed how I manage events. The interface is so clean, my attendees think I hired a design team." },
            { name: "Alex Chen", role: "Tech Conference Host", quote: "The booking flow is insanely fast. We went from 500 to 2000 attendees and the platform didn't even flinch." },
            { name: "Maria Gonzalez", role: "Frequent Attendee", quote: "I've discovered events I never would have found otherwise. The curation is genuinely thoughtful and personal." },
          ].map(({ name, role, quote }, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="flex flex-col rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 sm:p-7 shadow-soft">
              <p className="flex-1 text-sm text-evora-text-secondary leading-relaxed italic">"{quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-evora-border-soft pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-evora-primary/10 text-sm font-semibold text-evora-primary">
                  {name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-evora-text-primary">{name}</p>
                  <p className="text-xs text-evora-text-muted">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="border-t border-evora-border">
        <div className="container-content py-20 md:py-32 px-4 md:px-8">
          <motion.div 
            className="relative overflow-hidden rounded-3xl bg-evora-primary px-6 py-16 text-center shadow-elegant sm:px-16 md:py-24"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
              Ready to create something extraordinary?
            </h2>
            <p className="mx-auto mt-4 sm:mt-5 max-w-lg text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Join thousands of organizers and attendees who have already made the switch to the most refined event platform on the web.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 w-full mx-auto">
              <Link to="/register" className="inline-flex h-14 items-center justify-center rounded-xl bg-evora-surface-secondary px-8 text-base font-medium text-evora-primary shadow-soft transition-all duration-fast ease-premium hover:bg-evora-surface-hover w-full sm:w-auto gap-2">
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/events" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-medium text-white/90 transition-colors duration-fast ease-premium hover:bg-white/10 w-full sm:w-auto">
                Browse Events
              </Link>
            </div>

            {/* Decorative glow inside CTA */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-evora-highlight/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-evora-accent/15 blur-[60px]" />
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-evora-border bg-evora-surface-secondary">
        <div className="container-content flex flex-col items-center justify-between gap-6 py-10 sm:flex-row px-4 md:px-8">
          <div className="font-display text-lg font-bold tracking-tight text-evora-primary">EVORA</div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-evora-text-secondary">
            <Link to="/events" className="transition-colors hover:text-evora-text-primary">Events</Link>
            <a href="#" className="transition-colors hover:text-evora-text-primary">About</a>
            <a href="#" className="transition-colors hover:text-evora-text-primary">Privacy</a>
            <a href="#" className="transition-colors hover:text-evora-text-primary">Terms</a>
          </nav>
          <p className="text-xs text-evora-text-muted text-center">&copy; {new Date().getFullYear()} Evora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
