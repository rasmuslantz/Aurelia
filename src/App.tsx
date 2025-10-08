// src/App.tsx
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

/** Copy — EN/ES */
const COPY: Record<Lang, any> = {
  en: {
    tagline: "Jewelry made for you — with AI",
    heroLead: "Jewelry ",
    heroSpan: "made for you",
    heroDot: ".",
    descA: "Tell us a little about you. Our ",
    ai: "AI",
    descB:
      " learns what flatters you and picks the piece that feels like you — matched to your ",
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
    descA: "Cuéntanos un poco sobre ti. Nuestra ",
    ai: "IA",
    descB:
      " aprende lo que te favorece y elige la pieza que se siente como tú — alineada con tu ",
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
    en: "EN",
    es: "ES",
    footerLine: "Privacidad primero · Abastecimiento ético",
    invalid: "Introduce un email válido",
    thanks: "¡Gracias! Te avisaremos en el lanzamiento ✨",
    error: "Algo salió mal",
  },
};

/** Rotating keyword at the end of the description (EN/ES) */
const TypeTrait = ({ lang }: { lang: Lang }) => {
  const traits = useMemo(
    () =>
      lang === "es"
        ? [
            "personalidad.",
            "astrología.",
            "estilo.",
            "aspecto.",
            "vibra.",
            "estado de ánimo.",
            "aura.",
            "forma del rostro.",
            "tono de piel.",
            "ocasión.",
            "energía.",
          ]
        : [
            "personality.",
            "astrology.",
            "style.",
            "looks.",
            "vibe.",
            "mood.",
            "aura.",
            "face shape.",
            "skin tone.",
            "occasion.",
            "energy.",
          ],
    [lang]
  );

  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    setI(0);
    setSub(0);
    setDel(false);
  }, [lang]);

  useEffect(() => {
    const word = traits[i];
    if (!del && sub === word.length) {
      const hold = setTimeout(() => setDel(true), 900);
      return () => clearTimeout(hold);
    }
    if (del && sub === 0) {
      setDel(false);
      setI((i + 1) % traits.length);
      return;
    }
    const t = setTimeout(() => setSub(sub + (del ? -1 : 1)), del ? 45 : 70);
    return () => clearTimeout(t);
  }, [sub, del, i, traits]);

  const longest = useMemo(
    () => traits.reduce((m, s) => Math.max(m, s.length), 0),
    [traits]
  );

  return (
    <span className="inline-flex h-7 items-end align-baseline">
      <span
        className="relative inline-block leading-7 font-medium tracking-wide"
        style={{ width: `${longest}ch` }}
        aria-live="polite"
      >
        <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#9BB8FF,#B7A9FF,#CFE3A2)]">
          {traits[i].substring(0, sub)}
        </span>
        <span className="ml-[1px] inline-block w-[1ch] text-zinc-400">|</span>
      </span>
    </span>
  );
};

