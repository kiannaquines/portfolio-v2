import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  Code2,
  Mail,
  MapPin,
  Link2,
  LoaderCircle,
  MessageSquareText,
  Moon,
  Phone,
  SendHorizontal,
  Sparkles,
  Sun,
  Clock3,
  Circle,
  UserRound,
  X,
} from "lucide-react";
import {
  achievements,
  certifications,
  education,
  experience,
  projects,
  technologies,
} from "./data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const technologyAccents = {
  React: { primary: "97 218 251", secondary: "56 189 248", tertiary: "14 165 233" },
  "Next.js": { primary: "168 162 158", secondary: "120 113 108", tertiary: "41 37 36" },
  TypeScript: { primary: "147 197 253", secondary: "59 130 246", tertiary: "37 99 235" },
  JavaScript: { primary: "253 224 71", secondary: "234 179 8", tertiary: "161 98 7" },
  "Tailwind CSS": { primary: "103 232 249", secondary: "34 211 238", tertiary: "8 145 178" },
  "Node.js": { primary: "134 239 172", secondary: "74 222 128", tertiary: "22 163 74" },
  Python: { primary: "191 219 254", secondary: "96 165 250", tertiary: "245 158 11" },
  Go: { primary: "125 211 252", secondary: "56 189 248", tertiary: "2 132 199" },
  PHP: { primary: "216 180 254", secondary: "168 85 247", tertiary: "107 33 168" },
  Django: { primary: "110 231 183", secondary: "16 185 129", tertiary: "5 150 105" },
  Flask: { primary: "252 165 165", secondary: "248 113 113", tertiary: "220 38 38" },
  FastAPI: { primary: "110 231 183", secondary: "16 185 129", tertiary: "5 150 105" },
  Laravel: { primary: "253 186 116", secondary: "249 115 22", tertiary: "234 88 12" },
  PostgreSQL: { primary: "147 197 253", secondary: "59 130 246", tertiary: "30 64 175" },
  MySQL: { primary: "125 211 252", secondary: "14 165 233", tertiary: "12 74 110" },
  MongoDB: { primary: "134 239 172", secondary: "34 197 94", tertiary: "21 128 61" },
  SQLAlchemy: { primary: "252 165 165", secondary: "239 68 68", tertiary: "185 28 28" },
  Flutter: { primary: "125 211 252", secondary: "56 189 248", tertiary: "2 132 199" },
  Bootstrap: { primary: "216 180 254", secondary: "168 85 247", tertiary: "126 34 206" },
  jQuery: { primary: "147 197 253", secondary: "59 130 246", tertiary: "30 64 175" },
  "scikit-learn": { primary: "253 186 116", secondary: "251 146 60", tertiary: "234 88 12" },
  TensorFlow: { primary: "253 186 116", secondary: "249 115 22", tertiary: "194 65 12" },
  Pandas: { primary: "196 181 253", secondary: "139 92 246", tertiary: "109 40 217" },
  Docker: { primary: "125 211 252", secondary: "59 130 246", tertiary: "37 99 235" },
  MQTT: { primary: "196 181 253", secondary: "168 85 247", tertiary: "107 33 168" },
};

const technologyIcons = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  Flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  Laravel:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  SQLAlchemy:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg",
  Flutter:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  Bootstrap:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  jQuery: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  "scikit-learn":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  TensorFlow:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  Pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  MQTT: "https://cdn.simpleicons.org/mqtt/660066",
};

const chatPromptOptions = [
  "Which projects best show Kian's backend work?",
  "What stack does Kian use for full-stack apps?",
  "Where does Kian apply AI or ML?",
];

