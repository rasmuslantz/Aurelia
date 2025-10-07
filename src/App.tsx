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

const COPY: Record<Lang, any> = {
  en: {
    tagline: "Jewelry made for you — with AI",
    heroPrefix: "Jewelry ",
    heroEmph: "made for you",
    desc1: "Tell us a little about you. Our ",
    ai: "AI",
    desc2:
      " learns what flatters you and picks the piece that feels like you — matched to your",
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
    mediaCaption: "Mood reel · 1:1",
  },
  es: {
    tagline: "Joyería hecha para ti — con IA",
    heroPrefix: "Joyería ",
    heroEmph: "hecha para ti",
    desc1: "Cuéntanos un poco sobre ti. Nuestra ",
    ai: "IA",
    desc2:
      " aprende lo que te favorece y elige la pieza que se siente como tú — ajustada a tu",
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
    mediaCaption: "Clip de ambiente · 1:1",
  },
};

/** Liquid-glass crystal drop logo */
const AureliaLogo = () => (
  <motion.div
    whileHover={{ rotate: -2, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 120, damping: 14 }}
    className="relative h-10 w-10 rounded-2xl overflow-hidden ring-1 ring-zinc-200 bg-white/70 backdrop-blur-xl"
  >
    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="crystal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7c873" />
          <stop offset="50%" stopColor="#f7d7e3" />
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

/** Soft sparkles */
const FloatingSparkle = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={"absolute " + className}
    initial={{ opacity: 0, y: 8, scale: 0.9 }}
    animate={{ opacity: [0, 0.7, 0], y: [-6, 3, -6], scale: [0.9, 1, 0.95] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <Sparkles className="w-3.5 h-3.5 text-rose-400/80" />
  </motion.div>
);

/** Champagne shimmer for the emphasized words */
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

/** Typewriter rotating traits (fixed width; keeps on same line; resets on language change) */
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
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    setI(0);
    setSub(0);
    setDel(false);
  }, [lang]);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(id);
  }, []);

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
    <span className="inline-flex items-end align-baseline h-8">
      <span
        className="relative inline-block leading-8 font-medium tracking-wide flex-shrink-0"
        style={{ width: `${longest}ch` }}
        aria-live="polite"
      >
        <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#e7c873,#f1b2c6,#cfe9ff,#e7c873)] bg-[length:200%_100%] animate-[shimmer_8s_linear_infinite]">
          {traits[i].substring(0, sub)}
        </span>
        <span
          className={`ml-[1px] inline-block w-[1ch] text-zinc-400 ${
            blink ? "opacity-60" : "opacity-0"
          }`}
        >
          |
        </span>
      </span>
    </span>
  );
};

