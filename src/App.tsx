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
    tagline: "Jewelry picked for you — with AI",
    heroLead: "The best jewelry for ",
    heroSpan: "your style, looks & personality",
    desc1: "Tell us a little about you. Our ",
    ai: "AI",
    desc2:
      " analyzes what suits you and selects the piece made for you — matched to your ",
    emailLabel: "Email address",
    emailPlaceholder: "Your email",
    notify: "Notify me",
    joining: "Joining…",
    subscribeIdle: "Subscribe to be updated once we release",
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
  },
  es: {
    tagline: "Joyería elegida para ti — con IA",
    heroLead: "La mejor joyería para ",
    heroSpan: "tu estilo, tu aspecto y tu personalidad",
    desc1: "Cuéntanos un poco sobre ti. Nuestra ",
    ai: "IA",
    desc2:
      " analiza lo que te favorece y te recomienda la pieza hecha para ti — en función de tu ",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "Tu email",
    notify: "Avísame",
    joining: "Uniéndome…",
    subscribeIdle: "Suscríbete para enterarte cuando lancemos",
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
          <stop offset="0%" stopColor="#d7b85a" />
          <stop offset="50%" stopColor="#eaa1c4" />
          <stop offset="100%" stopColor="#9ec7ff" />
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
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1.2,
          }}
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
    <Sparkles className="w-3.5 h-3.5 text-rose-500/80" />
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

/** Typewriter rotating traits (ends with a dot, fixed width to avoid layout shift) */
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
        className="relative inline-block leading-8 font-medium tracking-wide"
        style={{ width: `${longest}ch` }}
        aria-live="polite"
      >
        <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#c5a24a,#c44e84,#2f6fbf,#c5a24a)] bg-[length:220%_100%] animate-[shimmer_8s_linear_infinite]">
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

/** Visual, mobile-first step cards */
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

  /** Auto-detect + remember language */
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
      setMessage(lang === "es" ? "Introduce un email válido" : "Enter a valid email");
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
      setMessage(
        lang === "es"
          ? "¡Gracias! Te avisaremos en el lanzamiento ✨"
          : "Thanks! We'll update you at launch ✨"
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(lang === "es" ? "Algo salió mal" : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 relative overflow-hidden">
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
            <span className="text-xl font-medium tracking-wide font-serif text-zinc-900">
              Aurelia
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-zinc-600">
              {copy.tagline}
            </div>
            {/* Language picker */}
            <div className="inline-flex items-center gap-2">
              <span className="sr-only">{copy.langLabel}</span>
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
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-6 pt-8 pb-20 md:pt-16 md:pb-28">
          <div className="relative max-w-3xl">
            <Sheen />
            <h1 className="text-4xl md:text-6xl leading-tight font-serif text-zinc-900">
              {copy.heroLead}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#c5a24a,#c44e84,#2f6fbf,#c5a24a)] bg-[length:220%_100%] animate-[shimmer_6s_linear_infinite]">
                {copy.heroSpan}
              </span>
            </h1>

            {/* Description with trailing typewriter traits */}
            <p className="mt-4 text-lg md:text-xl text-zinc-800">
              {copy.desc1}
              <span className="font-semibold">{copy.ai}</span>
              {copy.desc2}
              <TypeTrait lang={lang} />
            </p>

            {/* Signup */}
            <div className="mt-8 relative">
              <div className="absolute -inset-[1px] rounded-2xl bg-[linear-gradient(135deg,rgba(197,162,74,.35),rgba(255,255,255,.6),rgba(47,111,191,.35))] opacity-60 blur-[2px]" />
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
                      className="h-12 w-full rounded-full bg-white/90 border border-zinc-200 px-4 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-zinc-400"
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
                    <motion.span
                      className="pointer-events-none absolute -inset-y-1 -left-24 w-24 rotate-12 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.9)_50%,rgba(255,255,255,0)_100%)]"
                      initial={{ x: -120 }}
                      animate={{ x: 260 }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1.2,
                      }}
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
                    <p className="text-rose-600">{copy.subscribeIdle}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Visual stepper */}
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