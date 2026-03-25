// App.jsx — Code or Crash React App
// Screens: intro → game → endscreen
// Depends on: styles.css, questions.js, utils.js

import { useState, useEffect, useRef, useCallback } from "react";
import { QUESTIONS } from "./questions.js";
import { shuffle, calcScore, getGrade, calcAccuracy, shuffleOptions } from "./utils.js";
import "./styles.css";

const TOTAL_TIME = 20;
const CIRCUMFERENCE = 157;

/* ──────────────────────────────────────────────────
   Sub-components
────────────────────────────────────────────────── */

function Scanlines() {
  return <div className="scanlines" aria-hidden="true" />;
}

function CrashOverlay({ flash }) {
  return (
    <div className={`crash-overlay${flash ? " flash" : ""}`} aria-hidden="true">
      💥 CRASH!
    </div>
  );
}

function AppMockup() {
  const bars = [
    { label: "BACKEND",    pct: 92, color: "green"  },
    { label: "DATABASE",   pct: 65, color: "yellow" },
    { label: "UI LAYER",   pct: 88, color: "green"  },
    { label: "API GATEWAY",pct: 30, color: "red"    },
  ];
  return (
    <div className="app-mockup">
      <div className="mockup-header">
        <span className="traffic-dot red"   />
        <span className="traffic-dot yellow"/>
        <span className="traffic-dot green" />
        <span className="mockup-title">PRODUCTION — APP STATUS MONITOR</span>
      </div>
      <div className="health-bars">
        {bars.map(({ label, pct, color }) => (
          <div className="hb-row" key={label}>
            <span className="hb-label">{label}</span>
            <div className="hb-track">
              <div className={`hb-fill ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="hb-pct">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen">
      <div className="logo-wrap">
        <div className="logo">CODE OR CRASH 💥</div>
        <div className="tagline">// SDLC Quiz Challenge — Medium Difficulty</div>
      </div>

      <AppMockup />

      <div className="intro-stats">
        <div className="stat-card"><div className="stat-val">15</div><div className="stat-label">Questions</div></div>
        <div className="stat-card"><div className="stat-val">3</div><div className="stat-label">Lives</div></div>
        <div className="stat-card"><div className="stat-val">20s</div><div className="stat-label">Per Q</div></div>
      </div>

      <div className="intro-desc">
        Your app is <span className="warn-text">barely holding together</span>. Answer SDLC questions correctly
        to keep it alive. Wrong answers drain health — let it hit 0 and it{" "}
        <span className="danger-text">CRASHES</span>. 3 lives · 20 seconds each · speed bonuses. Good luck.
      </div>

      <button className="btn btn-primary" onClick={onStart}>
        ⚡ BOOT THE APP
      </button>
    </div>
  );
}

function Timer({ timeLeft, panic }) {
  const offset = CIRCUMFERENCE * (1 - timeLeft / TOTAL_TIME);
  const ringClass = timeLeft <= 5 ? "danger-ring" : timeLeft <= 10 ? "warn-ring" : "";
  const numClass  = timeLeft <= 5 ? "danger-num"  : timeLeft <= 10 ? "warn-num"  : "";

  return (
    <div className={`timer-wrap${panic ? " panic" : ""}`} data-testid="timer-wrap">
      <svg className="timer-svg" viewBox="0 0 58 58" width="58" height="58">
        <circle className="timer-track" cx="29" cy="29" r="25" />
        <circle
          className={`timer-ring${ringClass ? " " + ringClass : ""}`}
          cx="29" cy="29" r="25"
          style={{ strokeDashoffset: offset }}
          data-testid="timer-ring"
        />
      </svg>
      <div className={`timer-num${numClass ? " " + numClass : ""}`} data-testid="timer-num">
        {timeLeft}
      </div>
    </div>
  );
}

function HUD({ lives, score, qIdx, total, timeLeft, timerPanic }) {
  return (
    <div className="hud">
      <div className="hud-lives" data-testid="hud-lives">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`life-dot${i >= lives ? " lost" : ""}`} data-testid="life-dot" />
        ))}
      </div>
      <span className="hud-q" data-testid="q-counter">Q {qIdx + 1} / {total}</span>
      <Timer timeLeft={timeLeft} panic={timerPanic} />
      <div className="hud-score" data-testid="score-display">{score} PTS</div>
    </div>
  );
}

function AppHealth({ health }) {
  const fillClass = health <= 30 ? "crit-health" : health <= 60 ? "warn-health" : "";
  return (
    <div className="app-health">
      <div className="ah-label">
        <span>APP HEALTH</span>
        <span data-testid="health-pct">{health}%</span>
      </div>
      <div className="ah-track">
        <div
          className={`ah-fill${fillClass ? " " + fillClass : ""}`}
          style={{ width: `${health}%` }}
          data-testid="health-bar"
        />
      </div>
    </div>
  );
}

function OptionButton({ label, text, isCorrect, revealed, onClick }) {
  const cls = revealed
    ? isCorrect ? "opt-btn correct" : "opt-btn wrong"
    : "opt-btn";
  return (
    <button
      className={cls}
      disabled={revealed}
      onClick={onClick}
      data-testid="opt-btn"
      data-correct={isCorrect}
    >
      <span className="opt-key">[{label}]</span>
      {text}
    </button>
  );
}

function QuestionCard({ question, shuffledOpts, shuffledIndices, onAnswer, shaking }) {
  const [revealed, setRevealed] = useState(null); // index of clicked option

  function handleClick(displayIdx) {
    if (revealed !== null) return;
    const origIdx = shuffledIndices[displayIdx];
    const correct = origIdx === question.ans;
    setRevealed(displayIdx);
    onAnswer(correct);
  }

  const keys = ["A", "B", "C", "D"];

  return (
    <div className={`q-card${shaking ? " shake" : ""}`} data-testid="q-card">
      <div className="q-topic" data-testid="q-topic">// {question.topic}</div>
      <div className="q-text"  data-testid="q-text">{question.q}</div>
      <div className="options">
        {shuffledOpts.map((text, i) => {
          const origIdx = shuffledIndices[i];
          const isCorrect = origIdx === question.ans;
          const isRevealed = revealed !== null;
          const showCorrect = isRevealed && isCorrect;
          const showWrong   = isRevealed && i === revealed && !isCorrect;
          return (
            <button
              key={i}
              className={`opt-btn${showCorrect ? " correct" : showWrong ? " wrong" : ""}`}
              disabled={isRevealed}
              onClick={() => handleClick(i)}
              data-testid="opt-btn"
              data-is-correct={isCorrect}
            >
              <span className="opt-key">[{keys[i]}]</span>
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Feedback({ ok, message }) {
  if (!message) return null;
  return (
    <div className={`feedback ${ok ? "correct-fb" : "wrong-fb"}`} data-testid="feedback">
      {message}
    </div>
  );
}

function GameScreen({ onEnd }) {
  const [questions]       = useState(() => shuffle(QUESTIONS));
  const [qIdx, setQIdx]   = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [health, setHealth] = useState(100);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [timerPanic, setTimerPanic] = useState(false);
  const [shaking, setShaking]       = useState(false);
  const [flashCrash, setFlashCrash] = useState(false);
  const [feedback, setFeedback]     = useState({ ok: false, message: "" });
  const [showNext, setShowNext]     = useState(false);
  const [opts, setOpts]             = useState(null);

  const timerRef  = useRef(null);
  const livesRef  = useRef(lives);
  const answeredRef = useRef(answered);

  livesRef.current   = lives;
  answeredRef.current = answered;

  const q = questions[qIdx];

  // Shuffle options each new question
  useEffect(() => {
    const { shuffledOpts, shuffledIndices } = shuffleOptions(q.opts);
    setOpts({ shuffledOpts, shuffledIndices });
    setAnswered(false);
    setTimeLeft(TOTAL_TIME);
    setTimerPanic(false);
    setShaking(false);
    setFeedback({ ok: false, message: "" });
    setShowNext(false);
  }, [qIdx]);

  // Timer countdown
  useEffect(() => {
    if (answeredRef.current) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next <= 5 && next > 0) setTimerPanic(true);
        if (next <= 0) {
          clearInterval(timerRef.current);
          setTimerPanic(false);
          if (!answeredRef.current) handleTimeout();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qIdx]);

  function handleTimeout() {
    setAnswered(true);
    setFeedback({ ok: false, message: `⏱ TIME'S UP! ${q.explain}` });
    setShowNext(true);
    applyPenalty();
  }

  function handleAnswer(isCorrect) {
    clearInterval(timerRef.current);
    setTimerPanic(false);
    setAnswered(true);
    setShowNext(true);

    if (isCorrect) {
      setTimeLeft(prev => {
        const bonus = prev;
        const pts = calcScore(bonus);
        setScore(s => s + pts);
        setCorrect(c => c + 1);
        setFeedback({ ok: true, message: `✓ CORRECT! +${pts} pts — ${q.explain}` });
        return prev;
      });
    } else {
      setFeedback({ ok: false, message: `✗ WRONG — ${q.explain}` });
      applyPenalty();
    }
  }

  function applyPenalty() {
    const newLives = livesRef.current - 1;
    setLives(newLives);
    setHealth(h => Math.max(0, h - Math.ceil(100 / 3)));
    setFlashCrash(true);
    setTimeout(() => setFlashCrash(false), 700);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
    if (newLives <= 0) {
      setTimeout(() => onEnd({ crashed: true }), 1200);
    }
  }

  function nextQuestion() {
    if (qIdx + 1 >= questions.length) {
      onEnd({ crashed: false });
    } else {
      setQIdx(i => i + 1);
    }
  }

  // Pass score/correct out via onEnd
  function doEnd(opts) {
    onEnd({ ...opts, score, correct, total: qIdx + 1 });
  }

  if (!opts) return null;

  return (
    <>
      <CrashOverlay flash={flashCrash} />
      <div className="game-screen">
        <HUD
          lives={lives} score={score}
          qIdx={qIdx} total={questions.length}
          timeLeft={timeLeft} timerPanic={timerPanic}
        />
        <AppHealth health={health} />
        <QuestionCard
          question={q}
          shuffledOpts={opts.shuffledOpts}
          shuffledIndices={opts.shuffledIndices}
          onAnswer={handleAnswer}
          shaking={shaking}
        />
        <Feedback ok={feedback.ok} message={feedback.message} />
        <div className="next-btn-wrap">
          {showNext && (
            <button className="btn btn-ghost" onClick={nextQuestion} data-testid="next-btn">
              NEXT →
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function EndScreen({ result, onRestart, onMenu }) {
  const { crashed, score, correct, total } = result;
  const accuracy = calcAccuracy(correct, total);
  const { grade, cls } = getGrade(accuracy);

  return (
    <div className="end-screen" data-testid="end-screen">
      <div className={`end-title ${crashed ? "lose" : "win"}`} data-testid="end-title">
        {crashed ? "APP CRASHED 💀" : "APP DEPLOYED ✅"}
      </div>
      <div className="end-sub">
        {crashed ? "// system failure — reboot required" : "// all systems nominal"}
      </div>
      <div className={`end-grade ${cls}`} data-testid="end-grade">{grade}</div>
      <div className="end-stats">
        <div className="end-card"><div className="end-val" data-testid="e-score">{score}</div><div className="end-lbl">Score</div></div>
        <div className="end-card"><div className="end-val" data-testid="e-correct">{correct}/{total}</div><div className="end-lbl">Correct</div></div>
        <div className="end-card"><div className="end-val" data-testid="e-accuracy">{accuracy}%</div><div className="end-lbl">Accuracy</div></div>
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={onRestart} data-testid="btn-reboot">REBOOT</button>
        <button className="btn btn-ghost"   onClick={onMenu}    data-testid="btn-menu">MAIN MENU</button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   Root App
────────────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState("intro"); // "intro" | "game" | "end"
  const [result, setResult] = useState(null);

  function handleGameEnd(res) {
    setResult(res);
    setScreen("end");
  }

  return (
    <>
      <Scanlines />
      <div className="app-wrapper">
        {screen === "intro" && (
          <IntroScreen onStart={() => setScreen("game")} />
        )}
        {screen === "game" && (
          <GameScreen key={Date.now()} onEnd={handleGameEnd} />
        )}
        {screen === "end" && result && (
          <EndScreen
            result={result}
            onRestart={() => setScreen("game")}
            onMenu={() => setScreen("intro")}
          />
        )}
      </div>
    </>
  );
}