/** Visual step card */
const Step = ({
  no,
  icon,
  title,
  desc,
}: {
  no: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="relative flex items-start gap-3 p-4 rounded-2xl ring-1 ring-rose-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div className="relative shrink-0">
      <div className="h-12 w-12 grid place-items-center rounded-full bg-gradient-to-br from-rose-100 via-rose-200 to-amber-100 ring-1 ring-rose-200/70 shadow-sm">
        {icon}
      </div>
      <span className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-white text-rose-600 ring-1 ring-rose-300 grid place-items-center text-[10px] font-semibold">
        {no}
      </span>
    </div>
    <div className="min-w-0">
      <div className="text-base font-medium text-zinc-900">{title}</div>
      <p className="text-xs text-zinc-600 leading-snug">{desc}</p>
    </div>
  </div>
);

export default function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
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
    <div className="min-h-screen bg-white text-zinc-800 relative overflow-hidden">
      {/* helpers + caustics + button shine */}
      <style>{`
        @keyframes shimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes btn-shine{0%{transform:translateX(-140%) rotate(12deg)}100%{transform:translateX(240%) rotate(12deg)}}
        .btnShine{animation:btn-shine 2.2s linear infinite}
        @media (prefers-reduced-motion: reduce){.btnShine{animation:none!important}}
        .nowrapTail{ white-space: nowrap; }
        @media (max-width:640px){ .descSize{ font-size: 0.95rem; } }

        /* animated caustics for the media card */
        @keyframes causticFlow {
          0% { background-position: 0% 0%, 100% 100%; }
          50% { background-position: 100% 0%, 0% 100%; }
          100% { background-position: 0% 0%, 100% 100%; }
        }
        .caustics {
          background-image:
            radial-gradient(60% 40% at 20% 30%, rgba(255,255,255,0.35), transparent 60%),
            radial-gradient(50% 35% at 80% 70%, rgba(231,200,115,0.25), transparent 60%);
          background-size: 160% 160%, 140% 140%;
          animation: causticFlow 12s ease-in-out infinite;
          mix-blend: soft-light;
        }
      `}</style>

      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-50 bg-[radial-gradient(circle_at_30%_30%,#e9f3ff_0%,#fff_60%)]" />
        <div className="absolute -bottom-40 -left-40 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_70%_70%,#fde2e4_0%,#fff_60%)]" />
        <FloatingSparkle className="top-28 left-16" />
        <FloatingSparkle className="top-44 right-20" />
        <FloatingSparkle className="bottom-24 left-1/3" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AureliaLogo />
            <span className="text-xl font-medium tracking-wide [font-family:'Cormorant_Garamond',ui-serif] text-zinc-900">
              Aurelia
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-zinc-600">
              {copy.tagline}
            </div>
            {/* Language picker */}
            <div className="inline-flex rounded-full ring-1 ring-rose-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 h-8 text-xs ${
                  lang === "en"
                    ? "bg-rose-100 text-rose-700"
                    : "text-zinc-600 hover:text-zinc-800"
                }`}
                aria-pressed={lang === "en"}
              >
                {copy.en}
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-3 h-8 text-xs ${
                  lang === "es"
                    ? "bg-rose-100 text-rose-700"
                    : "text-zinc-600 hover:text-zinc-800"
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
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-6 pt-8 pb-20 md:pt-16 md:pb-28">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: copy + form + steps */}
            <div className="relative max-w-3xl">
              <h1 className="text-4xl md:text-6xl leading-tight font-serif [font-family:'Cormorant_Garamond',ui-serif,Georgia,serif] text-zinc-900">
                {copy.heroPrefix}
                <ShimmerText>{copy.heroEmph}</ShimmerText>
                <span className="text-zinc-900">.</span>
              </h1>

              {/* Description with trailing typewriter traits */}
              <p className="mt-4 descSize sm:text-lg md:text-xl text-zinc-800 [font-family:'Inter',ui-sans-serif,system-ui]">
                {copy.desc1}
                <span className="font-semibold">{copy.ai}</span>
                {copy.desc2}
                <span className="nowrapTail">
                  {"\u00A0"}
                  <TypeTrait key={lang} lang={lang} />
                </span>
              </p>

              {/* Email form (liquid glass) */}
              <div className="mt-8 relative">
                <div className="absolute -inset-[1px] rounded-2xl bg-[linear-gradient(135deg,rgba(231,200,115,.35),rgba(255,255,255,.6),rgba(207,231,255,.35))] opacity-60 blur-[2px]" />
                <div className="relative rounded-2xl bg-white/60 backdrop-blur-xl ring-1 ring-white/60 shadow-sm">
                  <form
                    onSubmit={handleSubscribe}
                    className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4"
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
                        className="h-12 w-full rounded-full bg-white/90 border border-zinc-200 px-4 focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder:text-zinc-400"
                        aria-invalid={status === "error"}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="relative h-12 rounded-full px-6 sm:px-7 overflow-hidden bg-white text-zinc-900 ring-1 ring-rose-300 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4" />{" "}
                        {status === "loading" ? copy.joining : copy.notify}
                      </span>
                      {/* smooth, full-width sweep (pure CSS) */}
                      <span
                        aria-hidden
                        className="btnShine pointer-events-none absolute -inset-y-2 -left-1/2 w-1/2 rotate-12 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.9)_50%,rgba(255,255,255,0)_100%)] transform-gpu will-change-transform"
                      />
                    </button>
                  </form>
                  <div className="px-4 pb-4 -mt-2 min-h-[1.25rem] text-sm">
                    {status === "error" && (
                      <p className="text-rose-600">{message}</p>
                    )}
                    {status === "success" && (
                      <p className="text-emerald-600">{message}</p>
                    )}
                    {status === "idle" && (
                      <p className="text-zinc-500">{copy.subscribeIdle}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div aria-label="How it works" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
                  <Step
                    no="1"
                    icon={<ClipboardList className="w-5 h-5 text-rose-600" />}
                    title={copy.step1Title}
                    desc={copy.step1Desc}
                  />
                  <div className="hidden md:flex items-center justify-center text-zinc-400 select-none">
                    →
                  </div>
                  <Step
                    no="2"
                    icon={<Wand2 className="w-5 h-5 text-rose-600" />}
                    title={copy.step2Title}
                    desc={copy.step2Desc}
                  />
                  <div className="hidden md:flex items-center justify-center text-zinc-400 select-none">
                    →
                  </div>
                  <Step
                    no="3"
                    icon={<Gem className="w-5 h-5 text-rose-600" />}
                    title={copy.step3Title}
                    desc={copy.step3Desc}
                  />
                </div>
              </div>
            </div>

            {/* Right: liquid-glass media card with looping 1:1 video */}
            <div className="relative">
              {/* soft glow */}
              <div className="absolute -inset-4 rounded-[1.75rem] bg-[linear-gradient(120deg,rgba(231,200,115,.18),rgba(255,255,255,.35),rgba(207,231,255,.18))] blur-xl opacity-70" />
              {/* glass frame */}
              <div className="relative rounded-[1.5rem] p-[1px] bg-[linear-gradient(140deg,rgba(255,255,255,.8),rgba(255,255,255,.2))]">
                <div className="rounded-[1.45rem] bg-white/45 backdrop-blur-xl ring-1 ring-white/60 shadow-sm overflow-hidden">
                  {/* square aspect video */}
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
                    {/* animated caustics overlay */}
                    <div className="caustics pointer-events-none absolute inset-0 opacity-55 mix-blend-soft-light" />
                  </div>

                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs text-zinc-600">
                      {copy.mediaCaption}
                    </span>
                    <span className="text-xs text-rose-600">Aurelia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>© {new Date().getFullYear()} Aurelia</span>
          </div>
          <div className="inline-flex items-center gap-6">
            <span>{copy.footerLine}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