function getTechInsight(techName) {
  if (!techName) {
    return null;
  }

  const normalizedTechName = techName.toLowerCase();
  const relatedProjects = projects.filter((project) =>
    Array.isArray(project.tech) &&
    project.tech.some(
      (item) => typeof item === "string" && item.toLowerCase() === normalizedTechName
    )
  );
  const relatedExperience = experience.filter((item) =>
    Array.isArray(item.tech) &&
    item.tech.some(
      (entry) => typeof entry === "string" && entry.toLowerCase() === normalizedTechName
    )
  );

  return {
    title: `${techName} in practice`,
    stats: [
      `${relatedProjects.length} related project${relatedProjects.length === 1 ? "" : "s"}`,
      `${relatedExperience.length} experience role${relatedExperience.length === 1 ? "" : "s"}`,
    ],
    detail:
      relatedProjects[0]?.title
        ? `Featured in ${relatedProjects[0].title} and used across practical product work.`
        : `Part of Kian's broader stack for shipping product-focused systems.`,
  };
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [email, setEmail] = useState("");
  const [selectedTech, setSelectedTech] = useState(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [usedPrompts, setUsedPrompts] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Ask about my projects, experience, tech stack, or how I build AI-powered products.",
    },
  ]);
  const chatInputRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const isCompactChat = chatMessages.length <= 1 && !chatLoading && !chatError;

  useEffect(() => {
    document.body.classList.toggle("body-dark", dark);

    return () => {
      document.body.classList.remove("body-dark");
    };
  }, [dark]);

  useEffect(() => {
    const accent = selectedTech ? technologyAccents[selectedTech] : null;

    if (accent) {
      document.body.style.setProperty("--outside-accent-1", accent.primary);
      document.body.style.setProperty("--outside-accent-2", accent.secondary);
      document.body.style.setProperty("--outside-accent-3", accent.tertiary);
      document.body.classList.add("body-tech-active");
    } else {
      document.body.style.removeProperty("--outside-accent-1");
      document.body.style.removeProperty("--outside-accent-2");
      document.body.style.removeProperty("--outside-accent-3");
      document.body.classList.remove("body-tech-active");
    }

    return () => {
      document.body.style.removeProperty("--outside-accent-1");
      document.body.style.removeProperty("--outside-accent-2");
      document.body.style.removeProperty("--outside-accent-3");
      document.body.classList.remove("body-tech-active");
    };
  }, [selectedTech]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!chatOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      chatInputRef.current?.focus();
    }, 180);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [chatOpen]);

  useEffect(() => {
    if (!chatOpen || !chatMessagesRef.current) {
      return;
    }

    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [chatMessages, chatLoading, chatOpen]);

  const footerYear = new Date().getFullYear();
  const safeEmail = email.trim();
  const subject = encodeURIComponent("Portfolio enquiry");
  const body = safeEmail
    ? encodeURIComponent(`Hi Kian,\n\nI am reaching out from: ${safeEmail}\n\n`)
    : encodeURIComponent("Hi Kian,\n\n");
  const mailtoLink = `mailto:kjgnaquines@gmail.com?subject=${subject}&body=${body}`;
  const techInsight = getTechInsight(selectedTech);

  function openChatWindow() {
    setChatOpen(true);
  }

  async function sendChatMessage(message) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || chatLoading) {
      return;
    }

    const nextUserMessage = { role: "user", content: trimmedMessage };
    const nextHistory = [...chatMessages, nextUserMessage];

    setChatMessages(nextHistory);
    setChatInput("");
    setChatError("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: nextHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get a response right now.");
      }

      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setChatError(
        error instanceof Error ? error.message : "Unable to get a response right now."
      );
    } finally {
      setChatLoading(false);
    }
  }

  async function handleChatSubmit(event) {
    event.preventDefault();
    await sendChatMessage(chatInput);
  }

  async function handlePromptClick(prompt) {
    setUsedPrompts((current) => (current.includes(prompt) ? current : [...current, prompt]));
    setChatOpen(true);
    await sendChatMessage(prompt);
  }

  return (
    <div className={dark ? "site-shell dark" : "site-shell"}>
      <nav>
        <img
          className="avatar-circle"
          src="https://github.com/kiannaquines.png"
          alt="Kian Naquines GitHub avatar"
        />
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="theme-btn"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className="nav-chat-btn"
            onClick={openChatWindow}
          >
            <MessageSquareText size={15} />
            Message
          </button>
        </div>
      </nav>

      <div className={showFloatingNav ? "floating-nav visible" : "floating-nav"}>
        <div className="floating-nav-inner">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="nav-chat-btn floating-chat-btn"
            onClick={openChatWindow}
          >
            <MessageSquareText size={15} />
            Message
          </button>
          <button
            type="button"
            className="theme-btn floating-theme-btn"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      <div className="container">
        <section id="about" className="hero">
          <div className="hero-name">
            Kian Jearard G. Naquines
            <span className="badge badge-green">
              <Circle size={8} fill="currentColor" strokeWidth={0} />
              Open to Work
            </span>
          </div>

          <div className="hero-tags">
            <span className="badge">Full-Stack Engineer · Backend + AI Workflows</span>
            <span className="badge">
              <MapPin size={12} />
              Makilala, Cotabato, PH
            </span>
            <span className="badge">
              <Clock3 size={12} />
              Asia/Manila
            </span>
          </div>

          <p className="hero-bio">
            I build scalable backend APIs, data-driven systems, and AI-assisted
            product workflows. My recent work spans FastAPI services, relational
            database design, background workers, cloud deployment, and production
            machine learning features.
          </p>

        </section>

        <section id="projects">
          <div className="section-label">Selected product and systems work</div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-body">
                  <div className="project-head">
                    <div className="project-title">{project.title}</div>
                    {project.href ? (
                      <a
                        className="project-visit"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit
                      </a>
                    ) : null}
                  </div>
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

        <section id="technologies">
          <div className="section-label">My Technologies</div>
          <div className="tech-grid">
            {technologies.map((item) => {
              const techIcon = technologyIcons[item];
              const isActive = selectedTech === item;

              return (
                <button
                  type="button"
                  className={isActive ? "tech-tag active" : "tech-tag"}
                  key={item}
                  onClick={() => setSelectedTech((current) => (current === item ? null : item))}
                  aria-pressed={isActive}
                >
                  <span className="tech-icon-wrap">
                    {techIcon ? (
                      <img
                        className="tech-icon-img"
                        src={techIcon}
                        alt={`${item} icon`}
                        loading="lazy"
                      />
                    ) : (
                      <Code2 size={14} />
                    )}
                  </span>
                  {item}
                </button>
              );
            })}
          </div>
          {techInsight ? (
            <div className="tech-insight-card">
              <div className="tech-insight-head">
                <div>
                  <div className="tech-insight-title">{techInsight.title}</div>
                  <p className="tech-insight-copy">{techInsight.detail}</p>
                </div>
                <span className="tech-insight-badge">Selected</span>
              </div>
              <div className="tech-insight-stats">
                {techInsight.stats.map((item) => (
                  <span className="tech-insight-stat" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section id="experience">
          <div className="section-label">Experience</div>
          <div className="exp-cards">
            {experience.map((item) => (
              <article className="exp-card" key={`${item.company}-${item.role}`}>
                <div className="exp-card-header">
                  <div className="exp-card-left">
                    <div className="exp-card-company">{item.company}</div>
                    <div className="exp-card-role">{item.role}</div>
                  </div>
                  {item.dates ? (
                    <div className="exp-card-dates">{item.dates}</div>
                  ) : null}
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

        <section id="achievements">
          <div className="section-label">Resume achievements</div>
          <div className="projects-grid">
            {achievements.map((item) => (
              <article className="project-card" key={item.title}>
                <div className="project-body">
                  <div className="project-title">{item.title}</div>
                  <div className="project-desc">{item.desc}</div>
                  <div className="pills">
                    {item.tech.map((tech) => (
                      <span className="pill" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education">
          <div className="section-label">Education</div>
          <div className="exp-cards">
            {education.map((item) => (
              <article className="exp-card" key={`${item.degree}-${item.school}`}>
                <div className="exp-card-header">
                  <div className="exp-card-left">
                    <div className="exp-card-company">{item.degree}</div>
                    <div className="exp-card-role">{item.school}</div>
                  </div>
                </div>
                <div className="exp-card-desc">{item.details}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications">
          <div className="section-label">Training and certifications</div>
          <div className="cert-grid">
            {certifications.map((item) => (
              <article className="cert-card" key={item}>
                <div className="pills">
                  <span className="pill">{item}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>

      <div className="container">
        <section id="contact">
          <div className="section-label">Get in touch</div>
          <p className="contact-copy">
            I&apos;m open to full-stack engineering roles, backend-heavy product work,
            and practical AI integrations. Send a short note and I&apos;ll reply with
            the best next step.
          </p>
          <p className="contact-meta">
            <span className="meta-item">
              <Mail size={13} />
              kjgnaquines@gmail.com
            </span>
            <span className="meta-separator">·</span>
            <span className="meta-item">
              <Phone size={13} />
              +63 9109384278
            </span>
            <span className="meta-separator">·</span>
            <span className="meta-item">
              <MapPin size={13} />
              Makilala, Cotabato, PH
            </span>
            <span className="meta-separator">·</span>
            <a
              className="meta-item meta-link"
              href="https://github.com/kiannaquines/"
              target="_blank"
              rel="noreferrer"
            >
              <Link2 size={13} />
              github.com/kiannaquines
            </a>
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

      <div
        className={
          chatOpen
            ? isCompactChat
              ? "support-chat open compact"
              : "support-chat open"
            : isCompactChat
              ? "support-chat compact"
              : "support-chat"
        }
      >
        <div className={isCompactChat ? "chat-shell compact" : "chat-shell"}>
          <div className="chat-head">
            <div className="chat-intro">
              <div className="chat-intro-icon">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="chat-title">Kuya Kian.</div>
                <p className="chat-copy">Ask Kuya Kian</p>
              </div>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setChatOpen(false)}
              aria-label="Close message window"
            >
              <X size={16} />
            </button>
          </div>

          <div
            ref={chatMessagesRef}
            className={isCompactChat ? "chat-messages compact" : "chat-messages"}
          >
            {chatMessages.map((message, index) => (
              <article
                className={
                  message.role === "user" ? "chat-message user" : "chat-message assistant"
                }
                key={`${message.role}-${index}`}
              >
                <div className="chat-avatar">
                  {message.role === "user" ? <UserRound size={16} /> : <Bot size={16} />}
                </div>
                <div className="chat-bubble">{message.content}</div>
              </article>
            ))}

            {chatLoading ? (
              <article className="chat-message assistant">
                <div className="chat-avatar">
                  <Bot size={16} />
                </div>
                <div className="chat-bubble chat-loading">
                  <LoaderCircle size={16} className="spin" />
                  Thinking...
                </div>
              </article>
            ) : null}
          </div>

          <div className="chat-prompts">
            {chatPromptOptions.map((prompt) => {
              const used = usedPrompts.includes(prompt);

              return (
                <button
                  key={prompt}
                  type="button"
                  className={used ? "chat-prompt used" : "chat-prompt"}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={chatLoading}
                >
                  {used ? <Check size={14} /> : <Sparkles size={14} />}
                  {prompt}
                </button>
              );
            })}
          </div>

          <form className="chat-form" onSubmit={handleChatSubmit}>
            <div className="chat-input-wrap">
              <MessageSquareText size={16} />
              <input
                ref={chatInputRef}
                className="chat-input"
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
              />
            </div>
            <button type="submit" className="chat-submit" disabled={chatLoading}>
              <SendHorizontal size={16} />
              Send
            </button>
          </form>

          {chatError ? <p className="chat-error">{chatError}</p> : null}
        </div>
      </div>

      <footer>
        © {footerYear} Kian Naquines ·{" "}
        <a href="mailto:kjgnaquines@gmail.com">kjgnaquines@gmail.com</a> ·{" "}
        <a href="https://github.com/kiannaquines" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        ·{" "}
        <a
          href="https://portfolio.askkuyakian.online/"
          target="_blank"
          rel="noreferrer"
        >
          Live Site
        </a>
      </footer>
    </div>
  );
}
