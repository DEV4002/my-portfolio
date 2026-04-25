import { useState, useEffect, useRef, useCallback } from "react";


const PORTFOLIO_DATA = {
  name: "Dibyaranjan Das",
  title: "AI/ML Engineer",
  taglines: ["AI/ML Engineer","Python Devloper", "Software Devloper AI","Generative AI Practitioner", "Vibe Coder", "Deep Learning Architect", "LLM Whisperer"],
  email: "dibyadibya071@gmail.com",
  phone: "+91 7653877395",
  location: "Odisha, India",
  linkedin: "https://www.linkedin.com/in/dibyaranjan-das-1118a7296/",
  github: "https://github.com/DEV4002",
  instagram: "https://www.instagram.com/d_b_y_a?igsh=cjR5MGJnd3Njd2hr",
  about: `I'm an AI/ML Engineer passionate about building intelligent systems that solve real-world problems. 
  Specializing in computer vision, NLP, and generative AI, I bridge the gap between cutting-edge research 
  and production-ready solutions. Currently pushing the boundaries of what's possible with LLMs and 
  multimodal AI systems.`,
  experience: [
    {
      role: "AI/ML Engineer",
      company: "Wavekart Digital ",
      period: "2023 – Present",
      desc: "Building production AI systems, LLM pipelines, and computer vision solutions for enterprise clients. Led development of real-time video analysis and generative AI tools.",
      color: "#00f5ff"
    },
    {
      role: "AI/ML Intern",
      company: "Webbocket",
      period: "2022 – 2023",
      desc: "Developed ML models for predictive analytics, automated data pipelines, and deployed deep learning models to cloud infrastructure.",
      color: "#b347ff"
    }
  ],
  skills: {
    "AI/ML": [
      { name: "TensorFlow", level: 92 },
      { name: "PyTorch", level: 88 },
      { name: "YOLOv8", level: 85 },
      { name: "Scikit-learn", level: 90 },
      { name: "LangChain", level: 87 },
      { name: "OpenAI API", level: 93 }
      
    ],
    "Web": [
      { name: "Flask", level: 85 },
      { name: "Django", level: 80 },
      { name: "JavaScript", level: 78 },
      { name: "FastAPI", level: 82 },
      { name: "React", level: 75 }
    ],
    "Tools": [
      { name: "OpenCV", level: 88 },
      { name: "MySQL", level: 80 },
      { name: "Docker", level: 75 },
      { name: "Git", level: 90 },
      { name: "AWS", level: 72 }
    ]
  },
  projects: [
    {
      id: 1,
      title: "PUBLIC_EYE",
      subtitle: "Violence & Weapon Detection System",
      desc: "Real-time AI surveillance system using YOLOv8 and computer vision to detect violence, weapons, and suspicious activities in public spaces. Processes live CCTV feeds with <100ms latency.",
      tech: ["YOLOv8", "OpenCV", "Python", "Flask", "TensorFlow"],
      color: "#ff4757",
      icon: "👁",
      category: "Computer Vision"
    },
    {
      id: 2,
      title: "AI Assistant",
      subtitle: "Multi-Modal Intelligent Assistant",
      desc: "A sophisticated AI assistant powered by large language models with RAG architecture. Supports document analysis, code generation, and multi-turn conversations with memory.",
      tech: ["LangChain", "OpenAI", "RAG", "FastAPI", "React"],
      color: "#00f5ff",
      icon: "🤖",
      category: "NLP/LLM"
    },
    {
      id: 3,
      title: "AI Marketing Optimizer",
      subtitle: "Intelligent Campaign Analytics",
      desc: "ML-powered marketing platform that analyzes campaign performance, predicts ROI, and auto-generates optimized ad copy using generative AI with A/B testing capabilities.",
      tech: ["PyTorch", "GPT-4", "Django", "Pandas", "PostgreSQL"],
      color: "#b347ff",
      icon: "📈",
      category: "Generative AI"
    }
  ]
};

const CHATBOT_CONTEXT = `You are DEVSHOT, the AI assistant for Dibyaranjan Das's portfolio. You are a witty, professional AI assistant embedded in his portfolio website.

About Dibyaranjan:
- AI/ML Engineer with expertise in computer vision, NLP, and generative AI
- Works at Wavekart Digital as AI/ML Engineer
- Previously interned at Webbocket
- Skills: TensorFlow, PyTorch, YOLOv8, LangChain, Flask, Django, OpenCV
- Projects: PUBLIC_EYE (violence detection), AI Assistant (LLM-powered), AI Marketing Optimizer
- Location: Odisha, India
- Available for freelance, full-time, and consulting opportunities

Your role:
1. Answer questions about Dibyaranjan's skills, projects, and experience enthusiastically
2. Help recruiters understand his capabilities
3. Guide visitors through the portfolio
4. Be concise (under 3 sentences usually) but informative
5. Add a techy, futuristic vibe to your responses
Keep responses short and punchy unless asked for details.`;

