import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, ClipboardList, Wand2, Gem } from "lucide-react";

/** Simple email validator */
const isValidEmail = (email: string) =>
  /[^\s@]+@[^\s@]+\.[^\s@]+/.test(String(email).toLowerCase());

type Lang = "en" | "es";

/** Detect initial language (saved choice > browser lang) */
const getInitialLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("aurelia_lang");
  if (saved === "en" || saved === "es") return saved as Lang;
  const nav =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en";
  return nav.toLowerCase().startsWith("es") ? "es" : "en";
};

/** Copy with the new description split so we can style AI + trait */
const COPY: Record<Lang, any> = {
  en: {
    tagline: "Jewelry made for you — with AI",
    heroLead: "Jewelry ",
    heroSpan: "made for you",
    heroDot: ".",
    // New description parts
    descA: "Tell us a little about you. Our ",
    ai: "AI",
    descB:
      " learns what flatters you and picks the piece that feels like you — matched to your ",
    trait: "personality.",
    // Steps + misc
    emailLabel: "Email address",
    emailPlaceholder: "Your email",
    notify: "Notify me",
    joining: "Joining…",
    subscribeIdle: "One email at launch. No spam.",
    step1Title: "Quick quiz",
    step1Desc: "A few taps to capture your taste.",
    step2Title: "AI match",
    step2Desc: "We analyze and curate a tight capsule.",
    step3Title: "Your piece",
    step3Desc: "See the piece that feels like you.",
    langLabel: "Language",
    en: "EN",
    es: "ES",
    footerLine: "Privacy-first · Ethical sourcing",
    invalid: "Enter a valid email",
    thanks: "Thanks! We'll update you at launch ✨",
    error: "Something went wrong",
  },
  es: {
    tagline: "Joyería hecha para ti — con IA",
    heroLead: "Joyería ",
    heroSpan: "hecha para ti",
    heroDot: ".",
    // New description parts (ES)
    descA: "Cuéntanos un poco sobre ti. Nuestra ",
    ai: "IA",
    descB:
      " aprende lo que te favorece y elige la pieza que se siente como tú — alineada con tu ",
    trait: "personalidad.",
    // Steps + misc
    emailLabel: "Correo electrónico",
    emailPlaceholder: "Tu email",
    notify: "Avísame",
    joining: "Uniéndome…",
    subscribeIdle: "Un solo email al lanzamiento. Sin spam.",
    step1Title: "Mini test",
    step1Desc: "Unos toques para captar tu gusto.",
    step2Title: "Coincidencia con IA",
    step2Desc: "Analizamos y curamos una cápsula precisa.",
    step3Title: "Tu pieza",
    step3Desc: "Descubre la pieza que se siente como tú.",
    langLabel: "Idioma",
    en: "EN",
    es: "ES",
    footerLine: "Privacidad primero · Abastecimiento ético",
    invalid: "Introduce un email válido",
    thanks: "¡Gracias! Te avisaremos en el lanzamiento ✨",
    error: "Algo salió mal",
  },
};

/** Liquid-glass crystal drop logo */
const AureliaLogo = () => (
  <motion.div
    whileHover={{ rotate: -2, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 120, damping: 14 }}
    className="relative h-10 w-10 overflow-hidden rounded-2xl ring-1 ring-white/30 bg-white/30 backdrop-blur-xl shadow-[0_8px_40px_rgba(223,164,198,0.18)]"
  >
    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="crystal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7c873" />
          <stop offset="50%" stopColor="#f6dce5" />
          <stop offset="100%" stopColor="#cfe7ff" />
        </linearGradient>
        <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity=".65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity=".0" />
        </linearGradient>
        <clipPath id="drop">
          <path d="M32 6 C38 14, 46 22, 50 31 C54 40, 48 54, 32 58 C16 54, 10 40, 14 31 C18 22, 26 14, 32 6 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#drop)">
        <rect x="0" y="0" width="64" height="64" fill="url(#crystal)" />
        <polygon points="32,10 44,26 32,34 20,26" fill="#ffffff" fillOpacity=".18" />
        <polygon points="20,26 32,34 26,48 16,34" fill="#ffffff" fillOpacity=".12" />
        <polygon points="44,26 32,34 38,48 48,34" fill="#ffffff" fillOpacity=".12" />
        <motion.rect
          x="-96"
          y="0"
          width="96"
          height="64"
          fill="url(#gloss)"
          initial={{ x: -96 }}
          animate={{ x: 128 }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
        />
      </g>
      <path
        d="M32 6 C38 14, 46 22, 50 31 C54 40, 48 54, 32 58 C16 54, 10 40, 14 31 C18 22, 26 14, 32 6 Z"
        fill="none"
        stroke="#ffffff"
        strokeOpacity=".7"
      />
    </svg>
  </motion.div>
);

/** Floating sparkles */
const FloatingSparkle = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={"absolute " + className}
    initial={{ opacity: 0, y: 8, scale: 0.9 }}
    animate={{ opacity: [0, 0.7, 0], y: [-6, 3, -6], scale: [0.9, 1, 0.95] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <Sparkles className="h-3.5 w-3.5 text-rose-300/90" />
  </motion.div>
);

/** Gentle hero sheen */
const Sheen = () => (
  <motion.div
    className="pointer-events-none absolute -top-10 left-0 right-0 h-24"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.35, 0] }}
    transition={{ duration: 7, repeat: Infinity }}
  >
    <motion.div
      className="absolute -left-40 h-24 w-80 rotate-6 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.7)_50%,rgba(255,255,255,0)_100%)]"
      initial={{ x: -200 }}
      animate={{ x: 1200 }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

/** Champagne shimmer for “made for you” */
const ShimmerText = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#e7c873,#f1b2c6,#cfe9ff,#e7c873)] bg-[length:200%_100%]"
    initial={{ backgroundPositionX: "0%" }}
    animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
  >
    {children}
  </motion.span>
);

