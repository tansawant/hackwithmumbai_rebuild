import React, { useState, useEffect, useRef } from "react";
import FlickerText from "./FlickerText";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  Download,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  Instagram,
  Twitter,
  Github,
  Lock,
  Search,
  RefreshCw,
  FileDown,
  Activity,
  Layers,
  ShieldAlert,
  Scale,
  Code,
  Minus,
  Plus,
  Zap,
  Cpu,
  Globe,
  Radio,
  Skull,
  Ghost,
  Eye,
  Trophy,
  BrainCircuit,
  Database,
  Coins,
  Rocket,
  Sparkles,
  Terminal,
  CreditCard,
  Monitor,
  X,
  BarChart3,
  Wifi,
  Linkedin,
  Send,
  RadioReceiver,
  FileText,
  FlaskConical,
  SearchCode,
  Play,
  MessageCircle,
} from "lucide-react";
// Mock Data Imports or internal definitions handled below

// --- CONFIGURATION ---
const APP_NAME = "HackwithMumbai2.0";
const TARGET_DATE = new Date("2026-02-07T00:00:00");
const REG_FEE = 2000;
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_RznmKrzlCljxVW";

// --- UTILS ---
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// --- PRICING UTILS ---
const PRICE_PER_MEMBER = 500;

const calculateRegistrationFee = (teamSize) => {
  // 500 per team member: 1->500, 2->1000, 3->1500, 4->2000
  return teamSize * PRICE_PER_MEMBER;
};

// --- ARCHIVE DATA ---
const ARCHIVES = [
  {
    id: "ARCHIVE_01",
    title: "Build IT Tour 2.0",
    date: "Sep 27, 2025",
    venue: "Microsoft Office, Mumbai",
    desc: "A full day of learning, innovation, and networking at Microsoft HQ.",
    img: "https://hackwithmumbai-sponsors.vercel.app/build_it_tour_1.jpg",
    details: {
      objectives: [
        "Exposure to cutting-edge technologies and entrepreneurial journeys.",
        "Inspire innovation through real-world success stories in tech and business.",
        "Platform for students to engage with industry leaders and professionals.",
      ],
      highlights: [
        "Session by Siddhesh Shivdikar (Founder, Bootee) on AR-3D fashion.",
        "Industry insights by Purvi Patel (Zain Global UK) on global education.",
        "120+ participants including tech enthusiasts and entrepreneurs.",
      ],
      impact:
        "Students gained exposure to AR fashion tech and international career paths, fostering a spirit of entrepreneurship.",
    },
    photos: [
      "https://hackwithmumbai-sponsors.vercel.app/build_it_tour_2.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/build_it_tour_1.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/build_it_tour_2.jpg",
    ],
  },
  {
    id: "ARCHIVE_02",
    title: "Pre-event HackWithMumbai",
    date: "Sep 15, 2025",
    venue: "Microsoft Office, Mumbai",
    desc: "The exclusive curtain-raiser for the main HackWithMumbai initiative.",
    img: "https://hackwithmumbai-sponsors.vercel.app/pre_event_1.jpg",
    details: {
      objectives: [
        "Introduce vision and goals of the HackWithMumbai initiative.",
        "Interaction with industry experts and mentors.",
        "Foster enthusiasm ahead of the main hackathon.",
      ],
      highlights: [
        "Talks by Yash Mohite (CEO, DevTech) on leadership.",
        "Insights from Niraga Patil (Zain Global) on marketing & data science.",
        "Strong community engagement and networking.",
      ],
      impact:
        "Inspired creativity and problem-solving, setting the tone for the main event with high enthusiasm.",
    },
    photos: [
      "https://hackwithmumbai-sponsors.vercel.app/pre_event_2.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/pre_event_1.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/pre_event_2.jpg",
    ],
  },
  {
    id: "ARCHIVE_03",
    title: "HWI Orientation",
    date: "Aug 23, 2025",
    venue: "BVUDET, Navi Mumbai",
    desc: "Introducing 350+ students to the vision of HackWithIndia.",
    img: "https://hackwithmumbai-sponsors.vercel.app/hwi_orientation_1.jpg",
    details: {
      objectives: [
        "Introduce first-year students to HackWithIndia vision.",
        "Encourage early involvement in coding culture.",
        "Hands-on exposure to AI tools.",
      ],
      highlights: [
        "Attendance of 350 students.",
        "Mentorship under Prof. Ahmer Usmani.",
        "Hands-on Replit AI Workshop for coding automation.",
      ],
      impact:
        "First-year students gained clarity on the mission and were motivated to begin their technical journey.",
    },
    photos: [
      "https://hackwithmumbai-sponsors.vercel.app/hwi_orientation_2.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/hwi_orientation_1.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/hwi_orientation_2.jpg",
    ],
  },
  {
    id: "ARCHIVE_04",
    title: "HackWithMumbai Hackathon",
    date: "Sep 21, 2025",
    venue: "BVUDET, Navi Mumbai",
    desc: "55 Teams. 10 Hours. Infinite Innovation.",
    img: "https://hackwithmumbai-sponsors.vercel.app/hwm_hackathon_4.jpg",
    details: {
      objectives: [
        "Platform to ideate, code, and innovate on real-world problems.",
        "Encourage teamwork and practical application.",
        "Foster a culture of problem-solving.",
      ],
      highlights: [
        "55 teams and 60 student volunteers.",
        "Diverse problem statements and prototype development.",
        "Project presentations showcasing technical proficiency.",
      ],
      impact:
        "Fostered a culture of innovation, hands-on experience in prototyping, and created a strong mentorship ecosystem.",
    },
    photos: [
      "https://hackwithmumbai-sponsors.vercel.app/hwm_hackathon_2.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/hwm_hackathon_3.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/hwm_hackathon_4.jpg",
    ],
  },
  {
    id: "ARCHIVE_05",
    title: "Learn IT Tour",
    date: "Jul 16, 2025",
    venue: "BVUDET, Navi Mumbai",
    desc: "A vibrant platform for learning with 220+ participants.",
    img: "https://hackwithmumbai-sponsors.vercel.app/learn_it_tour_1.jpg",
    details: {
      objectives: [
        "Exposure to latest trends and tools in tech.",
        "Networking with experts and peers.",
        "Inspire innovation within the student community.",
      ],
      highlights: [
        "Sessions by Yash Mohite, Vikas Kumar Yadav (GitHub Expert), Saurabh Saini (PW Skills).",
        "Interactive Q&A rounds.",
        "Exciting giveaways and prizes.",
      ],
      impact:
        "Students gained insights into open-source, design strategies, and entrepreneurial journeys.",
    },
    photos: [
      "https://hackwithmumbai-sponsors.vercel.app/learn_it_tour_2.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/learn_it_tour_3.jpg",
      "https://hackwithmumbai-sponsors.vercel.app/learn_it_tour_1.jpg",
    ],
  },
];