// Particle Canvas
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const N = 80;
    particlesRef.current = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? "#00f5ff" : "#b347ff"
    }));

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const pts = particlesRef.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Mouse attraction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += dx * 0.0002;
          p.vy += dy * 0.0002;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const ex = p.x - q.x;
          const ey = p.y - q.y;
          const ed = Math.sqrt(ex * ex + ey * ey);
          if (ed < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - ed / 100) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "all"
      }}
    />
  );
}

// Typewriter
function Typewriter({ texts, speed = 80, pause = 1800 }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return (
    <span style={{ color: "#00f5ff" }}>
      {display}
      <span style={{ animation: "blink 1s step-end infinite", color: "#00f5ff" }}>|</span>
    </span>
  );
}

// Skill Bar
function SkillBar({ name, level, color }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "#ccc", fontFamily: "'Space Mono', monospace" }}>{name}</span>
        <span style={{ fontSize: 12, color: color }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: animated ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: 2,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}66`
        }} />
      </div>
    </div>
  );
}

// 3D Tilt Card
function TiltCard({ children, style }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };
  const handleLeave = () => {
    ref.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.15s ease", ...style }}
    >
      {children}
    </div>
  );
}

// Chatbot
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey! I'm DEVSHOT 🤖 — Dibyaranjan's AI. Ask me anything about his work, projects, or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: CHATBOT_CONTEXT,
          messages: [...history, { role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "System error. Please try again.";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Connection lost. Check your network." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 999,
          width: 58, height: 58, borderRadius: "50%",
          background: "linear-gradient(135deg, #00f5ff, #b347ff)",
          border: "none", cursor: "pointer",
          boxShadow: "0 0 24px #00f5ff66, 0 0 48px #b347ff44",
          fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          animation: "pulse 2s ease-in-out infinite"
        }}
        title="Chat with DEVSHOT"
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 100, right: 28, zIndex: 998,
          width: 340, height: 480,
          background: "rgba(8,8,20,0.96)",
          border: "1px solid rgba(0,245,255,0.25)",
          borderRadius: 16,
          display: "flex", flexDirection: "column",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(0,245,255,0.15), 0 20px 60px rgba(0,0,0,0.8)",
          overflow: "hidden"
        }}>
          {/* Header */}
          <div style={{
            padding: "12px 16px",
            background: "linear-gradient(90deg, rgba(0,245,255,0.15), rgba(179,71,255,0.15))",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", gap: 10
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #00f5ff, #b347ff)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
            }}>🤖</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: "'Space Mono', monospace" }}>DEVSHOT</div>
              <div style={{ fontSize: 11, color: "#00f5ff" }}>● Online</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "8px 12px",
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: m.role === "user"
                    ? "linear-gradient(135deg, #00f5ff22, #b347ff22)"
                    : "rgba(255,255,255,0.07)",
                  border: m.role === "user" ? "1px solid rgba(0,245,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  fontSize: 13, color: "#e0e0e0", lineHeight: 1.5
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%", background: "#00f5ff",
                    animation: `bounce 1s ${i * 0.2}s ease-in-out infinite`
                  }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask DEVSHOT..."
              style={{
                flex: 1, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(0,245,255,0.2)",
                borderRadius: 8, padding: "8px 12px",
                color: "#fff", fontSize: 13, outline: "none",
                fontFamily: "'Space Mono', monospace"
              }}
            />
            <button
              onClick={send}
              style={{
                background: "linear-gradient(135deg, #00f5ff, #b347ff)",
                border: "none", borderRadius: 8, padding: "8px 12px",
                color: "#000", cursor: "pointer", fontSize: 13, fontWeight: 600
              }}
            >→</button>
          </div>
        </div>
      )}
    </>
  );
}

// Contact Form
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("Please fill all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setStatus("Message sent! Dibyaranjan will respond soon. 🚀");
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(0,245,255,0.2)",
    borderRadius: 8, color: "#fff",
    fontSize: 14, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
    transition: "border-color 0.2s"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <input
        placeholder="Your Name"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        style={inputStyle}
      />
      <input
        placeholder="Your Email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        style={inputStyle}
      />
      <textarea
        placeholder="Your Message..."
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        rows={4}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      <button
        onClick={submit}
        disabled={loading}
        style={{
          padding: "13px 0",
          background: loading ? "rgba(0,245,255,0.3)" : "linear-gradient(135deg, #00f5ff, #b347ff)",
          border: "none", borderRadius: 8, color: "#000",
          fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "'Space Mono', monospace",
          transition: "opacity 0.2s"
        }}
      >
        {loading ? "TRANSMITTING..." : "SEND MESSAGE →"}
      </button>
      {status && <p style={{ color: "#00f5ff", fontSize: 13, margin: 0, textAlign: "center" }}>{status}</p>}
    </div>
  );
}

// Navigation
function Nav({ active, setActive, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"];

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 5%",
      background: scrolled ? "rgba(4,4,12,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,245,255,0.1)" : "none",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64
    }}>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700, fontSize: 18, color: "#00f5ff",
          cursor: "pointer", letterSpacing: 2
        }}
        onClick={() => scroll("home")}
      >
        DIBYA <span style={{ color: "#b347ff" }}></span>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {links.map(l => (
          <button
            key={l}
            onClick={() => scroll(l.toLowerCase())}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#999", fontSize: 11,
              fontFamily: "'Space Mono', monospace", letterSpacing: 1,
              padding: "6px 10px", borderRadius: 4,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#00f5ff"}
            onMouseLeave={e => e.target.style.color = "#999"}
          >
            {l}
          </button>
        ))}
        <button
          onClick={() => setDarkMode(d => !d)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 6, padding: "5px 10px",
            color: "#ccc", fontSize: 14, cursor: "pointer"
          }}
        >
          {darkMode ? "☀" : "◑"}
        </button>
      </div>
    </nav>
  );
}

// Section wrapper
function Section({ id, children, style }) {
  return (
    <section id={id} style={{ padding: "100px 8%", position: "relative", ...style }}>
      {children}
    </section>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 56, textAlign: "center" }}>
      <div style={{ fontSize: 11, letterSpacing: 4, color: "#00f5ff", fontFamily: "'Space Mono', monospace", marginBottom: 12 }}>
        {sub || "// SECTION"}
      </div>
      <h2 style={{
        fontSize: "clamp(28px, 5vw, 48px)",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 700, margin: 0, color: "#fff",
        textTransform: "uppercase", letterSpacing: 3
      }}>
        {children}
      </h2>
      <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, #00f5ff, #b347ff)", margin: "16px auto 0" }} />
    </div>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSkill, setActiveSkill] = useState("AI/ML");
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPct(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setLoading(false), 400); return 100; }
        return p + Math.random() * 15;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const bg = darkMode ? "#04040c" : "#0a0a1a";
  const text = "#e0e0e0";

  if (loading) return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#04040c",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", zIndex: 9999
    }}>
      <div style={{ fontFamily: "'Space Mono', monospace", color: "#00f5ff", fontSize: 13, marginBottom: 32, letterSpacing: 3 }}>
        INITIALIZING DIBYA PORTFOLIO...
      </div>
      <div style={{ width: 280, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${Math.min(loadPct, 100)}%`,
          background: "linear-gradient(90deg, #00f5ff, #b347ff)",
          transition: "width 0.15s ease",
          boxShadow: "0 0 12px #00f5ff"
        }} />
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", color: "#444", fontSize: 11, marginTop: 12 }}>
        {Math.round(Math.min(loadPct, 100))}%
      </div>
    </div>
  );

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Rajdhani', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #04040c; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#00f5ff, #b347ff); border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 24px #00f5ff66, 0 0 48px #b347ff44} 50%{box-shadow:0 0 36px #00f5ffaa, 0 0 72px #b347ff77} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes glow { 0%,100%{text-shadow:0 0 20px #00f5ff66} 50%{text-shadow:0 0 40px #00f5ffcc, 0 0 80px #00f5ff44} }
        @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* HERO */}
      <section id="home" style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <ParticleCanvas />

        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none"
        }} />

        {/* Gradient orbs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(179,71,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 5%", animation: "fadeUp 1s ease forwards" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#00f5ff", letterSpacing: 6, marginBottom: 20 }}>
            ◈ DIBYA PORTFOLIO SPACE ◈
          </div>

          <h1 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(40px, 8vw, 90px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: 4,
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #ffffff 30%, #00f5ff 60%, #b347ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "glow 3s ease-in-out infinite",
            marginBottom: 12
          }}>
            Dibyaranjan<br />Das
          </h1>

          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(13px, 2.5vw, 18px)",
            color: "#888",
            marginBottom: 40,
            minHeight: 28
          }}>
            <Typewriter texts={PORTFOLIO_DATA.taglines} />
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "HIRE ME", href: "#contact", primary: true },
              { label: "VIEW PROJECTS", href: "#projects", primary: false },
              { label: "DOWNLOAD CV", href: "#", primary: false }
            ].map(b => (
              <a
                key={b.label}
                href={b.href}
                onClick={e => { e.preventDefault(); document.getElementById(b.href.slice(1))?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  padding: "12px 28px",
                  borderRadius: 6,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12, letterSpacing: 2, fontWeight: 700,
                  textDecoration: "none",
                  background: b.primary ? "linear-gradient(135deg, #00f5ff, #b347ff)" : "transparent",
                  color: b.primary ? "#000" : "#00f5ff",
                  border: b.primary ? "none" : "1px solid rgba(0,245,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: b.primary ? "0 0 24px rgba(0,245,255,0.4)" : "none"
                }}
              >{b.label}</a>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
            {[[" Fresher", ], ["10+", "AI Projects"], ["10+", "Technologies"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 36, fontWeight: 700, color: "#00f5ff", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#555", letterSpacing: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease-in-out infinite", opacity: 0.5 }}>
          <div style={{ width: 24, height: 38, border: "2px solid #00f5ff44", borderRadius: 12, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 4 }}>
            <div style={{ width: 3, height: 8, background: "#00f5ff", borderRadius: 2, animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <SectionTitle sub="// WHO AM I">About Me</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
          {/* Photo + decorative frame */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: -3, borderRadius: 16, background: "linear-gradient(135deg, #00f5ff, #b347ff, #00f5ff)", animation: "rotate 6s linear infinite" }} />
            <div style={{ position: "relative", width: 260, height: 320, borderRadius: 14, overflow: "hidden", border: "3px solid #04040c" }}>
              <img
                src="/mnt/user-data/uploads/ghjghjg.jpg"
                alt="Dibyaranjan Das"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentNode.style.background = "linear-gradient(135deg, #00f5ff22, #b347ff22)";
                  e.target.parentNode.innerHTML = `<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:72px">🧑‍💻</div>`;
                }}
              />
            </div>
            {/* Floating badges */}
            <div style={{ position: "absolute", top: 20, right: 0, background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.3)", borderRadius: 8, padding: "6px 12px", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00f5ff", animation: "float 3s ease-in-out infinite" }}>
              AI/ML Engineer
            </div>
            <div style={{ position: "absolute", bottom: 30, left: 0, background: "rgba(179,71,255,0.12)", border: "1px solid rgba(179,71,255,0.3)", borderRadius: 8, padding: "6px 12px", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#b347ff", animation: "float 3.5s ease-in-out infinite" }}>
              Python Devloper
            </div>
            <div style={{ position: "absolute", bottom: 30, left: 0, background: "rgba(179,71,255,0.12)", border: "1px solid rgba(179,71,255,0.3)", borderRadius: 8, padding: "6px 12px", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#b347ff", animation: "float 3.5s ease-in-out infinite" }}>
              Software Devloper AI
            </div>
            <div style={{ position: "absolute", bottom: 30, left: 0, background: "rgba(179,71,255,0.12)", border: "1px solid rgba(179,71,255,0.3)", borderRadius: 8, padding: "6px 12px", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#b347ff", animation: "float 3.5s ease-in-out infinite" }}>
              Gen AI Practitioner
            </div>
          </div>

          {/* Text */}
          <div>
            <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.8, marginBottom: 32 }}>
              {PORTFOLIO_DATA.about}
            </p>

            {/* Timeline */}
            <div style={{ borderLeft: "2px solid rgba(0,245,255,0.2)", paddingLeft: 24 }}>
              {PORTFOLIO_DATA.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 28, position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -31, top: 4, width: 12, height: 12,
                    borderRadius: "50%", background: exp.color,
                    boxShadow: `0 0 12px ${exp.color}88`
                  }} />
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: exp.color, marginBottom: 4 }}>{exp.period}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{exp.role}</div>
                  <div style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>@ {exp.company}</div>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" style={{ background: "rgba(255,255,255,0.01)" }}>
        <SectionTitle sub="// TECH ARSENAL">Skills</SectionTitle>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
          {Object.keys(PORTFOLIO_DATA.skills).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveSkill(cat)}
              style={{
                padding: "8px 24px",
                borderRadius: 4,
                fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 2,
                border: activeSkill === cat ? "none" : "1px solid rgba(255,255,255,0.15)",
                background: activeSkill === cat ? "linear-gradient(135deg, #00f5ff, #b347ff)" : "transparent",
                color: activeSkill === cat ? "#000" : "#666",
                cursor: "pointer", fontWeight: 700
              }}
            >{cat}</button>
          ))}
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {(PORTFOLIO_DATA.skills[activeSkill] || []).map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} color={i % 2 === 0 ? "#00f5ff" : "#b347ff"} />
          ))}
        </div>

        {/* Tech bubbles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 48 }}>
          {["TensorFlow", "PyTorch", "YOLOv8", "LangChain", "OpenCV", "Flask", "Django", "FastAPI", "Docker", "AWS", "MySQL", "React"].map(t => (
            <span key={t} style={{
              padding: "6px 16px",
              borderRadius: 20,
              background: "rgba(0,245,255,0.06)",
              border: "1px solid rgba(0,245,255,0.2)",
              fontFamily: "'Space Mono', monospace",
              fontSize: 11, color: "#00f5ff", letterSpacing: 1
            }}>{t}</span>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <SectionTitle sub="// WHAT I'VE BUILT">Projects</SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {PORTFOLIO_DATA.projects.map(p => (
            <TiltCard key={p.id} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${p.color}33`,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative"
            }}>
              {/* Header */}
              <div style={{
                padding: "28px 24px 20px",
                background: `linear-gradient(135deg, ${p.color}11, transparent)`,
                borderBottom: `1px solid ${p.color}22`
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: p.color, letterSpacing: 3, marginBottom: 6 }}>
                  {p.category}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'Rajdhani', sans-serif", letterSpacing: 2 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: p.color, margin: "4px 0 0" }}>{p.subtitle}</p>
              </div>

              {/* Body */}
              <div style={{ padding: "20px 24px 24px" }}>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

                {/* Tech stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{
                      padding: "3px 10px",
                      borderRadius: 4,
                      background: `${p.color}11`,
                      border: `1px solid ${p.color}33`,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10, color: p.color
                    }}>{t}</span>
                  ))}
                </div>

                <button style={{
                  width: "100%", padding: "10px 0",
                  background: `linear-gradient(135deg, ${p.color}22, transparent)`,
                  border: `1px solid ${p.color}44`,
                  borderRadius: 6,
                  color: p.color, fontFamily: "'Space Mono', monospace",
                  fontSize: 11, letterSpacing: 2, fontWeight: 700, cursor: "pointer"
                }}>CONTACT FOR PROJECT →</button>
              </div>

              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: `linear-gradient(135deg, ${p.color}22, transparent)`, borderRadius: "0 16px 0 60px" }} />
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ background: "rgba(255,255,255,0.01)" }}>
        <SectionTitle sub="// GET IN TOUCH">Contact</SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, maxWidth: 1000, margin: "0 auto" }}>
          {/* Info */}
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Let's Build Something <span style={{ color: "#00f5ff" }}>Incredible</span></h3>
            <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: 32 }}>
              Available for AI/ML engineering roles, consulting, and collaborative projects. Let's discuss how I can contribute to your vision.
            </p>

            {[
              { icon: "📧", label: PORTFOLIO_DATA.email },
              { icon: "📞", label: PORTFOLIO_DATA.phone },
              { icon: "📍", label: PORTFOLIO_DATA.location }
            ].map(c => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: 14, color: "#aaa", fontFamily: "'Space Mono', monospace" }}>{c.label}</span>
              </div>
            ))}

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {[
                { label: "LinkedIn", color: "#0077B5" },
                { label: "GitHub", color: "#6e40c9" },
                { label: "Instagram", color: "#E1306C" }
              ].map(s => (
                <a key={s.label} href="#" style={{
                  padding: "8px 16px",
                  borderRadius: 6,
                  background: `${s.color}22`,
                  border: `1px solid ${s.color}44`,
                  color: s.color,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11, letterSpacing: 1,
                  textDecoration: "none"
                }}>{s.label}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,245,255,0.15)",
            borderRadius: 16, padding: 32
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00f5ff", letterSpacing: 3, marginBottom: 20 }}>
              // SEND MESSAGE
            </div>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer style={{
        textAlign: "center", padding: "32px 5%",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "'Space Mono', monospace",
        fontSize: 11, color: "#333", letterSpacing: 2
      }}>
        <span style={{ color: "#00f5ff" }}>DIBYARANJAN DAS</span> © 2026 — BUILT BY DIBYA + ❤
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
