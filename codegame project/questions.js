// questions.js — SDLC Quiz Question Bank
// Each question: { topic, q, opts[4], ans (0-indexed correct), explain }

export const QUESTIONS = [
  {
    topic: "SDLC Phases",
    q: "Which SDLC phase involves gathering and documenting stakeholder needs before any design begins?",
    opts: ["System Design", "Requirements Analysis", "Testing", "Deployment"],
    ans: 1,
    explain: "Requirements Analysis is where stakeholders' needs are collected and documented before any design or coding starts."
  },
  {
    topic: "Waterfall Model",
    q: "In the Waterfall model, what is the primary characteristic that distinguishes it from iterative models?",
    opts: ["Phases overlap frequently", "Each phase must be completed before the next begins", "Testing occurs before coding", "Customer feedback is continuous"],
    ans: 1,
    explain: "Waterfall is strictly sequential — each phase must finish before the next starts, with no going back."
  },
  {
    topic: "Agile Methodology",
    q: "In Agile, a 'sprint' is best described as:",
    opts: ["A final deployment push", "A short time-boxed iteration to deliver working software", "A type of code review", "A performance benchmark"],
    ans: 1,
    explain: "A sprint is a fixed, short period (usually 1–4 weeks) during which a Scrum team works to complete a defined set of tasks."
  },
  {
    topic: "Software Process Models",
    q: "The Spiral Model combines which two approaches?",
    opts: ["Waterfall and Agile", "RAD and XP", "Waterfall and Prototyping (with risk analysis)", "V-Model and Kanban"],
    ans: 2,
    explain: "The Spiral Model combines Waterfall's structured phases with iterative prototyping, adding explicit risk analysis at each cycle."
  },
  {
    topic: "Feasibility Study",
    q: "A feasibility study conducted during the early SDLC phase would NOT typically include:",
    opts: ["Technical feasibility", "Economic feasibility", "User acceptance testing", "Operational feasibility"],
    ans: 2,
    explain: "User acceptance testing (UAT) happens late in the SDLC. Feasibility studies examine technical, economic, legal, and operational viability."
  },
  {
    topic: "V-Model",
    q: "In the V-Model (Verification & Validation), unit testing corresponds directly to which development phase?",
    opts: ["Requirements Analysis", "System Design", "High-level Design", "Detailed Design / Coding"],
    ans: 3,
    explain: "In the V-Model, unit testing maps to the detailed design and coding phase."
  },
  {
    topic: "Prototyping",
    q: "Which type of prototype is built quickly, used for early feedback, and then discarded?",
    opts: ["Evolutionary prototype", "Incremental prototype", "Throwaway / Rapid prototype", "High-fidelity prototype"],
    ans: 2,
    explain: "A throwaway (rapid) prototype is built fast to explore requirements. Once its purpose is served, it's discarded."
  },
  {
    topic: "Agile vs Waterfall",
    q: "A client frequently changes requirements mid-project. Which model is MOST appropriate?",
    opts: ["Classic Waterfall", "Agile / Scrum", "Big Bang Model", "V-Model"],
    ans: 1,
    explain: "Agile embraces changing requirements through iterative sprints and regular client feedback."
  },
  {
    topic: "RAD Model",
    q: "RAD (Rapid Application Development) achieves faster development primarily through:",
    opts: ["Skipping the testing phase", "Minimal documentation only", "Component reuse and parallel development by teams", "Using only one developer"],
    ans: 2,
    explain: "RAD speeds up development by reusing components and having multiple teams work in parallel."
  },
  {
    topic: "Incremental Model",
    q: "In the Incremental Model, the system is:",
    opts: ["Built entirely before testing begins", "Delivered as a single release after full development", "Delivered in parts (increments), each adding functionality", "Developed only after full requirements freeze"],
    ans: 2,
    explain: "The Incremental Model delivers the system in small functional chunks, each adding more features."
  },
  {
    topic: "SDLC — Maintenance",
    q: "Which type of software maintenance involves fixing bugs discovered after deployment?",
    opts: ["Adaptive maintenance", "Perfective maintenance", "Corrective maintenance", "Preventive maintenance"],
    ans: 2,
    explain: "Corrective maintenance addresses defects and bugs found after the software goes live."
  },
  {
    topic: "Requirements Engineering",
    q: "A non-functional requirement would be:",
    opts: ["The system shall allow users to log in", "The system shall process 1000 requests per second", "The system shall display a dashboard", "The system shall generate monthly reports"],
    ans: 1,
    explain: "Non-functional requirements define HOW the system performs (performance, security, scalability)."
  },
  {
    topic: "Risk Management",
    q: "In SDLC, risk management is MOST emphasized in which model?",
    opts: ["Waterfall", "Big Bang", "Spiral Model", "RAD"],
    ans: 2,
    explain: "The Spiral Model explicitly incorporates risk analysis and mitigation as a core part of every cycle."
  },
  {
    topic: "DevOps & SDLC",
    q: "DevOps primarily aims to bridge the gap between:",
    opts: ["Managers and developers", "Frontend and backend teams", "Development and Operations teams", "Testers and designers"],
    ans: 2,
    explain: "DevOps integrates Development and Operations teams to enable continuous delivery and collaborative feedback."
  },
  {
    topic: "Software Quality",
    q: "Which SDLC activity ensures the product meets requirements (did we build the RIGHT thing)?",
    opts: ["Verification", "Validation", "Unit Testing", "Code Review"],
    ans: 1,
    explain: "Validation asks 'Did we build the right product?' Verification asks 'Did we build the product right?'"
  }
];