// --- THEME ENGINE ---
const useTheme = () => {
  const [dimension, setDimension] = useState("rift");

  const toggleDimension = () => {
    try {
      const audio = new Audio(
        dimension === "rift"
          ? "https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-click-900.mp3"
          : "https://assets.mixkit.co/sfx/preview/mixkit-horror-sci-fi-wind-1156.mp3"
      );
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {}

    setDimension((prev) => (prev === "rift" ? "earth" : "rift"));
  };

  const themes = {
    rift: {
      id: "rift",
      colors: {
        primary: "red-600",
        secondary: "red-900",
        accent: "text-red-500",
        bg: "bg-[#050000]",
        text: "text-red-50",
        border: "border-red-900",
        glow: "shadow-[0_0_25px_rgba(220,38,38,0.6)]",
        selection: "selection:bg-red-900 selection:text-white",
      },
      fonts: {
        head: "font-sancreek",
        body: "font-inter",
      },
      ui: {
        button:
          "bg-red-700 text-stone-200 hover:bg-red-600 hover:text-white font-sancreek tracking-widest border border-red-900",
        card: "bg-[#1a0f0f]/90 border-red-900/50 hover:border-red-600/80 backdrop-blur-xl",
      },
    },
    earth: {
      id: "earth",
      colors: {
        primary: "cyan-500",
        secondary: "blue-900",
        accent: "text-cyan-400",
        bg: "bg-[#0f172a]",
        text: "text-slate-100",
        border: "border-cyan-800",
        glow: "shadow-[0_0_25px_rgba(6,182,212,0.5)]",
        selection: "selection:bg-cyan-900 selection:text-white",
      },
      fonts: {
        head: "font-rajdhani",
        body: "font-inter",
      },
      ui: {
        button:
          "bg-cyan-500 text-black hover:bg-white hover:text-cyan-900 font-bold uppercase tracking-widest",
        card: "bg-slate-900/80 border-cyan-800/40 hover:border-cyan-400/80 backdrop-blur-xl",
      },
    },
  };

  return { dimension, toggleDimension, theme: themes[dimension] };
};

// --- ATMOSPHERE ---
const MultiverseBackground = ({ dimension }) => {
  if (dimension === "rift") {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0000] transition-colors duration-1000">
        {/* 1. STRANGER THINGS "UPSIDE DOWN" VIBE */}

        {/* Organic Veins Texture */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/veins.png')] mix-blend-overlay"></div>

        {/* Constant Floating Spores / Ash */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay animate-pulse"></div>

        {/* Ominous Red Gradient from Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-[#450a0a] via-transparent to-transparent z-0 opacity-80"></div>

        {/* Vignette - Closing in on the user */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_120%)] z-10"></div>

        {/* Floating "Spores" - Organic Movement */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-400 rounded-full blur-[1px]"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -150 - 50, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10,
            }}
          />
        ))}

        {/* Red Lightning / Rift Snaps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0, 0.1, 0, 0.4, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
          }}
          className="absolute inset-0 bg-red-900/30 mix-blend-color-dodge pointer-events-none z-20"
        />
      </div>
    );
  }

  // 2. EARTH / MULTIVERSE THEME
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0a0f] transition-colors duration-1000">
      {/* Prismatic/Chromatic Aberration Noise */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-color-dodge"></div>

      {/* Shattered Grid - Multiple Timelines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:60px_60px] transform perspective-1000 rotate-x-12 scale-110"></div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:150px_150px] opacity-30 origin-center"
      />

      {/* Portals / Wormholes */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-r from-blue-600 via-purple-600 to-transparent rounded-full blur-[150px] opacity-20 mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-l from-cyan-500 via-emerald-500 to-transparent rounded-full blur-[150px] opacity-20 mix-blend-screen"></div>

      {/* Shooting Stars / Data Packets */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: "45deg",
          }}
          animate={{
            x: [0, 500],
            y: [0, 500],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- ABOUT BACKGROUND COMPONENT ---
const AboutBackground = ({ theme }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-xl border border-${theme.colors.border}/50`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-${theme.colors.primary}/5 to-transparent`}
      ></div>
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      {/* Moving Light Beam */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className={`absolute left-0 w-full h-[200px] bg-gradient-to-b from-transparent via-${theme.colors.primary}/10 to-transparent`}
      />
      {/* Decorative Circles */}
      <div
        className={`absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full border border-${theme.colors.primary}/20 opacity-50`}
      ></div>
      <div
        className={`absolute bottom-[-30px] left-[-30px] w-32 h-32 rounded-full border border-${theme.colors.primary}/20 opacity-50`}
      ></div>
    </div>
  );
};

// --- ARCHIVE BACKGROUND COMPONENT ---
const ArchiveBackground = ({ theme }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden`}>
      {/* Floating Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute opacity-20`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? (
            <Ghost className={`w-8 h-8 text-${theme.colors.primary}`} />
          ) : i % 3 === 1 ? (
            <Database className={`w-6 h-6 text-${theme.colors.primary}`} />
          ) : (
            <FlaskConical className={`w-6 h-6 text-${theme.colors.primary}`} />
          )}
        </motion.div>
      ))}

      {/* Glitching Character Silhouette */}
      <motion.div
        className="absolute bottom-0 right-10 opacity-10 pointer-events-none"
        animate={{ opacity: [0.05, 0.15, 0.05], x: [-5, 5, -5] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
      >
        <Skull className={`w-64 h-64 text-${theme.colors.primary}`} />
      </motion.div>

      {/* Scanning Radar Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,${theme.colors.primary}_10deg,transparent_20deg)] opacity-5 blur-xl`}
      />

      {/* Search Light Effect */}
      <motion.div
        animate={{ left: ["-10%", "110%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
        className={`absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-${theme.colors.primary}/10 to-transparent skew-x-12`}
      />
    </div>
  );
};

// --- PROTOCOL BACKGROUND COMPONENT ---
const ProtocolBackground = ({ theme }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden`}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-${theme.colors.primary} opacity-30`}
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      <div
        className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-${theme.colors.bg} to-transparent`}
      ></div>
    </div>
  );
};

// --- COMMAND CENTER BACKGROUND ---
const CommandCenterBackground = ({ theme }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Digital World Map Effect */}
      <div
        className={`absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-5 mix-blend-overlay ${
          theme.id === "rift" ? "invert" : ""
        }`}
      ></div>

      {/* Scanning Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(0,0,0,0.5)_95%)] bg-[size:100%_20px]"></div>
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className={`absolute left-0 w-full h-[2px] bg-${theme.colors.primary} shadow-[0_0_15px_${theme.colors.primary}] opacity-30`}
      />
    </div>
  );
};

// --- REGISTRATION BACKGROUND COMPONENT ---
const RegistrationBackground = ({ theme }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden`}>
      {/* Animated Grid Floor */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 transform perspective-1000 rotate-x-60`}
      ></div>

      {/* Floating Data Cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 border border-${theme.colors.primary} bg-${theme.colors.primary}/5 backdrop-blur-sm opacity-30`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Digital Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
    </div>
  );
};

// --- UI COMPONENTS ---

const IntroOverlay = ({ onComplete, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="mb-8 flex flex-col items-center"
        >
          {/* Glitch-in Title */}
          <motion.h1
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.2,
              repeat: 2,
              repeatType: "reverse",
              ease: "linear",
              delay: 0.5,
            }}
            className="font-cinzel text-4xl md:text-6xl font-black tracking-[0.2em] text-transparent relative z-10"
            style={{
              WebkitTextStroke: "1px #ef4444",
              textShadow: "0 0 20px rgba(220, 38, 38, 0.4)",
            }}
          >
            HACKWITH
          </motion.h1>
          <motion.h1
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.2,
              repeat: 2,
              repeatType: "reverse",
              ease: "linear",
              delay: 0.7,
            }}
            className="font-cinzel text-5xl md:text-8xl font-black tracking-[0.2em] text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.9)] mt-[-5px] md:mt-[-10px] relative z-20"
          >
            MUMBAI
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="h-[2px] bg-red-600 shadow-[0_0_20px_#dc2626] mt-6"
          ></motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={onComplete}
          className={`group relative px-8 py-3 bg-transparent border border-red-900/60 text-red-500 ${theme.fonts.head} text-lg uppercase tracking-widest hover:bg-red-600 hover:text-black hover:border-red-600 transition-all duration-300`}
        >
          <span className="relative z-10 group-hover:animate-pulse">
            Initialize Protocol
          </span>
        </motion.button>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none"></div>
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle, align = "left", theme }) => (
  <div className={`mb-12 ${align === "center" ? "text-center" : ""} relative`}>
    <div
      className={`inline-flex items-center gap-3 mb-3 px-3 py-1 border ${
        theme.colors.border
      } rounded-full bg-black/20 backdrop-blur-sm ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full bg-${theme.colors.primary} animate-pulse shadow-[0_0_8px_currentColor]`}
      ></div>
      <p
        className={`${theme.colors.accent} ${theme.fonts.body} text-[9px] uppercase tracking-[0.2em] font-bold`}
      >
        {subtitle}
      </p>
    </div>
    <h2
      className={`text-3xl md:text-5xl font-black ${theme.colors.text} uppercase tracking-tight leading-none ${theme.fonts.head} drop-shadow-xl`}
    >
      {title}
    </h2>
  </div>
);

