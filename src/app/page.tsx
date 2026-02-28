"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { getJobResult, type JobResult } from "@/data/jobs";

type State = "input" | "loading" | "results";

const MSGS = [
  "Scanning job databases...",
  "Analyzing 2,847 AI capabilities...",
  "Cross-referencing automation patents...",
  "Computing your obsolescence...",
  "Preparing emotional damage...",
];

function AnimPct({ target }: { target: number }) {
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { stiffness: 60, damping: 12 });
  const [v, setV] = useState(0);
  useEffect(() => { mv.set(target); }, [target, mv]);
  useEffect(() => { const u = sp.on("change", (n: number) => setV(Math.round(n))); return u; }, [sp]);
  return <>{v}</>;
}

function pctColor(p: number) { return p <= 25 ? "var(--green)" : p <= 50 ? "var(--yellow)" : p <= 75 ? "var(--orange)" : "var(--pink)"; }
function pctEmoji(p: number) { return p <= 25 ? "😎" : p <= 50 ? "😬" : p <= 75 ? "😰" : "💀"; }
function pctLabel(p: number) {
  if (p <= 20) return "You're chilling";
  if (p <= 40) return "Keep one eye open";
  if (p <= 60) return "Sweat mode activated";
  if (p <= 80) return "Resume.pdf time";
  return "F in the chat";
}

const QUICK = ["Developer", "Designer", "Teacher", "Student", "Plumber", "Lawyer", "Chef", "Writer", "Doctor", "Driver"];

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
      `Will AI Replace Me? ${pctEmoji(result.probability)}\n\nJob: ${job}\nProbability: ${result.probability}%\nTimeline: ${result.timeline}\n\nCheck yours → willaireplace.me`
    ).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [job, result]);

  return (
    <main style={{ position: "relative", minHeight: "100vh", zIndex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 20px" }}>
        <AnimatePresence mode="wait">
          {/* INPUT */}
          {state === "input" && (
            <motion.div key="in" style={{ width: "100%", maxWidth: 600, textAlign: "center" }}
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

              <motion.div className="status-pill" style={{ marginBottom: 28 }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
                <span style={{ fontSize: 14 }}>🤖</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Career Risk Assessment</span>
              </motion.div>

              <h1 style={{ fontSize: "clamp(3rem, 9vw, 6rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.05em", color: "var(--dark)" }}>
                Will AI<br />
                <span style={{ color: "var(--orange)" }}>replace</span> you?
              </h1>

              <motion.p style={{ marginTop: 24, fontSize: 17, color: "var(--muted)", maxWidth: 400, margin: "24px auto 0" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                Type your job. Get roasted by the future.
              </motion.p>

              <motion.div style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <input type="text" value={job} onChange={e => setJob(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && go()}
                  placeholder="Software Developer, Nurse, Chef..."
                  className="input-hero" style={{ flex: 1, minWidth: 220 }}
                  autoFocus />
                <button onClick={go} disabled={!job.trim()} className="btn-primary" style={{ fontSize: 16 }}>
                  Scan me →
                </button>
              </motion.div>

              <motion.div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                {QUICK.map(j => (
                  <button key={j} onClick={() => setJob(j)} className="quick-btn">{j}</button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* LOADING */}
          {state === "loading" && (
            <motion.div key="ld" className="card" style={{ width: "100%", maxWidth: 460, padding: 36, textAlign: "center" }}
              initial={{ opacity: 0, scale: 0.95, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>

              <motion.span style={{ fontSize: 48, display: "block" }}
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}>
                🤖
              </motion.span>

              <h2 style={{ marginTop: 16, fontSize: 20, fontWeight: 700, color: "var(--dark)" }}>
                Scanning <span style={{ color: "var(--orange)" }}>{job}</span>
              </h2>
              <motion.p key={msg} style={{ marginTop: 8, fontSize: 14, color: "var(--muted)" }}
                initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}>{msg}</motion.p>

              <div className="progress-track" style={{ marginTop: 24 }}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p style={{ marginTop: 8, textAlign: "right", fontSize: 13, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                {Math.round(progress)}%
              </p>
            </motion.div>
          )}

          {/* RESULTS */}
          {state === "results" && result && (
            <motion.div key="res" style={{ width: "100%", maxWidth: 680 }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

              {/* Big number card */}
              <motion.div className="card" style={{ padding: 40, textAlign: "center", marginBottom: 20 }}
                initial={{ scale: 0.9, rotate: -2 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}>
                <span style={{ fontSize: 48 }}>{pctEmoji(result.probability)}</span>
                <div style={{ marginTop: 12, fontSize: "clamp(5rem, 15vw, 9rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.05em", fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ color: pctColor(result.probability) }}>
                    <AnimPct target={result.probability} />%
                  </span>
                </div>
                <div style={{ marginTop: 12, height: 10, borderRadius: 5, background: "rgba(0,0,0,0.06)", border: "2px solid var(--dark)", overflow: "hidden" }}>
                  <motion.div style={{ height: "100%", background: pctColor(result.probability) }}
                    initial={{ width: 0 }} animate={{ width: `${result.probability}%` }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }} />
                </div>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600 }}>
                  <span style={{ color: pctColor(result.probability) }}>{pctLabel(result.probability)}</span>
                  <span style={{ color: "var(--muted)" }}>{result.timeline}</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 22, fontWeight: 700, textTransform: "capitalize", color: "var(--dark)" }}>{job}</div>
              </motion.div>

              {/* Roast */}
              <motion.div className="card-flat" style={{ padding: 0, marginBottom: 20, overflow: "hidden" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div style={{ padding: "16px 24px", borderBottom: "2px solid var(--dark)", background: "var(--pink)", color: "white", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  🔥 The Roast
                </div>
                <div style={{ padding: 24 }}>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--dark)", fontStyle: "italic" }}>
                    &ldquo;{result.roast}&rdquo;
                  </p>
                </div>
              </motion.div>

              {/* Tips */}
              <motion.div className="card-flat" style={{ padding: 0, marginBottom: 20, overflow: "hidden" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div style={{ padding: "16px 24px", borderBottom: "2px solid var(--dark)", background: "var(--green)", color: "white", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  🛡️ Survival Guide
                </div>
                <div style={{ padding: 24 }}>
                  {result.survivalTips.map((tip, i) => (
                    <motion.div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: i < result.survivalTips.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                      <span style={{ fontSize: 20, lineHeight: 1 }}>→</span>
                      <span style={{ fontSize: 15, color: "var(--dark)", lineHeight: 1.5 }}>{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <button onClick={share} className="btn-secondary" style={{ flex: 1, minWidth: 140 }}>
                  {copied ? "✅ Copied!" : "📋 Share result"}
                </button>
                <button onClick={reset} className="btn-primary" style={{ flex: 1, minWidth: 140 }}>
                  Try another →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer style={{ position: "absolute", bottom: 24 }}>
          <a href="https://x.com/wasss_im" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", fontWeight: 600 }}>
            Built by @wasss_im
          </a>
        </footer>
      </div>
    </main>
  );
}
