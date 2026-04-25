// src/pages/AboutUs.jsx
import { useEffect, useRef } from "react";
import "../styles/AboutUs.css";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const features = [
  {
    icon: "🎓", col: "fc1",
    title: "Alumni Mentorship",
    desc: "Get matched with experienced seniors and alumni from your own college who understand your exact curriculum, professors, and campus culture. Get real, relevant guidance.",
    tag: "1-on-1 Guidance"
  },
  {
    icon: "🧭", col: "fc2",
    title: "Career Guidance",
    desc: "Access structured roadmaps, resume reviews, mock interviews, and career planning sessions — all tailored to the opportunities available to students from your college.",
    tag: "Structured Roadmaps"
  },
  {
    icon: "🌐", col: "fc3",
    title: "Networking Opportunities",
    desc: "Connect with seniors across various companies, industries and cities who all share the same college background as you — making every conversation warm and relatable.",
    tag: "Alumni Network"
  },
  {
    icon: "💡", col: "fc4",
    title: "Real-World Insights",
    desc: "Hear candid stories about placements, off-campus opportunities, higher education, and career pivots from alumni who graduated from your exact college.",
    tag: "Insider Knowledge"
  },
];

const steps = [
  {
    n: "1", emoji: "📝",
    title: "Students Sign Up",
    desc: "Create your profile in minutes with your branch, year, and career interests. Tell us what kind of guidance you're looking for."
  },
  {
    n: "2", emoji: "🌟",
    title: "Alumni Share Wisdom",
    desc: "Graduated seniors join to give back — sharing placement experiences, industry knowledge, and honest advice about life after college."
  },
  {
    n: "3", emoji: "🚀",
    title: "Connections are Built",
    desc: "Get matched with the most relevant alumni. Book sessions, attend events, and build lasting professional relationships within your college community."
  },
];

const missionCards = [
  { icon: "🎯", col: "icon-blue",  title: "Our Purpose",   desc: "Bridge the gap between current students and our college alumni network" },
  { icon: "🤝", col: "icon-green", title: "Our Community", desc: "Students, final-year seniors, and alumni all from our college" },
  { icon: "⭐", col: "icon-amber", title: "Our Impact",    desc: "Helping students make informed career decisions through real guidance" },
];

const footerLinks = {
  Platform: ["Find Alumni", "Career Events", "Resume Review", "Mock Interviews"],
  College:  ["About Us", "Our Mission", "Blog", "Gallery"],
  Support:  ["Help Center", "Contact Us", "Privacy Policy", "Terms"],
};

function AboutUs() {
  const missionRef  = useReveal();
  const stepsRef    = useReveal();
  const featuresRef = useReveal();
  const ctaRef      = useReveal();

  return (
    <>
      {/* NAVBAR */}
      {/* <nav className="au-nav">
        <a className="au-nav-brand" href="#">
          <div className="au-nav-icon">🔗</div>
          <h2>Career<span>Connect</span></h2>
        </a>
        <ul className="au-nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#" className="active">About</a></li>
          <li><a href="#">Mentors</a></li>
          <li><a href="#">Events</a></li>
        </ul>
        <button className="au-nav-btn">Get Started</button>
      </nav> */}


      <section className="au-hero">
        <div className="au-hero-bg" />
        <div className="au-hero-dots" />
        <div className="au-hero-content">
          <div className="au-hero-badge">
            <span className="au-hero-badge-dot" />
            About Career Connect
          </div>
          <h1>Your College.<br />Your <em>Connections</em>.<br />Your Career.</h1>
          <p className="au-hero-sub">
            Career Connect is an exclusive platform for our college — connecting current students
            with our own alumni network for mentorship, career guidance, and real opportunities.
          </p>
          <div className="au-hero-stats">
            <div className="au-stat">
              <div className="au-stat-num">500+</div>
              <div className="au-stat-label">Active Students</div>
            </div>
            <div className="au-stat">
              <div className="au-stat-num">200+</div>
              <div className="au-stat-label">Alumni Mentors</div>
            </div>
            <div className="au-stat">
              <div className="au-stat-num">98%</div>
              <div className="au-stat-label">Satisfaction Rate</div>
            </div>
            <div className="au-stat">
              <div className="au-stat-num">50+</div>
              <div className="au-stat-label">Companies Reached</div>
            </div>
          </div>
        </div>
      </section>

      <section className="au-section au-section-alt">
        <div className="au-mission-grid reveal" ref={missionRef}>
          <div className="au-mission-visual">
            {missionCards.map((c, i) => (
              <div className="au-mission-card" key={i}>
                <div className={`au-mission-card-icon ${c.col}`}>{c.icon}</div>
                <div className="au-mission-text">
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="au-mission-copy">
            <span className="au-eyebrow">Our Mission</span>
            <h2>Empowering Our Students to <span>Reach Further</span></h2>
            <p>We believe every student at our college deserves access to honest guidance, strong connections, and insider knowledge — from people who sat in the same classrooms as them.</p>
            <p>Career Connect was built by students, for students of our college. We noticed that career success often comes down to who you know — and we're changing that by giving everyone access to our alumni network.</p>
            <p>Whether you're figuring out your first internship or preparing for placements, our alumni are here to walk that journey with you.</p>
            <button className="au-btn-primary">Explore the Platform →</button>
          </div>
        </div>
      </section>


      <section className="au-section">
        <div className="au-section-header">
          <span className="au-eyebrow">How It Works</span>
          <h2>Three Simple Steps to Get Started</h2>
          <p>Getting connected with the right alumni mentor takes just a few minutes. Here's how it works.</p>
        </div>
        <div className="au-steps reveal" ref={stepsRef}>
          {steps.map((s, i) => (
            <div className="au-step" key={i}>
              <span className="au-step-emoji">{s.emoji}</span>
              <div className="au-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="au-section au-section-alt">
        <div className="au-section-header">
          <span className="au-eyebrow">What We Offer</span>
          <h2>Everything You Need in One Place</h2>
          <p>From finding the right mentor to landing your dream job — our platform is built around what our students actually need.</p>
        </div>
        <div className="au-features-grid reveal" ref={featuresRef}>
          {features.map((f, i) => (
            <div className="au-feature-card" key={i}>
              <div className={`au-feature-icon ${f.col}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="au-feature-tag">{f.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="au-cta reveal" ref={ctaRef}>
        <div className="au-cta-content">
          <h2>Ready to Shape Your Future?</h2>
          <p>Join your fellow students and alumni who are already building connections and accelerating careers through our college network.</p>
          <div className="au-cta-btns">
            <button className="au-cta-btn-white">Join as Student →</button>
            <button className="au-cta-btn-outline">Join as Alumni</button>
          </div>
        </div>
      </section>


      <footer className="au-footer">
        <div className="au-footer-top">
          <div className="au-footer-brand">
            <h3>Career<span>Connect</span></h3>
            <p>An exclusive career networking platform for our college students and alumni.</p>
          </div>
          <div className="au-footer-links">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div className="au-footer-col" key={heading}>
                <h4>{heading}</h4>
                <ul>
                  {links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="au-footer-bottom">
          <p>© 2025 CareerConnect. All rights reserved. Made with ❤️ for our college community.</p>
          <div className="au-footer-badges">
            <span className="au-footer-badge">React</span>
            <span className="au-footer-badge">Plain CSS</span>
            <span className="au-footer-badge">Responsive</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AboutUs;