const ThemeButton = ({
  children,
  onClick,
  theme,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const variants = {
    primary: `${theme.ui.button} shadow-lg shadow-${theme.colors.primary}/20`,
    secondary: `border ${theme.colors.border} ${theme.colors.accent} hover:border-${theme.colors.primary} hover:text-white hover:bg-white/5 uppercase tracking-widest ${theme.fonts.head}`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 text-sm transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
      )}
    </button>
  );
};

const Card = ({ children, className = "", theme, onClick }) => (
  <div
    onClick={onClick}
    className={`${theme.ui.card} ${
      onClick ? "cursor-pointer" : ""
    } p-6 relative group transition-all duration-500 hover:-translate-y-1 ${className}`}
  >
    {children}
    {/* Refined Corner Accents */}
    <div
      className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-${theme.colors.primary} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    ></div>
    <div
      className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-${theme.colors.primary} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    ></div>
  </div>
);

const CountdownTimer = ({ theme }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE - now;
      if (difference <= 0) return clearInterval(timer);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto my-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className={`bg-black/40 backdrop-blur-md border ${theme.colors.border} p-3 relative group overflow-hidden`}
        >
          <span
            className={`text-2xl md:text-4xl font-black ${theme.colors.accent} block tabular-nums ${theme.fonts.head} drop-shadow-md`}
          >
            {value.toString().padStart(2, "0")}
          </span>
          <span
            className={`text-[8px] uppercase tracking-[0.3em] ${theme.colors.text} opacity-50 mt-1 block font-bold ${theme.fonts.body}`}
          >
            {unit}
          </span>
          <div
            className={`absolute bottom-0 left-0 w-full h-[1px] bg-${theme.colors.primary} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const { dimension, toggleDimension, theme } = useTheme();
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [regStep, setRegStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [adminAuth, setAdminAuth] = useState({
    email: "",
    pass: "",
    isAuthenticated: false,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    teamName: "",
    teamSize: 2, // Default to 2 (Minimum)
    leader: { name: "", email: "", mobile: "", education: "", city: "" },
    members: [
      { name: "", email: "", mobile: "", education: "" },
      { name: "", email: "", mobile: "", education: "" },
      { name: "", email: "", mobile: "", education: "" },
    ],
    paymentId: "",
  });

  // Backend URL helper: set VITE_BACKEND_URL in frontend deployment (Vercel) to your backend URL.
  // If not set, requests use same-origin paths like `/api/create-order`.
  const API_BASE = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");
  const api = (path) => (API_BASE ? `${API_BASE}${path}` : path);

  // --- MOCK INITIALIZATION ---
  useEffect(() => {
    // Simulate checking auth state
    setTimeout(() => {
      setUser({ uid: "mock-user-id", isAnonymous: true });
    }, 1000);
  }, []);

    // --- REALTIME DATA (FROM BACKEND) ---
    useEffect(() => {
        if (!adminAuth.isAuthenticated) return;
        
        // Fetch registrations from backend
        const fetchRegistrations = async () => {
            try {
                const response = await fetch(api('/api/registrations'));
                if (response.ok) {
                    const data = await response.json();
                    setRegistrations(data);
                } else {
                    console.error('Failed to fetch registrations');
                    // No registrations if backend fails
                    setRegistrations([]);
                }
            } catch (error) {
                console.error('Error fetching registrations:', error);
                // No registrations if backend is not running
                setRegistrations([]);
            }
        };
        
        fetchRegistrations();
        
        // Refresh every 5 seconds to see new registrations
        const interval = setInterval(fetchRegistrations, 5000);
        return () => clearInterval(interval);
    }, [adminAuth.isAuthenticated]);

  const handleNextStep = () => {
    // 1. Validation check
    if (regStep === 1) {
      if (!formData.teamName?.trim() || !formData.leader?.name?.trim()) {
        alert("⚠️ Please enter a Team Name and Leader details.");
        return;
      }
    } else {
      // Safe access using optional chaining (?.)
      const currentMember = formData.members?.[regStep - 2];
      if (!currentMember?.name?.trim()) {
        alert(`⚠️ Please fill in details for Member 0${regStep}`);
        return;
      }
    }

    // 2. Progression
    if (regStep < formData.teamSize) {
      setRegStep((prev) => prev + 1);
    } else {
      handlePayment();
    }
  };

  const downloadRegistrationsCSV = () => {
    if (registrations.length === 0) {
      alert("No registrations to download");
      return;
    }

    // Prepare CSV headers
    const headers = [
      "Squad ID",
      "Squad Name",
      "Leader Name",
      "Leader Email",
      "Leader Mobile",
      "Leader Education",
      "Leader City",
      "Team Size",
      "Member 1 Name",
      "Member 1 Email",
      "Member 1 Mobile",
      "Member 1 Education",
      "Member 2 Name",
      "Member 2 Email",
      "Member 2 Mobile",
      "Member 2 Education",
      "Member 3 Name",
      "Member 3 Email",
      "Member 3 Mobile",
      "Member 3 Education",
      "Payment Status",
      "Order ID",
      "Payment ID",
      "Amount Paid (INR)",
      "Payment Date",
    ];

    // Prepare CSV rows
    const rows = registrations.map((r) => [
      r.id || "",
      r.teamName || "",
      r.leader?.name || "",
      r.leader?.email || "",
      r.leader?.mobile || "",
      r.leader?.education || "",
      r.leader?.city || "",
      r.teamSize || "",
      r.members?.[0]?.name || "",
      r.members?.[0]?.email || "",
      r.members?.[0]?.mobile || "",
      r.members?.[0]?.education || "",
      r.members?.[1]?.name || "",
      r.members?.[1]?.email || "",
      r.members?.[1]?.mobile || "",
      r.members?.[1]?.education || "",
      r.members?.[2]?.name || "",
      r.members?.[2]?.email || "",
      r.members?.[2]?.mobile || "",
      r.members?.[2]?.education || "",
      r.payment?.status || "PENDING",
      r.payment?.orderId || "",
      r.payment?.paymentId || "",
      r.payment?.amount ? (r.payment.amount / 100).toFixed(2) : calculateRegistrationFee(r.teamSize).toFixed(2),
      r.payment?.timestamp
        ? new Date(r.payment.timestamp).toLocaleDateString()
        : "",
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap cells with commas in quotes
            const cellStr = String(cell).replace(/"/g, '""');
            return cellStr.includes(",") ? `"${cellStr}"` : cellStr;
          })
          .join(",")
      ),
    ].join("\n");

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().slice(0, 10);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `HackWithMumbai_Registrations_${timestamp}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Validate required fields
            if (!formData.teamName || !formData.teamName.trim()) {
                alert("❌ Please enter a team name");
                setLoading(false);
                return;
            }
            
            if (!formData.leader.email || !formData.leader.email.trim()) {
                alert("❌ Please enter leader email");
                setLoading(false);
                return;
            }
            
            if (!formData.leader.name || !formData.leader.name.trim()) {
                alert("❌ Please enter leader name");
                setLoading(false);
                return;
            }
            
            // Load Razorpay script
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            
            if (!res) {
                alert("Failed to load Razorpay. Please try again.");
                setLoading(false);
                return;
            }

            // Calculate amount based on team size
            const amount = calculateRegistrationFee(formData.teamSize);
            
            // Create order from backend
            let orderResponse;
            try {
                orderResponse = await fetch(api('/api/create-order'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount,
                        teamName: formData.teamName,
                        teamSize: formData.teamSize,
                        leaderEmail: formData.leader.email
                    })
                });
            } catch (fetchError) {
              console.error("Fetch error:", fetchError);
              const attempted = api('/api/create-order');
              alert(`❌ Backend unreachable at ${attempted}. Ensure your backend is deployed and set VITE_BACKEND_URL in the frontend deployment to the backend URL (or deploy backend under same origin).`);
              setLoading(false);
              return;
            }

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        console.error("Order response error:", errorText);
        alert(
          `Server error: ${orderResponse.status} ${orderResponse.statusText}`
        );
        setLoading(false);
        return;
      }

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        console.error("Order creation failed:", orderData);
        alert(
          "Failed to create payment order: " +
            (orderData.error || "Unknown error")
        );
        setLoading(false);
        return;
      }

      console.log("Order created:", orderData);

            // Razorpay options
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "HackwithMumbai 2.0",
                description: `Registration Fee - ${formData.teamName} (${formData.teamSize} Members)`,
                order_id: orderData.orderId,
                prefill: {
                    name: formData.leader.name,
                    email: formData.leader.email,
                    contact: formData.leader.mobile
                },
                theme: {
                    color: dimension === 'rift' ? '#dc2626' : '#06b6d4'
                },
                handler: async (response) => {
                    // Verify payment on backend
                    try {
                        const verifyResponse = await fetch(api('/api/verify-payment'), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                registrationData: formData
                            })
                        });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Payment successful
              console.log("Payment verified:", verifyData);
              // Use the registration object returned by the backend (includes payment details)
              await saveRegistration(verifyData.registration || response.razorpay_payment_id);
            } else {
              console.error("Verification failed:", verifyData);
              alert(
                "Payment verification failed: " +
                  (verifyData.error || "Unknown error")
              );
              setLoading(false);
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed: " + error.message);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled");
            setLoading(false);
          },
        },
      };

      // Open Razorpay checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment process failed: " + error.message);
      setLoading(false);
    }
  };

  const saveRegistration = async (registrationOrPayment) => {
    setLoading(true);
    try {
      // If the backend returned the full registration object, use it directly
      if (
        registrationOrPayment &&
        typeof registrationOrPayment === "object" &&
        registrationOrPayment.payment
      ) {
        const reg = registrationOrPayment;
        setRegistrations((prev) => [reg, ...prev]);
        setView("success");
        return;
      }

      // Fallback behavior: create a local registration when only a paymentId string is provided
      const paymentId = registrationOrPayment;

      const participantCount = Math.max(0, formData.teamSize - 1);
      const finalMembers = formData.members.slice(0, participantCount);

      const newRegistration = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        members: finalMembers,
        timestamp: new Date().toISOString(),
        payment: { paymentId: paymentId, status: "SUCCESS", timestamp: new Date() },
      };

      setRegistrations((prev) => [newRegistration, ...prev]);
      setView("success");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        "❌ Something went wrong while saving. Check the console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminAuth.email === "admin@hackmumbai.in" &&
      adminAuth.pass === "ADMIN2026"
    ) {
      setAdminAuth((p) => ({ ...p, isAuthenticated: true }));
      setView("admin");
    } else {
      alert("ACCESS DENIED");
    }
  };

  return (
    <div
      className={`${theme.colors.bg} min-h-screen ${theme.colors.text} ${theme.fonts.body} ${theme.colors.selection} overflow-x-hidden relative transition-colors duration-700`}
    >
      <AnimatePresence>
        {showIntro && (
          <IntroOverlay theme={theme} onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <MultiverseBackground dimension={dimension} />

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 border-b ${theme.colors.border} bg-black/80 backdrop-blur-xl transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView("home")}
          >
            <div
              className={`p-1 border border-${theme.colors.primary} bg-black/50 relative overflow-visible group-hover:scale-110 transition-transform rounded-full box-content`}
            >
              <div className="absolute inset-0 bg-red-600/60 blur-[6px] rounded-full animate-pulse"></div>
              <img
                src="/hackwithmumbai/hwi_logo.jpg"
                alt="HWI"
                className="w-6 h-6 object-contain rounded-full relative z-10 animate-pulse-red-glow"
              />
            </div>
            <span
              className={`font-black text-lg tracking-tighter uppercase ${theme.fonts.head} group-hover:${theme.colors.accent} transition-colors`}
            >
              HACKWITH MUMBAI{" "}
              <span className={`text-${theme.colors.primary}`}>2.0</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {["About", "Gallery", "Rulebook", "Organizers"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setView("home")}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 hover:opacity-100 hover:${theme.colors.accent} transition-all relative group`}
              >
                {item}
                <span
                  className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-${theme.colors.primary} transition-all group-hover:w-full`}
                ></span>
              </a>
            ))}
            <button
              onClick={() => setView("admin-login")}
              className={`flex items-center gap-1.5 text-[10px] ${theme.fonts.head} uppercase tracking-[0.2em] opacity-60 hover:opacity-100 hover:${theme.colors.accent} transition-all`}
            >
              <Lock className="w-3 h-3" /> Hub
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDimension}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.colors.border} bg-white/5 hover:bg-white/10 transition-colors text-[10px] ${theme.fonts.head} uppercase tracking-widest`}
            >
              <RefreshCw className="w-3 h-3" />
              {dimension === "rift" ? "Earth" : "Rift"}
            </button>
            <ThemeButton
              onClick={() => setView("register")}
              theme={theme}
              className="!py-2 !px-6"
            >
              Register
            </ThemeButton>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20"
          >
            {/* HERO */}
            <header className="min-h-[85vh] flex flex-col items-center justify-center px-6 relative z-10 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8"
              >
                <span
                  className={`px-4 py-1.5 border ${theme.colors.border} bg-black/40 ${theme.colors.accent} text-[9px] tracking-[0.4em] uppercase font-black backdrop-blur-sm`}
                >
                  National Level Hackathon
                </span>
              </motion.div>

              <div className="relative mb-10 flex flex-col items-center z-10">
                {/* HACKWITH - Outline Style */}
                <div
                  className={`text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] ${theme.fonts.head} relative z-10`}
                >
                  <FlickerText
                    text="HACKWITH"
                    textColor="transparent"
                    strokeColor={dimension === "rift" ? "#ef4444" : "#06b6d4"}
                    glowColor={dimension === "rift" ? "#ef4444" : "#06b6d4"}
                    backgroundColor="transparent"
                    showBackground={false}
                    strokeWidth={1}
                    animationSpeed={0.5}
                    animationStyle="neon"
                    className="inline-block"
                  />
                </div>

                {/* MUMBAI - Solid Style */}
                <div
                  className={`flex items-center gap-8 md:gap-12 text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] ${theme.fonts.head} relative z-10`}
                >
                  <FlickerText
                    text="MUMBAI"
                    textColor={dimension === "rift" ? "#ef4444" : "#06b6d4"}
                    glowColor={dimension === "rift" ? "#ef4444" : "#06b6d4"}
                    backgroundColor="transparent"
                    showBackground={false}
                    strokeWidth={1}
                    animationSpeed={0.5}
                    animationStyle="neon"
                  />
                  <span className="text-white text-6xl md:text-8xl align-top font-inter">
                    2.0
                  </span>
                </div>
                <div
                  className={`absolute inset-0 blur-[60px] opacity-30 bg-${theme.colors.primary} -z-10 animate-pulse`}
                ></div>
              </div>

              <CountdownTimer theme={theme} />

              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <ThemeButton theme={theme} onClick={() => setView("register")}>
                  Start Registration
                </ThemeButton>
                <ThemeButton
                  theme={theme}
                  variant="secondary"
                  onClick={() =>
                    window.open(
                      "https://chat.whatsapp.com/G6MasRM8AK08WJq7KDifNq",
                      "_blank"
                    )
                  }
                >
                  Join Community
                </ThemeButton>
              </div>
            </header>

            {/* ABOUT */}
            <section
              id="about"
              className={`py-24 px-6 border-t ${theme.colors.border} bg-black/20 backdrop-blur-sm relative overflow-hidden`}
            >
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="relative z-10">
                  <SectionHeading
                    title="Mission Brief"
                    subtitle="System Intel"
                    theme={theme}
                  />

                  {/* Animated Background for Mission Brief */}
                  <div
                    className={`relative p-8 border ${theme.colors.border} bg-black/60 backdrop-blur-md overflow-hidden group`}
                  >
                    <AboutBackground theme={theme} />

                    {/* HUD Corners */}
                    <div
                      className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-${theme.colors.primary}`}
                    ></div>
                    <div
                      className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-${theme.colors.primary}`}
                    ></div>
                    <div
                      className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-${theme.colors.primary}`}
                    ></div>
                    <div
                      className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-${theme.colors.primary}`}
                    ></div>

                    <div className="relative z-10">
                      <p
                        className={`text-2xl font-light leading-relaxed mb-6 ${theme.fonts.head}`}
                      >
                        Initiating{" "}
                        <span
                          className={`${theme.colors.accent} font-bold animate-pulse`}
                        >
                          HackwithMumbai2.0
                        </span>{" "}
                        Protocol.
                      </p>
                      <p className="text-sm opacity-80 font-mono leading-relaxed tracking-wide">
                        <span className={`${theme.colors.accent}`}>
                          [SYSTEM_LOG]:
                        </span>{" "}
                        A convergence of elite developers, designers, and
                        innovators detected at Navi Mumbai Node.
                        <br />
                        <br />
                        Mission: 30-hour sprint. Build the future. Disrupt the
                        present. Survive deployment.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                      {
                        label: "Operatives",
                        value: "500+",
                        icon: Users,
                        delay: 0,
                      },
                      {
                        label: "Bounty",
                        value: "₹1.5L",
                        icon: Coins,
                        delay: 0.2,
                      },
                      {
                        label: "Mentors",
                        value: "20+",
                        icon: BrainCircuit,
                        delay: 0.4,
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay }}
                        className={`border ${theme.colors.border} p-4 bg-black/40 text-center group hover:bg-${theme.colors.primary}/10 transition-colors relative overflow-hidden`}
                      >
                        <div
                          className={`absolute top-0 right-0 p-1 opacity-50`}
                        >
                          <Wifi
                            className={`w-3 h-3 text-${theme.colors.primary}`}
                          />
                        </div>
                        <stat.icon
                          className={`w-6 h-6 mx-auto mb-3 text-${theme.colors.primary} group-hover:scale-110 transition-transform`}
                        />
                        <div
                          className={`text-2xl font-black ${theme.fonts.head} mb-1`}
                        >
                          {stat.value}
                        </div>
                        <div
                          className={`text-[8px] uppercase tracking-widest ${theme.colors.accent} font-bold`}
                        >
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative group perspective-1000">
                  {/* Multiverse/Stranger Things Themed Graphic */}
                  <div
                    className={`relative z-10 border ${theme.colors.border} bg-black/80 p-2 transform transition-transform duration-700 group-hover:rotate-y-6 group-hover:scale-[1.02]`}
                  >
                    <div className="relative aspect-video overflow-hidden border border-white/5 bg-black">
                      <div
                        className={`absolute inset-0 bg-gradient-to-b from-${theme.colors.primary}/10 to-transparent z-10 mix-blend-overlay`}
                      ></div>
                      {/* Abstract Tech Graphic Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Globe
                          className={`w-48 h-48 text-${theme.colors.primary} opacity-20 animate-spin-slow`}
                        />
                      </div>
                      <div
                        className={`absolute top-0 left-0 w-full h-1 bg-${theme.colors.primary} shadow-[0_0_20px_${theme.colors.primary}] animate-scan opacity-60`}
                      ></div>

                      {/* Glitching character silhouette */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Ghost
                          className={`w-32 h-32 text-${theme.colors.primary} opacity-40 animate-pulse blur-sm`}
                        />
                      </div>

                      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/60 space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 bg-${theme.colors.primary} rounded-full animate-ping`}
                          ></span>{" "}
                          LIVE FEED
                        </div>
                        <div>LOC: NAVI_MUMBAI_NODE</div>
                      </div>
                      <Activity
                        className={`absolute top-4 right-4 w-5 h-5 text-${theme.colors.primary} animate-pulse`}
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute inset-0 bg-${theme.colors.primary} blur-[100px] opacity-10 -z-10`}
                  ></div>
                </div>
              </div>
            </section>

            {/* GALLERY */}
            <section
              id="gallery"
              className={`py-24 px-6 border-t ${theme.colors.border} relative overflow-hidden`}
            >
              <ArchiveBackground theme={theme} />
              <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                  title="Past Archives"
                  subtitle="Classified Logs"
                  align="center"
                  theme={theme}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ARCHIVES.map((event) => (
                    <Card
                      key={event.id}
                      theme={theme}
                      onClick={() => setSelectedEvent(event)}
                      className="p-0 overflow-hidden h-[320px] group"
                    >
                      <div className="h-[200px] w-full overflow-hidden relative">
                        <img
                          src={event.img}
                          alt={event.title}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                          <span
                            className={`bg-black/90 border ${theme.colors.border} ${theme.colors.accent} text-[8px] px-2 py-1 uppercase tracking-widest font-bold backdrop-blur-md`}
                          >
                            {event.date}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 h-[120px] relative bg-black/60 border-t border-white/5 group-hover:bg-black/80 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3
                            className={`text-lg font-black text-white ${theme.fonts.head} uppercase leading-none`}
                          >
                            {event.title}
                          </h3>
                        </div>
                        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                          <span
                            className={`text-[9px] font-mono opacity-40 uppercase tracking-widest`}
                          >
                            ID: {event.id}
                          </span>
                          <div
                            className={`text-[9px] font-bold uppercase tracking-widest ${theme.colors.accent} flex items-center gap-1 group-hover:gap-2 transition-all`}
                          >
                            Access Data <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* RULEBOOK */}
            <section
              id="rulebook"
              className={`py-24 px-6 border-t ${theme.colors.border} bg-white/5 relative overflow-hidden`}
            >
              <ProtocolBackground theme={theme} />
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <ShieldAlert
                  className={`w-12 h-12 text-${theme.colors.primary} mx-auto mb-6`}
                />
                <SectionHeading
                  title="The Protocol"
                  subtitle="Rule Book & Problem Statements"
                  align="center"
                  theme={theme}
                />
                <p className="opacity-60 mb-10 text-base">
                  Strict adherence to the HackwithMumbai2.0 protocol is
                  mandatory. Failure to comply will result in immediate
                  disqualification. Review the mission directives carefully.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6">
                  <ThemeButton
                    theme={theme}
                    onClick={() =>
                      window.open(
                        "/hackwithmumbai/HACK WITH MUMBAI 2.0 Participant's brochure.pdf",
                        "_blank"
                      )
                    }
                  >
                    <Download className="w-4 h-4" /> Download Rulebook
                  </ThemeButton>

                  <ThemeButton
                    theme={theme}
                    variant="secondary"
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/document/d/1XyZ..._problem_statements",
                        "_blank"
                      )
                    }
                  >
                    <FileText className="w-4 h-4" /> Problem Statements
                  </ThemeButton>
                </div>
              </div>
            </section>

            {/* ORGANIZERS */}
            <section
              id="organizers"
              className={`py-24 px-6 border-t ${theme.colors.border} relative overflow-hidden`}
            >
              <CommandCenterBackground theme={theme} />
              <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                  title="Command Center"
                  subtitle="Organizers"
                  align="center"
                  theme={theme}
                />

                {/* Student Organizers */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                  {[
                    {
                      name: "Yash Mohite",
                      role: "Organizer",
                      email: "yashmohite341@gmail.com",
                      phone: "+91 9967053816",
                    },
                    {
                      name: "Shubham Bhat",
                      role: "Organizer",
                      email: "bhatshubham15@gmail.com",
                      phone: "+91 9082193612",
                    },
                    {
                      name: "Ansh Verma",
                      role: "Organizer",
                      email: "verma.07ansh@gmail.com",
                      phone: "+91 6261681932",
                    },
                    {
                      name: "Aayush Pandey",
                      role: "Organizer",
                      email: "masteraayush1010@gmail.com",
                      phone: "+91 9820883125",
                    },
                  ].map((org, i) => (
                    <Card
                      key={i}
                      theme={theme}
                      className="text-center group hover:-translate-y-2 p-6 backdrop-blur-md bg-black/40"
                    >
                      <div className={`relative w-24 h-24 mx-auto mb-6`}>
                        <div
                          className={`absolute inset-0 rounded-full border-2 border-${theme.colors.primary} border-dashed animate-spin-slow opacity-50`}
                        ></div>
                        <div
                          className={`absolute inset-2 rounded-full border border-${theme.colors.border} bg-black flex items-center justify-center overflow-hidden`}
                        >
                          <Users
                            className={`w-8 h-8 text-${theme.colors.primary} group-hover:scale-110 transition-transform`}
                          />
                        </div>
                        <div
                          className={`absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-${theme.colors.primary} opacity-0 group-hover:opacity-100 animate-scan`}
                        ></div>
                      </div>
                      <h4
                        className={`text-lg font-black text-white uppercase ${theme.fonts.head} mb-1`}
                      >
                        {org.name}
                      </h4>
                      <p
                        className={`text-[9px] ${theme.colors.accent} font-bold uppercase tracking-widest mb-6`}
                      >
                        {org.role}
                      </p>
                      <div
                        className={`space-y-3 border-t ${theme.colors.border} pt-4 opacity-80 text-[10px] font-mono`}
                      >
                        <div className="flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                          <Mail
                            className={`w-3 h-3 text-${theme.colors.primary}`}
                          />
                          <span
                            className="truncate max-w-[150px]"
                            title={org.email}
                          >
                            {org.email}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                          <a
                            href={`tel:${org.phone}`}
                            className="flex items-center justify-center gap-2 group-hover:text-white transition-colors hover:text-${theme.colors.primary}"
                          >
                            <Phone
                              className={`w-3 h-3 text-${theme.colors.primary}`}
                            />{" "}
                            {org.phone}
                          </a>
                          <a
                            href={`https://wa.me/${org.phone.replace(
                              /[^0-9]/g,
                              ""
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center justify-center gap-2 py-2 px-4 rounded border border-${theme.colors.primary} bg-${theme.colors.primary}/10 hover:bg-${theme.colors.primary}/30 transition-all text-[10px] uppercase font-bold tracking-widest group-hover:scale-105 transform duration-300`}
                          >
                            <MessageCircle className="w-3 h-3" /> Chat
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* REGISTER VIEW */}
        {view === "register" && (
          <motion.div
            key="register"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pt-28 pb-20 px-6 min-h-screen relative z-10 flex items-center justify-center"
          >
            <RegistrationBackground theme={theme} />

            <div className="max-w-3xl w-full relative z-10">
              <button
                onClick={() => setView("home")}
                className={`mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${theme.colors.accent} hover:text-white transition-colors`}
              >
                <ChevronRight className="w-4 h-4 rotate-180" /> Abort Sequence
              </button>

              <Card
                theme={theme}
                className={`bg-black/80 border-${theme.colors.primary} p-10`}
              >
                <div
                  className={`flex items-end justify-between mb-8 pb-4 border-b ${theme.colors.border}`}
                >
                  <div>
                    <h2
                      className={`text-2xl font-black text-white uppercase ${theme.fonts.head}`}
                    >
                      Registration
                    </h2>
                    <p
                      className={`${theme.colors.accent} text-[10px] font-bold uppercase tracking-widest mt-1`}
                    >
                      HackwithMumbai2.0 Protocol
                    </p>
                  </div>
                  <div
                    className={`${theme.colors.accent} font-black text-4xl opacity-30 ${theme.fonts.head}`}
                  >
                    0{regStep}
                  </div>
                </div>

                {/* STEP 1: LEADER & TEAM CONFIG */}
                {regStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label
                          className={`text-[9px] font-bold uppercase tracking-widest ${theme.colors.accent}`}
                        >
                          Team Name
                        </label>
                        <input
                          className={`w-full bg-white/5 border ${theme.colors.border} p-3 text-white font-mono text-xs focus:border-${theme.colors.primary} outline-none transition-colors`}
                          value={formData?.teamName || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              teamName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          className={`text-[9px] font-bold uppercase tracking-widest ${theme.colors.accent}`}
                        >
                          Team Size (Min: 2)
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  teamSize: Math.max(2, formData.teamSize - 1),
                                })
                              }
                              className={`p-2 border ${theme.colors.border} bg-white/5 hover:bg-${theme.colors.primary}/20 transition-colors`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span
                              className={`text-2xl font-black ${theme.fonts.head} w-12 text-center`}
                            >
                              {formData?.teamSize || 2}
                            </span>
                            <button
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  teamSize: Math.min(4, formData.teamSize + 1),
                                })
                              }
                              className={`p-2 border ${theme.colors.border} bg-white/5 hover:bg-${theme.colors.primary}/20 transition-colors`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div
                            className={`flex-1 p-3 bg-${theme.colors.primary}/10 border border-${theme.colors.primary}/50 rounded`}
                          >
                            <div className="text-2xl font-black text-white">
                              ₹{calculateRegistrationFee(formData.teamSize)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`space-y-4 pt-4 border-t ${theme.colors.border}`}
                    >
                      <p className="text-[10px] font-bold uppercase text-white tracking-widest">
                        Leader Details (Member 01)
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {["name", "email", "mobile", "education"].map(
                          (field) => (
                            <input
                              key={field}
                              placeholder={field.toUpperCase()}
                              className={`bg-white/5 border ${theme.colors.border} p-3 text-white font-mono text-xs focus:border-${theme.colors.primary} outline-none`}
                              value={formData?.leader?.[field] || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  leader: {
                                    ...formData.leader,
                                    [field]: e.target.value,
                                  },
                                })
                              }
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <ThemeButton theme={theme} onClick={handleNextStep}>
                        Next Member <ChevronRight className="w-4 h-4" />
                      </ThemeButton>
                    </div>
                  </div>
                )}

                {/* STEPS 2-4: DYNAMIC MEMBER SLOTS */}
                {[2, 3, 4].includes(regStep) && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                      Member 0{regStep} Details
                    </h3>
                    <div className="grid gap-4">
                      {["name", "email", "mobile", "education"].map((field) => (
                        <input
                          key={field}
                          placeholder={`MEMBER ${field.toUpperCase()}`}
                          className={`w-full bg-white/5 border ${theme.colors.border} p-3 text-white font-mono text-xs focus:border-${theme.colors.primary} outline-none`}
                          // CRITICAL FIX: Safe access for members array
                          value={formData.members?.[regStep - 2]?.[field] || ""}
                          onChange={(e) => {
                            const m = [...formData.members];
                            if (!m[regStep - 2]) m[regStep - 2] = {}; // Ensure object exists
                            m[regStep - 2][field] = e.target.value;
                            setFormData({ ...formData, members: m });
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => setRegStep((p) => p - 1)}
                        className={`${theme.colors.accent} hover:text-white uppercase font-bold text-xs tracking-widest`}
                      >
                        Back
                      </button>
                      <ThemeButton
                        theme={theme}
                        onClick={handleNextStep}
                        disabled={loading}
                      >
                        {loading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : regStep === formData.teamSize ? (
                          <>
                            <CreditCard className="w-4 h-4" /> Pay Now
                          </>
                        ) : (
                          "Next Member"
                        )}
                      </ThemeButton>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </motion.div>
        )}

        {/* SUCCESS VIEW */}
        {view === "success" && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
            <Card
              theme={theme}
              className="max-w-md w-full text-center py-16 border-green-500/30"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <CheckCircle2 className="w-10 h-10 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
              </div>
              <h2
                className={`text-3xl font-black text-white uppercase ${theme.fonts.head} mb-4 tracking-tight`}
              >
                Access Granted
              </h2>
              <p
                className={`${theme.colors.text} opacity-70 font-mono text-xs mb-8 leading-relaxed`}
              >
                Your squad has been registered in the HackwithMumbai2.0
                mainframe. Prepare for deployment.
              </p>
              <ThemeButton
                theme={theme}
                onClick={() => window.location.reload()}
              >
                Return to Base
              </ThemeButton>
            </Card>
          </motion.div>
        )}

        {/* ADMIN LOGIN */}
        {view === "admin-login" && (
          <motion.div className="min-h-screen pt-28 flex justify-center px-6 relative z-10">
            <Card theme={theme} className="max-w-sm w-full h-fit py-10">
              <div className="text-center mb-8">
                <Lock
                  className={`w-10 h-10 text-${theme.colors.primary} mx-auto mb-4`}
                />
                <h2 className="text-xl font-black text-white uppercase tracking-widest">
                  Command Access
                </h2>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="OFFICER ID"
                  className={`w-full bg-black/50 border ${theme.colors.border} p-3 text-center text-white font-mono text-xs focus:border-${theme.colors.primary} outline-none transition-colors`}
                  onChange={(e) =>
                    setAdminAuth({ ...adminAuth, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="PASSCODE"
                  className={`w-full bg-black/50 border ${theme.colors.border} p-3 text-center text-white font-mono text-xs focus:border-${theme.colors.primary} outline-none tracking-[0.5em] transition-colors`}
                  onChange={(e) =>
                    setAdminAuth({ ...adminAuth, pass: e.target.value })
                  }
                />
                <ThemeButton theme={theme} className="w-full">
                  Authenticate
                </ThemeButton>
              </form>
            </Card>
          </motion.div>
        )}

                {/* ADMIN DASHBOARD */}
                {view === 'admin' && (
                    <motion.div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen relative z-10 pb-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                            <div>
                                <h2 className={`text-3xl font-black text-white uppercase ${theme.fonts.head}`}>Command Center</h2>
                                <p className={`${theme.colors.accent} text-[10px] font-bold uppercase tracking-widest mt-2`}>{registrations.length} Registered Squads</p>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button 
                                    onClick={downloadRegistrationsCSV} 
                                    disabled={registrations.length === 0}
                                    className={`flex items-center gap-2 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${registrations.length === 0 ? 'opacity-50 cursor-not-allowed bg-white/5' : 'bg-green-900/30 border border-green-900/50 text-green-400 hover:bg-green-900/50'}`}
                                >
                                    <FileDown className="w-4 h-4" /> Download CSV
                                </button>
                                <button 
                                    onClick={() => { setAdminAuth({ email: '', pass: '', isAuthenticated: false }); setView('home'); }} 
                                    className={`${theme.colors.accent} font-bold uppercase text-[10px] tracking-widest hover:text-white px-4 py-2`}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

            {/* FILTERED REGISTRATIONS LOGIC */}
            {registrations.filter(
              (r) =>
                r.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.leader?.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())
            ).length === 0 ? (
              <div
                className={`border ${theme.colors.border} bg-black/60 backdrop-blur-md p-12 text-center`}
              >
                <SearchCode
                  className={`w-12 h-12 text-${theme.colors.primary} mx-auto mb-4 opacity-20`}
                />
                <p className="text-white/60 text-sm font-mono uppercase tracking-widest">
                  No matching operatives found in mainframe
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations
                  .filter(
                    (r) =>
                      r.teamName
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      r.leader?.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((r) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border ${theme.colors.border} bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300`}
                    >
                      <div className="p-6">
                        {/* PRESREVED TOP INFO GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p
                              className={`text-[9px] ${theme.colors.accent} uppercase font-bold tracking-widest mb-1`}
                            >
                              Squad
                            </p>
                            <p className="text-white font-bold text-sm">
                              {r.teamName}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-[9px] ${theme.colors.accent} uppercase font-bold tracking-widest mb-1`}
                            >
                              Leader
                            </p>
                            <p className="text-white font-bold text-sm">
                              {r.leader?.name}
                            </p>
                            <p className="text-[10px] text-white/60">
                              {r.leader?.email}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-[9px] ${theme.colors.accent} uppercase font-bold tracking-widest mb-1`}
                            >
                              Size
                            </p>
                            <p className="text-white font-bold text-sm">
                              {r.teamSize} Members
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-[9px] ${theme.colors.accent} uppercase font-bold tracking-widest mb-1`}
                            >
                              Contact
                            </p>
                            <p className="text-white font-mono text-xs">
                              {r.leader?.mobile}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-[9px] ${theme.colors.accent} uppercase font-bold tracking-widest mb-1`}
                            >
                              Payment Status
                            </p>
                            <span className="inline-block px-2 py-1 bg-green-900/20 text-green-500 border border-green-900/50 text-[9px] uppercase font-bold tracking-widest rounded">
                              {r.payment?.status || "SUCCESS"}
                            </span>
                          </div>
                        </div>

                                            <div className="border-t border-white/10 pt-4 mt-4">
                                                <h4 className={`text-[9px] ${theme.colors.accent} uppercase font-bold tracking-widest mb-3`}>Registration Details</h4>
                                                
                                                {/* Leader Details */}
                                                <div className="bg-black/50 p-4 rounded mb-4">
                                                    <h5 className="text-white font-bold text-sm mb-2">Team Leader</h5>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white/80">
                                                        <div>
                                                            <p className="text-[9px] opacity-60 mb-1">Name</p>
                                                            <p className="font-mono">{r.leader?.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] opacity-60 mb-1">Email</p>
                                                            <p className="font-mono text-[10px]">{r.leader?.email}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] opacity-60 mb-1">Mobile</p>
                                                            <p className="font-mono">{r.leader?.mobile}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] opacity-60 mb-1">Education</p>
                                                            <p className="font-mono">{r.leader?.education}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] opacity-60 mb-1">City</p>
                                                            <p className="font-mono">{r.leader?.city}</p>
                                                        </div>
                                                    </div>
                                                </div>

                          {/* Team Members Detail Box - ONLY DISPLAYS NON-EMPTY */}
                          {r.members &&
                            r.members.filter((m) => m?.name?.trim()).length >
                              0 && (
                              <div className="bg-black/50 p-4 rounded mb-4 border border-white/5">
                                <h5 className="text-white font-bold text-sm mb-3">
                                  {" "}
                                  Team Members
                                </h5>
                                <div className="space-y-3">
                                  {r.members
                                    .filter((member) => member?.name?.trim())
                                    .map((member, idx) => (
                                      <div
                                        key={idx}
                                        className={`border-l-2 border-${theme.colors.primary}/30 pl-3 text-xs text-white/80`}
                                      >
                                        <p className="font-bold text-white mb-1 uppercase tracking-wider text-[10px]">
                                          Member 0{idx + 2}
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[10px]">
                                          <div>
                                            <span className="opacity-40 uppercase">
                                              Name:
                                            </span>{" "}
                                            {member?.name}
                                          </div>
                                          <div>
                                            <span className="opacity-40 uppercase">
                                              Email:
                                            </span>{" "}
                                            {member?.email}
                                          </div>
                                          <div>
                                            <span className="opacity-40 uppercase">
                                              Mobile:
                                            </span>{" "}
                                            {member?.mobile}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}

                          {/* Payment Proof Box */}
                          {r.payment && (
                            <div className="bg-green-900/10 border border-green-900/30 p-4 rounded">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white/80">
                                <div>
                                  <p className="text-[8px] opacity-40 uppercase mb-1">
                                    Order ID
                                  </p>
                                  <p className="font-mono text-[9px] break-all">
                                    {r.payment?.orderId || "TXN_LOCAL_01"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[8px] opacity-40 uppercase mb-1">
                                    Payment ID
                                  </p>
                                  <p className="font-mono text-[9px] break-all">
                                    {r.payment?.paymentId}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[8px] opacity-40 uppercase mb-1">
                                    Amount
                                  </p>
                                  <p className="font-mono font-bold text-green-400">
                                    ₹{" "}
                                    {r.payment?.amount
                                      ? (r.payment.amount / 100).toFixed(2)
                                      : calculateRegistrationFee(r.teamSize).toFixed(2)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[8px] opacity-40 uppercase mb-1">
                                    Timestamp
                                  </p>
                                  <p className="font-mono text-[9px]">
                                    {r.payment?.timestamp
                                      ? new Date(
                                          r.payment.timestamp
                                        ).toLocaleDateString()
                                      : "01/01/2026"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* EVENT MODAL - REFINED */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`relative max-w-4xl w-full ${theme.colors.bg} border ${theme.colors.border} shadow-2xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`h-1 w-full bg-${theme.colors.primary} shadow-[0_0_20px_currentColor]`}
              ></div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 text-white/50 hover:text-red-500 transition-colors p-2 bg-black/50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-[2fr_3fr] h-full max-h-[85vh] overflow-y-auto">
                <div className="relative h-56 md:h-full min-h-[350px]">
                  <img
                    src={selectedEvent.img}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-${theme.colors.bg} via-transparent to-transparent opacity-90`}
                  ></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span
                      className={`inline-block px-2 py-0.5 border ${theme.colors.border} bg-black/50 backdrop-blur-md ${theme.colors.accent} text-[9px] uppercase font-bold tracking-widest mb-3`}
                    >
                      Case File: {selectedEvent.id}
                    </span>
                    <h2
                      className={`text-3xl font-black text-white uppercase ${theme.fonts.head} leading-none mb-2`}
                    >
                      {selectedEvent.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-[10px] font-mono text-white/60">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {selectedEvent.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {selectedEvent.venue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10 space-y-8">
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-widest ${theme.colors.accent} mb-3 border-b border-white/10 pb-1`}
                    >
                      Briefing
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed font-light">
                      {selectedEvent.desc}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <h4
                        className={`text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2`}
                      >
                        <Terminal className="w-3 h-3" /> Objectives
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedEvent.details.objectives.map((o, i) => (
                          <li
                            key={i}
                            className="text-xs text-white/70 pl-3 border-l border-white/20"
                          >
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4
                          className={`text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2`}
                        >
                          <Zap className="w-3 h-3" /> Highlights
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedEvent.details.highlights.map((o, i) => (
                            <li
                              key={i}
                              className="text-xs text-white/70 list-disc list-inside marker:text-white/30"
                            >
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4
                          className={`text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2`}
                        >
                          <BarChart3 className="w-3 h-3" /> Impact
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed">
                          {selectedEvent.details.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-widest ${theme.colors.accent} mb-4 border-b border-white/10 pb-1`}
                    >
                      Visual Evidence
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedEvent.photos.map((photo, i) => (
                        <div
                          key={i}
                          className={`aspect-video overflow-hidden border ${theme.colors.border} group relative cursor-pointer`}
                        >
                          <img
                            src={photo}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt="Event evidence"
                          />
                          <div
                            className={`absolute inset-0 bg-${theme.colors.primary} mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer
        className={`py-12 border-t ${theme.colors.border} bg-black/90 relative z-10 overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <div
              className="flex items-center justify-center md:justify-start gap-2 mb-4 group cursor-pointer"
              onClick={() => setView("home")}
            >
              <div
                className={`p-1 border border-${theme.colors.primary} bg-black/50 relative overflow-visible group-hover:scale-110 transition-transform rounded-full box-content`}
              >
                <div className="absolute inset-0 bg-red-600/60 blur-[6px] rounded-full animate-pulse"></div>
                <img
                  src="/hackwithmumbai/hwi_logo.jpg"
                  alt="HWI"
                  className="w-6 h-6 object-contain rounded-full relative z-10 animate-pulse-red-glow"
                />
              </div>
              <span
                className={`text-lg font-black tracking-tighter ${theme.fonts.head}`}
              >
                HACKWITH MUMBAI <span className={theme.colors.accent}>2.0</span>
              </span>
            </div>
            <p
              className={`text-[10px] uppercase tracking-widest ${theme.colors.text} opacity-60 mb-6 leading-relaxed max-w-xs mx-auto md:mx-0`}
            >
              Innovate. Disrupt. Deploy. <br />
              The premier student-led hackathon fostering the next generation of
              tech leaders.
            </p>
            <div
              className={`w-12 h-1 bg-${theme.colors.primary} mx-auto md:mx-0 shadow-[0_0_15px_${theme.colors.primary}] rounded-full`}
            ></div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3
              className={`text-[10px] font-bold uppercase tracking-widest ${theme.colors.accent} mb-4 flex items-center justify-center gap-2`}
            >
              <Activity className="w-3 h-3" /> System Navigation
            </h3>
            <div className="flex flex-col gap-3 text-xs font-mono opacity-70">
              <a
                href="#about"
                className="hover:text-white transition-colors hover:translate-x-1 duration-300 flex items-center justify-center gap-2"
              >
                <span
                  className={`w-1 h-1 bg-${theme.colors.primary} rounded-full`}
                ></span>{" "}
                Mission Brief
              </a>
              <a
                href="#gallery"
                className="hover:text-white transition-colors hover:translate-x-1 duration-300 flex items-center justify-center gap-2"
              >
                <span
                  className={`w-1 h-1 bg-${theme.colors.primary} rounded-full`}
                ></span>{" "}
                Classified Logs
              </a>
              <a
                href="#rulebook"
                className="hover:text-white transition-colors hover:translate-x-1 duration-300 flex items-center justify-center gap-2"
              >
                <span
                  className={`w-1 h-1 bg-${theme.colors.primary} rounded-full`}
                ></span>{" "}
                Protocol Manual
              </a>
            </div>
          </div>

          {/* Communication */}
          <div className="text-center md:text-right">
            <h3
              className={`text-[10px] font-bold uppercase tracking-widest ${theme.colors.accent} mb-4 flex items-center justify-center md:justify-end gap-2`}
            >
              <Wifi className="w-3 h-3" /> Secure Comms
            </h3>
            <div className="flex justify-center md:justify-end gap-4 mb-6">
              {[
                { icon: Instagram, url: "https://instagram.com" },
                { icon: Twitter, url: "https://twitter.com" },
                { icon: Linkedin, url: "https://linkedin.com" },
                { icon: Send, url: "mailto:contact@hackmumbai.in" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group p-2.5 border border-${theme.colors.border} bg-white/5 hover:bg-${theme.colors.primary}/20 transition-all rounded-lg relative overflow-hidden`}
                >
                  <social.icon
                    className={`w-4 h-4 text-${theme.colors.secondary} group-hover:text-white transition-colors relative z-10`}
                  />
                  <div
                    className={`absolute inset-0 bg-${theme.colors.primary} opacity-0 group-hover:opacity-10 transition-opacity`}
                  ></div>
                </a>
              ))}
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 text-[9px] font-mono opacity-50 bg-white/5 py-2 px-4 rounded-full inline-flex mx-auto md:mx-0">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-${theme.colors.primary} animate-pulse shadow-[0_0_5px_${theme.colors.primary}]`}
              ></span>
              <span>SYSTEM STATUS: ONLINE // V2.0.4</span>
            </div>
          </div>
        </div>

        <div
          className={`mt-12 text-center text-[9px] uppercase tracking-widest opacity-30 border-t border-white/5 pt-6 font-mono`}
        >
          © 2026 HackwithMumbai. All rights reserved. // SECURE TRANSMISSION
        </div>
      </footer>

      {/* STYLES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;700;900&family=Rajdhani:wght@500;600;700;900&family=Inter:wght@300;400;600;900&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; letter-spacing: 0.02em; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; letter-spacing: 0.05em; }
        
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan { animation: scan 3s linear infinite; }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #666; }
      `,
        }}
      />
    </div>
  );
}
