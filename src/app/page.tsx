"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { getJobResult, type JobResult } from "@/data/jobs";

const VortexBackground = dynamic(() => import("@/components/VortexBackground"), { ssr: false });

type State = "input" | "loading" | "results";

const MSGS = [
  "Scanning global job databases...",
  "Analyzing 2,847 AI capabilities...",
  "Cross-referencing automation patents...",
  "Computing replacement vectors...",
  "Generating career assessment...",
];

function AnimPct({ target }: { target: number }) {
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { stiffness: 60, damping: 12 });
  const [v, setV] = useState(0);
  useEffect(() => { mv.set(target); }, [target, mv]);
  useEffect(() => { const u = sp.on("change", (n: number) => setV(Math.round(n))); return u; }, [sp]);
  return <>{v}</>;
}

function pctColor(p: number) { return p <= 25 ? "#34d399" : p <= 50 ? "#fbbf24" : p <= 75 ? "#fb923c" : "#f87171"; }
function pctLabel(p: number) {
  if (p <= 20) return "You're safe... for now";
  if (p <= 40) return "Mildly threatened";
  if (p <= 60) return "Getting warm";
  if (p <= 80) return "Update your resume";
  return "Career flatline detected";
}

const QUICK = ["Developer", "Designer", "Teacher", "Student", "Plumber", "Lawyer", "Chef", "Writer"];