/** Ambient aurora + glows (feminine pastel, liquid-ish) */
const Aurora = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <motion.div
      className="absolute -top-36 -left-24 h-[56rem] w-[56rem] rounded-full blur-[110px]"
      style={{
        background:
          "radial-gradient(45% 55% at 30% 30%, rgba(255,214,230,.65), transparent 60%), radial-gradient(45% 55% at 70% 40%, rgba(196,225,255,.6), transparent 60%), radial-gradient(40% 50% at 50% 70%, rgba(235,215,150,.55), transparent 70%)",
      }}
      animate={{ rotate: [0, 8, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-40 -right-24 h-[50rem] w-[50rem] rounded-full blur-[120px]"
      style={{
        background:
          "radial-gradient(45% 55% at 70% 70%, rgba(255,224,236,.55), transparent 60%), radial-gradient(45% 55% at 30% 70%, rgba(210,240,255,.55), transparent 60%)",
      }}
      animate={{ rotate: [0, -10, 0], scale: [1.02, 1, 1.02] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/** Gentle sheen sweep for a futuristic gloss */
const Sheen = () => (
  <motion.div
    className="pointer-events-none absolute -top-8 left-0 right-0 h-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.35, 0] }}
    transition={{ duration: 7, repeat: Infinity }}
  >
    <motion.div
      className="absolute -left-40 h-16 w-80 rotate-6 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.9)_50%,rgba(255,255,255,0)_100%)]"
      initial={{ x: -240 }}
      animate={{ x: 1200 }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

/** Subtle floating sparkles (girly, not noisy) */
const FloatingSparkle = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={"absolute " + className}
    initial={{ opacity: 0, y: 8, scale: 0.9 }}
    animate={{ opacity: [0, 0.6, 0], y: [-6, 3, -6], scale: [0.9, 1, 0.95] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <Sparkles className="h-3.5 w-3.5 text-rose-400/80" />
  </motion.div>
);

/** Refined logo: crisp on light backgrounds */
const AureliaLogo = () => (
  <motion.div
    whileHover={{ rotate: -2, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 140, damping: 14 }}
    className="relative h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-2xl bg-white ring-1 ring-rose-300/70 shadow-[0_12px_36px_rgba(223,164,198,0.35)]"
    aria-label="Aurelia"
    role="img"
  >
    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="au-drop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7e9b6" />
          <stop offset="50%" stopColor="#f7c9d8" />
          <stop offset="100%" stopColor="#d5e8ff" />
        </linearGradient>
        <linearGradient id="au-gloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity=".75" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="au-shape">
          <path d="M32 6 C38 14, 46 22, 50 31 C54 40, 48 54, 32 58 C16 54, 10 40, 14 31 C18 22, 26 14, 32 6 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#au-shape)">
        <rect width="64" height="64" fill="url(#au-drop)" />
        <rect x="-96" y="0" width="96" height="64" fill="url(#au-gloss)">
          <animate attributeName="x" from="-96" to="128" dur="3.6s" repeatCount="indefinite" />
        </rect>
      </g>
      <path
        d="M32 6 C38 14, 46 22, 50 31 C54 40, 48 54, 32 58 C16 54, 10 40, 14 31 C18 22, 26 14, 32 6 Z"
        fill="none"
        stroke="#fff"
        strokeOpacity=".7"
      />
    </svg>
  </motion.div>
);

/** Clean, liquid-glass step card */
const StepCard = ({
  no,
  icon,
  title,
  desc,
  showConnector = false,
}: {
  no: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  showConnector?: boolean;
}) => (
  <li className="relative">
    {showConnector && (
      <span
        aria-hidden
        className="hidden xl:block absolute top-1/2 -right-6 h-[2px] w-12 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#f6d37a,#f38fb4)]"
      />
    )}

    {/* liquid edge wrapper -> glossy inner border */}
    <div className="liquid-edge rounded-2xl p-[1px]">
      <div className="h-full min-w-0 max-w-full rounded-[1rem] bg-white/75 backdrop-blur-2xl ring-1 ring-white/70 shadow-[0_24px_80px_rgba(223,164,198,0.18)] p-5">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-rose-200/70 bg-[radial-gradient(75%_75%_at_30%_30%,#ffe3ea_0%,#fff6e0_35%,transparent_60%)]">
              {icon}
            </div>
            <span className="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full bg-white text-rose-600 ring-1 ring-rose-300 text-[10px] font-semibold">
              {no}
            </span>
          </div>
          <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700">{desc}</p>
      </div>
    </div>
  </li>
);

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
    <main className="relative min-h-screen overflow-hidden">
      {/* pastel aurora background */}
      <Aurora />

      {/* a few sparkles for a girly, futuristic hint */}
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
            <span className="font-sans text-2xl tracking-[.02em] text-zinc-800">Aurelia</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-sm text-zinc-600 md:block">{copy.tagline}</div>
            <div className="inline-flex overflow-hidden rounded-full ring-1 ring-rose-200/70 bg-white/70 backdrop-blur">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 h-8 text-xs ${
                  lang === "en" ? "bg-rose-50 text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                }`}
                aria-pressed={lang === "en"}
              >
                {copy.en}
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-3 h-8 text-xs ${
                  lang === "es" ? "bg-rose-50 text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                }`}
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
          <div className="relative w-full md:max-w-2xl">
            <Sheen />
            {/* Title — black, lighter, single line on md+ */}
            <h1 className="font-sans text-black font-semibold text-[30px] sm:text-[38px] md:text-[50px] xl:text-[56px] leading-[1.05] tracking-tight md:whitespace-nowrap">
              {copy.heroLead}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#e7c873,#f1b2c6,#cfe9ff,#c9d494)]">
                {copy.heroSpan}
              </span>
              {copy.heroDot}
            </h1>

            {/* Description — black, rotating keyword */}
            <p className="mt-4 font-sans text-black sm:text-[15px] md:text-[17px]">
              {copy.descA}
              <span className="font-semibold text-black">{copy.ai}</span>
              {copy.descB}
              <TypeTrait lang={lang} />
            </p>

            {/* Email signup — liquid glass */}
            <div className="relative mt-8">
              {/* soft outer glow */}
              <div className="absolute -inset-[1px] rounded-2xl opacity-60 blur-[2px] bg-[linear-gradient(135deg,rgba(231,200,115,.35),rgba(255,255,255,.75),rgba(207,231,255,.35))]" />
              {/* glossy frame with liquid edge */}
              <div className="relative rounded-2xl glass-strong liquid-edge">
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
                      className="h-12 w-full rounded-full border border-rose-200/60 bg-white/95 px-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
                      aria-invalid={status === "error"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="relative h-12 rounded-full px-6 sm:px-7 overflow-hidden bg-gradient-to-b from-rose-400 to-rose-500 text-white ring-1 ring-white/50 shadow-[0_10px_40px_rgba(244,114,182,.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4" />
                      {status === "loading" ? copy.joining : copy.notify}
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-y-2 -left-1/2 w-1/2 rotate-12 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.9)_50%,rgba(255,255,255,0)_100%)] transform-gpu will-change-transform"
                      style={{ animation: "btn-shine 2.2s linear infinite" } as React.CSSProperties}
                    />
                  </button>
                </form>
                <div className="min-h-[1.25rem] -mt-2 px-4 pb-4 text-sm">
                  {status === "error" && <p className="text-rose-600">{message}</p>}
                  {status === "success" && <p className="text-emerald-600">{message}</p>}
                  {status === "idle" && <p className="text-zinc-600">{copy.subscribeIdle}</p>}
                </div>
              </div>
            </div>

            {/* How it works — liquid cards */}
            <div aria-label="How it works" className="mt-8">
              <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <StepCard
                  no="1"
                  icon={<ClipboardList className="h-5 w-5 text-rose-600" />}
                  title={copy.step1Title}
                  desc={copy.step1Desc}
                  showConnector
                />
                <StepCard
                  no="2"
                  icon={<Wand2 className="h-5 w-5 text-rose-600" />}
                  title={copy.step2Title}
                  desc={copy.step2Desc}
                  showConnector
                />
                <StepCard
                  no="3"
                  icon={<Gem className="h-5 w-5 text-rose-600" />}
                  title={copy.step3Title}
                  desc={copy.step3Desc}
                />
              </ol>
            </div>
          </div>

          {/* Right: liquid-glass media card (AI badge removed) */}
          <div className="relative">
            {/* outer glow */}
            <div className="absolute -inset-6 rounded-[2rem] blur-2xl bg-[radial-gradient(60%_60%_at_30%_20%,rgba(231,200,115,0.26),transparent_60%),radial-gradient(50%_50%_at_70%_80%,rgba(246,220,229,0.26),transparent_60%)]" />
            {/* glass frame with liquid edge */}
            <div className="relative rounded-[2rem] p-[1px] liquid-edge bg-[linear-gradient(140deg,rgba(255,255,255,.95),rgba(255,255,255,.65))] shadow-[0_30px_120px_rgba(223,164,198,0.22)]">
              <div className="overflow-hidden rounded-[1.92rem] bg-white/90 backdrop-blur-xl ring-1 ring-white/70">
                <div className="relative aspect-square">
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
                  {/* animated caustics overlay for a watery feel */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-55 mix-blend-soft-light"
                    style={{
                      backgroundImage:
                        "radial-gradient(60% 40% at 20% 30%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(50% 35% at 80% 70%, rgba(197,162,74,0.35), transparent 60%)",
                      backgroundSize: "160% 160%, 140% 140%",
                      animation: "causticFlow 12s ease-in-out infinite",
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-zinc-500 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span>© {new Date().getFullYear()} Aurelia</span>
          </div>
          <div className="inline-flex items-center gap-6">
            <span>{copy.footerLine}</span>
          </div>
        </div>
      </footer>

      {/* Keyframes for sheen & caustics */}
      <style>{`
        @keyframes btn-shine{0%{transform:translateX(-140%) rotate(12deg)}100%{transform:translateX(240%) rotate(12deg)}}
        @keyframes causticFlow {
          0% { background-position: 0% 0%, 100% 100%; }
          50% { background-position: 100% 0%, 0% 100%; }
          100% { background-position: 0% 0%, 100% 100%; }
        }
      `}</style>
    </main>
  );
}