/** ----- Light Steps (like your original) ----- */
const LightStep = ({
  no, icon, title, desc,
}: { no: string; icon: React.ReactNode; title: string; desc: string }) => (
  <div className="relative rounded-2xl p-5 ring-1 ring-rose-200/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_40px_rgba(223,164,198,0.12)]">
    <div className="flex items-start gap-3">
      <div className="relative shrink-0">
        <div className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-rose-200/70 bg-[radial-gradient(75%_75%_at_30%_30%,#ffe3ea_0%,#fff6e0_35%,transparent_60%)]">
          {icon}
        </div>
        <span className="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full bg-white text-rose-600 ring-1 ring-rose-300 text-[10px] font-semibold">
          {no}
        </span>
      </div>
      <div className="min-w-0">
        <div className="text-lg font-semibold text-zinc-900">{title}</div>
        <p className="mt-1 text-sm leading-snug text-zinc-600">{desc}</p>
      </div>
    </div>
  </div>
);

const StepConnector = () => (
  <div className="hidden md:flex items-center justify-center">
    <span className="inline-block h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#f6d37a,#f38fb4)] opacity-80" />
  </div>
);
/** ------------------------------------------ */

export default function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState<Lang>(getInitialLang());

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aurelia_lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const copy = COPY[lang];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage(copy.invalid);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.message || "Request failed");
      setStatus("success");
      setMessage(copy.thanks);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(copy.error);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* helper keyframes + caustics */}
      <style>{`
        @keyframes shimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes btn-shine{0%{transform:translateX(-140%) rotate(12deg)}100%{transform:translateX(240%) rotate(12deg)}}
        .btnShine{animation:btn-shine 2.2s linear infinite}
        @media (prefers-reduced-motion: reduce){.btnShine{animation:none!important}}

        @keyframes causticFlow {
          0% { background-position: 0% 0%, 100% 100%; }
          50% { background-position: 100% 0%, 0% 100%; }
          100% { background-position: 0% 0%, 100% 100%; }
        }
        .caustics {
          background-image:
            radial-gradient(60% 40% at 20% 30%, rgba(255,255,255,0.35), transparent 60%),
            radial-gradient(50% 35% at 80% 70%, rgba(197,162,74,0.25), transparent 60%);
          background-size: 160% 160%, 140% 140%;
          animation: causticFlow 12s ease-in-out infinite;
          mix-blend: soft-light;
        }
      `}</style>

      {/* Animated gradient + noise backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(255,115,144,.18),transparent_60%),radial-gradient(80%_60%_at_80%_20%,rgba(66,153,225,.18),transparent_60%),linear-gradient(180deg,#0b0f17_0%,#121826_100%)] animate-gradient-slow bg-[length:200%_200%]" />
        <div className="absolute inset-0 bg-noise mix-blend-soft-light opacity-40" />
        <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-rose-400/20 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-[38rem] w-[38rem] rounded-full bg-sky-400/20 blur-[120px]" />
      </div>

      {/* Ambient sparkles */}
      <div className="pointer-events-none absolute inset-0">
        <FloatingSparkle className="top-28 left-16" />
        <FloatingSparkle className="top-44 right-20" />
        <FloatingSparkle className="bottom-24 left-1/3" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-6">
          <div className="flex items-center gap-3">
            <AureliaLogo />
            <span className="font-serif text-2xl tracking-[.02em]">Aurelia</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-sm text-white/70 md:block">
              {copy.tagline}
            </div>
            {/* Language picker (glass pill) */}
            <div className="inline-flex overflow-hidden rounded-full ring-1 ring-white/15 glass">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 h-8 text-xs ${lang === "en" ? "bg-white/20 text-white" : "text-white/70 hover:text-white"}`}
                aria-pressed={lang === "en"}
              >
                {copy.en}
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-3 h-8 text-xs ${lang === "es" ? "bg-white/20 text-white" : "text-white/70 hover:text-white"}`}
                aria-pressed={lang === "es"}
              >
                {copy.es}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-8 pb-20 md:pt-16 md:pb-28">
        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* Left: copy + form */}
          <div className="relative max-w-3xl">
            <Sheen />
            <h1 className="font-serif text-4xl leading-tight md:text-6xl">
              {copy.heroLead}
              <ShimmerText>{copy.heroSpan}</ShimmerText>
              {copy.heroDot}
            </h1>

            {/* NEW description: same font as title, translated, AI bold, colored trait */}
            <p className="mt-4 font-serif text-white/80 sm:text-lg md:text-xl">
              {copy.descA}
              <span className="font-semibold text-white">{copy.ai}</span>
              {copy.descB}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#9BB8FF,#B7A9FF,#CFE3A2)]">
                {copy.trait}
              </span>
            </p>

            {/* Signup (glass card) */}
            <div className="relative mt-8">
              <div className="absolute -inset-[1px] rounded-2xl opacity-50 blur-[2px] bg-[linear-gradient(135deg,rgba(231,200,115,.35),rgba(255,255,255,.4),rgba(207,231,255,.35))]" />
              <div className="relative rounded-2xl glass-strong">
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 sm:p-4"
                >
                  <div className="sm:flex-1">
                    <label htmlFor="email" className="sr-only">
                      {copy.emailLabel}
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={copy.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-full border border-white/20 bg-white/10 px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      aria-invalid={status === "error"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary relative h-12 rounded-full px-6 sm:px-7 disabled:cursor-not-allowed disabled:opacity-70 overflow-hidden"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4" />
                      {status === "loading" ? copy.joining : copy.notify}
                    </span>
                    <span
                      aria-hidden
                      className="btnShine pointer-events-none absolute -inset-y-2 -left-1/2 w-1/2 rotate-12 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.9)_50%,rgba(255,255,255,0)_100%)] transform-gpu will-change-transform"
                    />
                  </button>
                </form>
                <div className="min-h-[1.25rem] -mt-2 px-4 pb-4 text-sm">
                  {status === "error" && <p className="text-rose-300">{message}</p>}
                  {status === "success" && <p className="text-emerald-300">{message}</p>}
                  {status === "idle" && <p className="text-white/60">{copy.subscribeIdle}</p>}
                </div>
              </div>
            </div>

            {/* Steps (light look, like before) */}
            <div aria-label="How it works" className="mt-8">
              <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <LightStep
                  no="1"
                  icon={<ClipboardList className="h-5 w-5 text-rose-600" />}
                  title={copy.step1Title}
                  desc={copy.step1Desc}
                />
                <StepConnector />
                <LightStep
                  no="2"
                  icon={<Wand2 className="h-5 w-5 text-rose-600" />}
                  title={copy.step2Title}
                  desc={copy.step2Desc}
                />
                <StepConnector />
                <LightStep
                  no="3"
                  icon={<Gem className="h-5 w-5 text-rose-600" />}
                  title={copy.step3Title}
                  desc={copy.step3Desc}
                />
              </div>
            </div>
          </div>

          {/* Right: liquid-glass media card */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] blur-2xl bg-[radial-gradient(60%_60%_at_30%_20%,rgba(231,200,115,0.22),transparent_60%),radial-gradient(50%_50%_at_70%_80%,rgba(246,220,229,0.22),transparent_60%)]" />
            <div className="relative rounded-[2rem] p-[1px] bg-[linear-gradient(140deg,rgba(255,255,255,.7),rgba(255,255,255,.18))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              <div className="overflow-hidden rounded-[1.92rem] bg-white/10 backdrop-blur-2xl ring-1 ring-white/15">
                <div className="relative aspect-square">
                  <div className="absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[10px] tracking-wide bg-white/15 ring-1 ring-white/25 backdrop-blur-md text-white/80">
                    AI
                  </div>
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src="/hero-square.webm" type="video/webm" />
                    <source src="/hero-square.mp4" type="video/mp4" />
                  </video>
                  <div className="caustics pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-white/60 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-rose-300" />
            <span>© {new Date().getFullYear()} Aurelia</span>
          </div>
          <div className="inline-flex items-center gap-6">
            <span>{copy.footerLine}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
