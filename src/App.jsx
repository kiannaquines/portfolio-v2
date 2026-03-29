import { useState } from "react";
import DotGridBackground from "./components/DotGridBackground";
import Globe from "./components/Globe";
import RippleBackground from "./components/RippleBackground";
import {
  experience,
  journey,
  projects,
  technologies,
  testimonials,
} from "./data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");

  const footerYear = new Date().getFullYear();
  const safeEmail = email.trim();
  const subject = encodeURIComponent("Portfolio enquiry");
  const body = safeEmail
    ? encodeURIComponent(`Hi Kian,\n\nI am reaching out from: ${safeEmail}\n\n`)
    : encodeURIComponent("Hi Kian,\n\n");
  const mailtoLink = `mailto:kjgnaquines@gmail.com?subject=${subject}&body=${body}`;

  return (
    <div className={dark ? "site-shell dark" : "site-shell"}>
      <nav>
        <div className="avatar-circle">K</div>
        <div className="nav-links">
          <button
            type="button"
            className="theme-btn"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="main-grid-shell">
        <DotGridBackground dark={dark} />
        <div className="main-grid-content">
          <div className="container">
            <div className="hero-ripple-wrap">
              <RippleBackground dark={dark} />
              <section id="about" className="hero">
                <div className="hero-name">
                  Kian Naquines
                  <span className="badge badge-green">● Open to Work</span>
                </div>

                <div className="hero-tags">
                  <span className="badge">AI-First Full-Stack Engineer</span>
                  <span className="badge">📍 North Cotabato, PH</span>
                  <span className="badge">🕐 Asia/Manila</span>
                </div>

                <p className="hero-bio">
                  I design, build, and ship reliable web and mobile systems with
                  an AI-first mindset. Recent work includes real-time data
                  pipelines, ML-powered product features, and tooling that
                  speeds up delivery.
                </p>
              </section>
            </div>

            <section id="projects">
              <div className="section-label">I love building things</div>
              <div className="projects-grid">
                {projects.map((project) => (
                  <article className="project-card" key={project.title}>
                    <div className="project-img">
                      <img
                        src={project.img}
                        alt={project.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="project-body">
                      <div className="project-title">{project.title}</div>
                      <div className="project-desc">{project.desc}</div>
                      <div className="pills">
                        {project.tech.map((item) => (
                          <span className="pill" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="section-label">My Technologies</div>
              <div className="tech-grid">
                {technologies.map((item) => (
                  <span className="tech-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <div className="section-label">Experience</div>
              <div className="exp-cards">
                {experience.map((item) => (
                  <article
                    className="exp-card"
                    key={`${item.company}-${item.role}`}
                  >
                    <div className="exp-card-header">
                      <div className="exp-card-left">
                        <div className="exp-card-company">{item.company}</div>
                        <div className="exp-card-role">{item.role}</div>
                      </div>
                      <div className="exp-card-dates">{item.dates}</div>
                    </div>
                    <div className="exp-card-desc">{item.desc}</div>
                    <div className="pills">
                      {item.tech.map((tech) => (
                        <span className="pill" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="journey">
              <div className="section-label">My journey as a developer</div>
              <div className="timeline">
                {journey.map((item) => (
                  <article className="tl-item" key={`${item.year}-${item.title}`}>
                    <div className="tl-dot" />
                    <div className="tl-year">{item.year}</div>
                    <div className="tl-title">{item.title}</div>
                    <div className="tl-desc">{item.desc}</div>
                    <div className="pills">
                      {item.tech.map((tech) => (
                        <span className="pill" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="section-label">People love my work</div>
              <div className="testimonials-wrap">
                <div className="testimonials-track">
                  {[...testimonials, ...testimonials].map((item, index) => (
                    <article className="tcard" key={`${item.name}-${index}`}>
                      <p className="tcard-text">"{item.text}"</p>
                      <div className="tcard-author">
                        <div className="tcard-av">{item.name[0]}</div>
                        <div>
                          <div className="tcard-name">{item.name}</div>
                          <div className="tcard-role">{item.role}</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="globe-shell">
            <div className="globe-section">
              <div className="globe-content">
                <h2 className="globe-title">
                  Building systems that work all over the world.
                </h2>
                <p className="globe-desc">
                  Open to new opportunities and collaborations on interesting
                  projects. Whether you need a full-stack engineer or an
                  ML-powered solution, let&apos;s build it.
                </p>
                <div className="globe-btns">
                  <button
                    type="button"
                    className="btn-p"
                    onClick={() =>
                      window.open("mailto:kjgnaquines@gmail.com", "_self")
                    }
                  >
                    Get in Touch
                  </button>
                  <button
                    type="button"
                    className="btn-s"
                    onClick={() =>
                      window.open(
                        "https://github.com/kiannaquines",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    GitHub →
                  </button>
                </div>
              </div>
              <div className="globe-visual">
                <Globe />
              </div>
            </div>
          </div>

          <div className="container">
            <section id="contact">
              <div className="section-label">Get in touch</div>
              <p className="contact-copy">
                I&apos;m currently open to new opportunities. Whether you have a
                question or want to say hi, hit that button.
              </p>
              <p className="contact-meta">
                📧 kjgnaquines@gmail.com · 📞 +63 9013630647 · 📍 North
                Cotabato, PH
              </p>
              <div className="contact-row">
                <input
                  className="contact-input"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  type="button"
                  className="contact-btn"
                  onClick={() => window.open(mailtoLink, "_self")}
                >
                  Send Enquiry
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer>
        © {footerYear} Kian Naquines ·{" "}
        <a href="mailto:kjgnaquines@gmail.com">kjgnaquines@gmail.com</a> ·{" "}
        <a href="https://github.com/kiannaquines" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        ·{" "}
        <a
          href="https://kian-portfolio-psi.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Live Site
        </a>
      </footer>
    </div>
  );
}