export default function Home() {
  const [state, setState] = useState<State>("input");
  const [job, setJob] = useState("");
  const [result, setResult] = useState<JobResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState(MSGS[0]);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const h = decodeURIComponent(window.location.hash.slice(1));
    if (h) { setJob(h); setResult(getJobResult(h)); setState("results"); }
  }, []);

  const go = useCallback(() => {
    const t = job.trim();
    if (!t) return;
    setState("loading"); setProgress(0); setMsg(MSGS[0]);
    let p = 0, mi = 0;
    timer.current = setInterval(() => {
      p += Math.random() * 10 + 5;
      if (p > 100) p = 100;
      setProgress(p);
      const ni = Math.min(Math.floor(p / 20), MSGS.length - 1);
      if (ni !== mi) { mi = ni; setMsg(MSGS[mi]); }
      if (p >= 100) {
        clearInterval(timer.current!);
        setTimeout(() => {
          setResult(getJobResult(t));
          setState("results");
          history.replaceState(null, "", "#" + encodeURIComponent(t.toLowerCase()));
        }, 400);
      }
    }, 150);
  }, [job]);

  const reset = useCallback(() => {
    setState("input"); setJob(""); setResult(null); setCopied(false);
    timer.current && clearInterval(timer.current);
    history.replaceState(null, "", window.location.pathname);
  }, []);

  const share = useCallback(() => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Will AI Replace Me?\n\nJob: ${job}\nProbability: ${result.probability}%\nTimeline: ${result.timeline}\n\n"${result.roast}"\n\nCheck yours: ${window.location.href}`
    ).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [job, result]);

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <VortexBackground intensity={state === "results" ? 1.5 : 1} />

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "48px 20px" }}>
        <AnimatePresence mode="wait">
          {/* INPUT */}
          {state === "input" && (
            <motion.div key="in" style={{ width: "100%", maxWidth: 560, textAlign: "center" }}
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

              <motion.div className="status-pill" style={{ marginBottom: 28 }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>🤖 Career Risk Assessment</span>
              </motion.div>

              <h1 style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                <span style={{ color: "#fafafa" }}>Will </span>
                <span className="grad-text">AI</span>
                <span style={{ color: "#fafafa" }}> replace</span>
                <br />
                <span style={{ color: "#fafafa" }}>your job?</span>
              </h1>

              <motion.p style={{ marginTop: 20, fontSize: 16, color: "rgba(255,255,255,0.3)", maxWidth: 420, margin: "20px auto 0" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                Enter your job title. Get a brutally honest assessment.
              </motion.p>

              <motion.div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <input type="text" value={job} onChange={e => setJob(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && go()}
                    placeholder="e.g. Software Developer, Nurse, Chef..."
                    className="input-hero" style={{ flex: 1, minWidth: 200 }}
                    autoFocus />
                  <button onClick={go} disabled={!job.trim()} className="btn-primary btn-hero">
                    Analyze →
                  </button>
                </div>
              </motion.div>

              <motion.div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                {QUICK.map(j => (
                  <button key={j} onClick={() => setJob(j)} className="quick-btn">{j}</button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* LOADING */}
          {state === "loading" && (
            <motion.div key="ld" className="glass-strong" style={{ width: "100%", maxWidth: 440, borderRadius: 24, padding: 32, textAlign: "center" }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>

              <motion.div style={{ width: 48, height: 48, margin: "0 auto 20px" }}
                animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
                  <path d="M22 12A10 10 0 0 0 12 2" stroke="url(#g)" strokeWidth="1.5" strokeLinecap="round"/>
                  <defs><linearGradient id="g" x1="22" y1="12" x2="12" y2="2"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#ec4899"/></linearGradient></defs>
                </svg>
              </motion.div>

              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fafafa" }}>
                Analyzing <span className="grad-text">{job}</span>
              </h2>
              <motion.p key={msg} style={{ marginTop: 8, fontSize: 14, color: "rgba(255,255,255,0.25)" }}
                initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}>{msg}</motion.p>

              <div className="progress-track" style={{ marginTop: 24 }}>
                <div className="progress-fill" style={{ width: `${progress}%`, transition: "width 0.15s" }} />
              </div>
              <p style={{ marginTop: 8, textAlign: "right", fontSize: 10, color: "rgba(255,255,255,0.12)", fontVariantNumeric: "tabular-nums" }}>
                {Math.round(progress)}%
              </p>
            </motion.div>
          )}

          {/* RESULTS */}
          {state === "results" && result && (
            <motion.div key="res" className="glass-strong" style={{ width: "100%", maxWidth: 680, borderRadius: 24, overflow: "hidden" }}
              initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

              {/* Header */}
              <div className="result-header">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div className="field-label" style={{ marginBottom: 4 }}>Analysis complete</div>
                    <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 700, color: "#fafafa", textTransform: "capitalize" }}>{job}</h2>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontWeight: 900, color: pctColor(result.probability), fontVariantNumeric: "tabular-nums" }}>
                      <AnimPct target={result.probability} /><span style={{ fontSize: "0.5em" }}>%</span>
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 16, height: 6, width: "100%", borderRadius: 3, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", borderRadius: 3, backgroundColor: pctColor(result.probability) }}
                    initial={{ width: 0 }} animate={{ width: `${result.probability}%` }}
                    transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }} />
                </div>
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: pctColor(result.probability) }}>{pctLabel(result.probability)}</span>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>Timeline: {result.timeline}</span>
                </div>
              </div>

              <div className="result-body" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {/* Roast */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <div className="field-label">The Roast</div>
                  <div className="roast-box">
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                      &ldquo;{result.roast}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* Tips */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <div className="field-label">Survival Guide</div>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {result.survivalTips.map((tip, i) => (
                      <motion.li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, color: "rgba(255,255,255,0.4)" }}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: pctColor(result.probability), marginTop: 7, flexShrink: 0 }} />
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Actions */}
                <motion.div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 8 }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  <button onClick={share} className="btn-secondary" style={{ flex: 1, minWidth: 140 }}>
                    {copied ? "✅ Copied!" : "📋 Share"}
                  </button>
                  <button onClick={reset} className="btn-primary" style={{ flex: 1, minWidth: 140 }}>
                    Try another job →
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer style={{ position: "absolute", bottom: 24 }}>
          <a href="https://x.com/wasss_im" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.08)", textDecoration: "none" }}>
            Built by @wasss_im
          </a>
        </footer>
      </div>
    </main>
  );
}
