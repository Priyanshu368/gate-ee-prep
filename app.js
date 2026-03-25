/* ═══════════════════════════════════════════════
   GATE EE 2027 — app.js
   All data + logic + Netlify Identity
═══════════════════════════════════════════════ */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SUBJECTS = [
  { name: "Engineering Mathematics", marks: "13-15", priority: "★★★★★", phase: "1-2", hrs: 120, color: "#27ae60" },
  { name: "Network Theory",           marks: "10-12", priority: "★★★★★", phase: "1-2", hrs: 110, color: "#27ae60" },
  { name: "Electrical Machines",      marks: "8-10",  priority: "★★★★★", phase: "2",   hrs: 120, color: "#2e86ab" },
  { name: "Power Systems",            marks: "8-10",  priority: "★★★★",  phase: "2-3", hrs: 100, color: "#2e86ab" },
  { name: "Control Systems",          marks: "8-9",   priority: "★★★★",  phase: "2-3", hrs: 90,  color: "#2e86ab" },
  { name: "Signals & Systems",        marks: "7-9",   priority: "★★★★",  phase: "1-2", hrs: 80,  color: "#27ae60" },
  { name: "Analog Electronics",       marks: "5-7",   priority: "★★★",   phase: "3",   hrs: 70,  color: "#e67e22" },
  { name: "Digital Electronics",      marks: "4-6",   priority: "★★★",   phase: "3",   hrs: 60,  color: "#e67e22" },
  { name: "Electromagnetic Theory",   marks: "4-6",   priority: "★★★",   phase: "3",   hrs: 60,  color: "#e67e22" },
  { name: "Power Electronics",        marks: "4-6",   priority: "★★★",   phase: "3",   hrs: 60,  color: "#e67e22" },
  { name: "Measurements",             marks: "3-5",   priority: "★★",    phase: "3",   hrs: 50,  color: "#e74c3c" },
  { name: "General Aptitude",         marks: "15",    priority: "★★★",   phase: "All", hrs: 80,  color: "#8e44ad" },
];

const MONTHS = [
  {
    name: "Month 1 — April 2025", phase: "phase1", phaseLabel: "PHASE 1: FOUNDATION", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "Linear Algebra — Matrices, Determinants, Rank, Systems of equations" },
      { w: "Week 2", t: "Eigenvalues, Eigenvectors, Cayley-Hamilton theorem + 20 PYQs" },
      { w: "Week 3", t: "Calculus — Differentiation, Integration, Taylor Series, Partial Derivatives" },
      { w: "Week 4", t: "ODEs (1st & 2nd order) + Vector Calculus (Gradient, Divergence, Curl, Stokes' theorem)" },
    ]
  },
  {
    name: "Month 2 — May 2025", phase: "phase1", phaseLabel: "PHASE 1: FOUNDATION", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "Complex Analysis — Cauchy's theorem, Laurent Series, Residue theorem" },
      { w: "Week 2", t: "Probability, Statistics, Numerical Methods + 30 Maths PYQs" },
      { w: "Week 3", t: "Network Theory — KVL, KCL, Nodal Analysis, Mesh Analysis, Thevenin, Norton" },
      { w: "Week 4", t: "Superposition, Max Power Transfer, Two-Port Networks + 25 Network PYQs" },
    ]
  },
  {
    name: "Month 3 — June 2025", phase: "phase1", phaseLabel: "PHASE 1: FOUNDATION", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "Signals: Classification, Fourier Series, Continuous Fourier Transform" },
      { w: "Week 2", t: "Laplace Transform, Transfer Functions, Sampling Theorem — 25 PYQs" },
      { w: "Week 3", t: "Z-Transform, DFT, DTFT + Convolution theorems" },
      { w: "Week 4", t: "Network: Resonance, Transients (RL, RC, RLC), Graph Theory of Networks" },
    ]
  },
  {
    name: "Month 4 — July 2025", phase: "phase2", phaseLabel: "PHASE 2: CORE EE", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "DC Machines — Generator construction, EMF equation, Characteristics" },
      { w: "Week 2", t: "DC Motors, Starters, Speed Control + Transformers (OC & SC tests, Efficiency, Regulation)" },
      { w: "Week 3", t: "Induction Motor — Slip, Torque-speed curve, Equivalent circuit + Synchronous Machines" },
      { w: "Week 4", t: "Control Systems — Transfer Functions, Block Diagrams, Signal Flow Graphs, Mason's Rule" },
    ]
  },
  {
    name: "Month 5 — August 2025", phase: "phase2", phaseLabel: "PHASE 2: CORE EE", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "Control — Root Locus, Bode Plot, Nyquist Criterion (sketch 10 plots daily)" },
      { w: "Week 2", t: "Control — State Space Representation, Routh-Hurwitz Stability + 30 Control PYQs" },
      { w: "Week 3", t: "Power Systems — Transmission Lines, ABCD parameters, Short/Medium/Long line models" },
      { w: "Week 4", t: "Power Systems — Per-Unit System, Load Flow (Gauss-Seidel, Newton-Raphson), Bus matrices" },
    ]
  },
  {
    name: "Month 6 — September 2025", phase: "phase3", phaseLabel: "PHASE 3: ADVANCED", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "Analog Electronics — Diodes, BJT, MOSFET, Amplifiers, Frequency Response, Op-Amps" },
      { w: "Week 2", t: "Digital Electronics — Boolean Algebra, Logic Gates, Flip-Flops, Counters, ADC/DAC" },
      { w: "Week 3", t: "Electromagnetic Theory — Electrostatics, Magnetostatics, Maxwell's Equations, Wave Propagation" },
      { w: "Week 4", t: "Power Electronics (Rectifiers, Choppers, Inverters) + Measurements & Instrumentation" },
    ]
  },
  {
    name: "Month 7 — October 2025", phase: "phase4", phaseLabel: "PHASE 4: REVISION", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "Revise Engg Maths + Network Theory — Formula sheets + 40 PYQs each (timed)" },
      { w: "Week 2", t: "Revise Signals & Systems + Control Systems — 40 PYQs each (identify weak areas)" },
      { w: "Week 3", t: "Revise Electrical Machines + Power Systems — 50 PYQs combined (target full accuracy)" },
      { w: "Week 4", t: "MOCK TEST #1, #2, #3 — 3 hrs test + 3 hrs deep analysis. Identify ALL mistakes." },
    ]
  },
  {
    name: "Month 8 — November 2025", phase: "phase4", phaseLabel: "PHASE 4: FINAL SPRINT", hrs: "~180 hrs",
    weeks: [
      { w: "Week 1", t: "GATE PYQ 2020 & 2021 — Full timed papers + same-day error review" },
      { w: "Week 2", t: "GATE PYQ 2022 & 2023 + Mock Test #4, #5 — Time management drills" },
      { w: "Week 3", t: "GATE PYQ 2024 + Mock Test #6, #7 + Daily Aptitude sprint (30 min minimum)" },
      { w: "Week 4", t: "Formula sheets ONLY. Rest well. Sleep 8 hrs. NO NEW TOPICS. Stay calm. 🧘" },
    ]
  },
];

const MOCK_TESTS = [
  { name: "PYQ 2018", type: "pyq" }, { name: "PYQ 2019", type: "pyq" },
  { name: "PYQ 2020", type: "pyq" }, { name: "PYQ 2021", type: "pyq" },
  { name: "PYQ 2022", type: "pyq" }, { name: "PYQ 2023", type: "pyq" },
  { name: "PYQ 2024", type: "pyq" },
  { name: "Mock Test #1", type: "mock" }, { name: "Mock Test #2", type: "mock" },
  { name: "Mock Test #3", type: "mock" }, { name: "Mock Test #4", type: "mock" },
  { name: "Mock Test #5", type: "mock" }, { name: "Mock Test #6", type: "mock" },
  { name: "Mock Test #7", type: "mock" }, { name: "Mock Test #8", type: "mock" },
];

const FORMULAS = [
  { subj: "Engineering Mathematics", name: "Euler's Formula",       eq: "e^(jθ) = cos(θ) + j·sin(θ)",                     note: "Foundation of phasor analysis and Fourier transforms" },
  { subj: "Engineering Mathematics", name: "Eigenvalue Condition",   eq: "det(A − λI) = 0",                                note: "Solve characteristic equation for eigenvalues λ" },
  { subj: "Engineering Mathematics", name: "Laplace Transform",      eq: "L{f(t)} = ∫₀^∞ f(t)·e^(−st) dt",               note: "Used in circuit and control system analysis" },
  { subj: "Engineering Mathematics", name: "Fourier Transform",      eq: "F(jω) = ∫₋∞^∞ f(t)·e^(−jωt) dt",              note: "Frequency domain representation of a signal" },
  { subj: "Engineering Mathematics", name: "Bayes' Theorem",         eq: "P(A|B) = P(B|A)·P(A) / P(B)",                   note: "Conditional probability — appears in GATE Maths" },
  { subj: "Engineering Mathematics", name: "Taylor Series",          eq: "f(x) = f(a) + f'(a)(x−a) + f''(a)(x−a)²/2! + …", note: "Expand functions around a point" },
  { subj: "Network Theory",          name: "Thevenin's Theorem",     eq: "V_th = V_oc;  R_th = V_oc / I_sc",              note: "Simplify any linear 2-terminal network" },
  { subj: "Network Theory",          name: "Max Power Transfer",     eq: "R_L = R_th  ⟹  P_max = V_th² / (4·R_th)",      note: "Max power when load resistance equals source resistance" },
  { subj: "Network Theory",          name: "Two-Port Z-Parameters",  eq: "V₁=Z₁₁·I₁+Z₁₂·I₂;  V₂=Z₂₁·I₁+Z₂₂·I₂",      note: "Find Z₁₁ by open-circuiting port 2" },
  { subj: "Network Theory",          name: "Resonant Frequency",     eq: "ω₀ = 1/√(LC);  Q = ω₀L/R = 1/(ω₀CR)",        note: "Z is purely resistive at resonance; Q = quality factor" },
  { subj: "Network Theory",          name: "Superposition Theorem",  eq: "Response = Sum of individual source responses",  note: "Apply one source at a time; deactivate others" },
  { subj: "Electrical Machines",     name: "DC Generator EMF",       eq: "E = (P·φ·N·Z) / (60·A)",                        note: "P=poles, Z=conductors, A=parallel paths, N=rpm" },
  { subj: "Electrical Machines",     name: "Transformer EMF",        eq: "E = 4.44·f·N·φ_max",                            note: "RMS EMF; 4.44 = 2π/√2 = Form factor × √2" },
  { subj: "Electrical Machines",     name: "Induction Motor Slip",   eq: "s = (Ns − N)/Ns;  Ns = 120·f/P",               note: "Synchronous speed vs actual rotor speed" },
  { subj: "Electrical Machines",     name: "IM Torque Equation",     eq: "T = (3/ωs)·I₂²·(R₂/s);  T_max at s=R₂/X₂",   note: "Max torque independent of rotor resistance" },
  { subj: "Electrical Machines",     name: "Transformer Efficiency", eq: "η = P_out/(P_out + P_core + P_cu)",             note: "Max η when copper loss = core loss (I²R₂ = P₀)" },
  { subj: "Electrical Machines",     name: "Voltage Regulation",     eq: "VR = (V_NL − V_FL) / V_FL × 100%",             note: "Ideal transformer: VR = 0%" },
  { subj: "Control Systems",         name: "Characteristic Equation", eq: "1 + G(s)·H(s) = 0",                            note: "Roots of this equation = closed-loop poles" },
  { subj: "Control Systems",         name: "Routh-Hurwitz Stability", eq: "No sign change in 1st column of Routh array",  note: "Count sign changes = number of RHP poles" },
  { subj: "Control Systems",         name: "Phase Margin",           eq: "PM = 180° + ∠G(jω_gc)  where |G(jω_gc)|=1",  note: "PM > 0° → stable; PM > 45° → good stability" },
  { subj: "Control Systems",         name: "Gain Margin",            eq: "GM = 1/|G(jω_pc)|  where ∠G(jω_pc)=−180°",   note: "GM > 0 dB → stable system" },
  { subj: "Control Systems",         name: "State Space Form",       eq: "ẋ = Ax + Bu;  y = Cx + Du",                    note: "Controllable if rank[B AB A²B…]=n" },
  { subj: "Control Systems",         name: "Steady State Error",     eq: "e_ss = lim s→0 [s·E(s)] = R/(1+K_p)",         note: "Depends on system type and input type" },
  { subj: "Power Systems",           name: "Per Unit Value",         eq: "PU = Actual Value / Base Value",                note: "Simplifies analysis of multi-voltage systems" },
  { subj: "Power Systems",           name: "ABCD Parameters",        eq: "V₁=A·V₂−B·I₂;  I₁=C·V₂−D·I₂",              note: "AD − BC = 1 for passive symmetrical networks" },
  { subj: "Power Systems",           name: "Power Flow (Lossless)",  eq: "P = (Vs·Vr·sin δ) / X",                        note: "δ = power angle; max P at δ = 90°" },
  { subj: "Power Systems",           name: "Fault Current (3-phase)", eq: "I_f = V_pre-fault / Z₁",                      note: "Use sequence networks for unsymmetrical faults" },
  { subj: "Signals & Systems",       name: "Nyquist Sampling Rate",  eq: "fs ≥ 2·f_max  (Shannon's theorem)",            note: "Aliasing occurs if fs < 2·f_max" },
  { subj: "Signals & Systems",       name: "Convolution (Continuous)", eq: "y(t) = x(t)*h(t) = ∫ x(τ)·h(t−τ) dτ",     note: "LTI system output for any input" },
  { subj: "Signals & Systems",       name: "Parseval's Theorem",     eq: "∫|x(t)|²dt = (1/2π)·∫|X(jω)|²dω",           note: "Total energy same in time and frequency domain" },
  { subj: "Analog Electronics",      name: "BJT Transconductance",   eq: "gm = IC/VT;  VT ≈ 26 mV at 300 K",           note: "gm links input voltage to output current" },
  { subj: "Analog Electronics",      name: "Inverting Op-Amp Gain",  eq: "Av = −Rf/Rin",                                 note: "Virtual ground at inverting (−) terminal" },
  { subj: "Analog Electronics",      name: "MOSFET Drain Current",   eq: "ID = (μn·Cox·W/2L)·(VGS−Vth)²",              note: "Valid in saturation region (pinch-off)" },
  { subj: "Digital Electronics",     name: "De Morgan's Theorems",   eq: "(A·B)' = A'+B';  (A+B)' = A'·B'",            note: "Essential for NAND/NOR logic conversions" },
  { subj: "Digital Electronics",     name: "Binary to Decimal",      eq: "D = Σ bᵢ × 2ⁱ  (from LSB to MSB)",           note: "Example: 1011₂ = 8+0+2+1 = 11₁₀" },
  { subj: "Electromagnetic Theory",  name: "Faraday's Law (Maxwell)", eq: "∇ × E = −∂B/∂t",                             note: "Changing magnetic field induces electric field" },
  { subj: "Electromagnetic Theory",  name: "Poynting Vector",        eq: "P = E × H  (W/m²)",                            note: "Electromagnetic power flow density" },
  { subj: "Electromagnetic Theory",  name: "Wave Equation",          eq: "∇²E = με·∂²E/∂t²;  v = 1/√(με)",            note: "Speed of EM wave in medium" },
];

const RESOURCES = [
  { icon: "📖", title: "Engineering Mathematics",   desc: "B.S. Grewal — Higher Engineering Mathematics. Follow with NPTEL video lectures for Laplace & Fourier. Essential for 15 marks.", tags: ["Book", "NPTEL", "Priority: HIGH"] },
  { icon: "🔌", title: "Network Theory",             desc: "Hayt & Kemmerly — Engineering Circuit Analysis. ACE Academy notes for quick revision. Strong overlap with Control Systems.", tags: ["Book", "ACE Notes", "Priority: HIGH"] },
  { icon: "⚙️", title: "Electrical Machines",        desc: "Nagrath & Kothari — Electric Machines (5th ed). Watch Pradeep Kshetrapal on YouTube for visual understanding of DC & AC machines.", tags: ["Book", "YouTube", "Priority: HIGH"] },
  { icon: "🏭", title: "Power Systems",              desc: "W.D. Stevenson — Elements of Power System Analysis. NPTEL IIT Bombay lectures (Prof. A.M. Kulkarni) are outstanding.", tags: ["Book", "NPTEL", "Priority: HIGH"] },
  { icon: "🎛️", title: "Control Systems",            desc: "Nagrath & Gopal — Control Systems Engineering. Brian Douglas on YouTube is the best for Bode plots and Root Locus.", tags: ["Book", "YouTube", "Priority: HIGH"] },
  { icon: "📡", title: "Signals & Systems",          desc: "Oppenheim & Willsky — Signals & Systems (2nd ed). NPTEL IIT lectures cover entire GATE syllabus systematically.", tags: ["Book", "NPTEL", "Priority: HIGH"] },
  { icon: "🔬", title: "Analog Electronics",         desc: "Sedra & Smith — Microelectronics Circuits. Neso Academy on YouTube covers all BJT, MOSFET & Op-Amp topics very clearly.", tags: ["Book", "YouTube", "Priority: MED"] },
  { icon: "💻", title: "Digital Electronics",        desc: "Morris Mano — Digital Design. Neso Academy YouTube channel. This subject is scoring — target 100% accuracy!", tags: ["Book", "YouTube", "Priority: MED"] },
  { icon: "🧲", title: "Electromagnetic Theory",     desc: "Matthew N.O. Sadiku — Elements of Electromagnetics. NPTEL video lectures for Maxwell's equations and wave propagation.", tags: ["Book", "NPTEL", "Priority: MED"] },
  { icon: "⚡", title: "Power Electronics",          desc: "P.S. Bimbhra — Power Electronics. NPTEL & Unacademy GATE courses. Focus on converter topologies and waveforms.", tags: ["Book", "NPTEL", "Priority: MED"] },
  { icon: "📏", title: "Measurements & Instru.",    desc: "A.K. Sawhney — Electrical Measurements & Measuring Instruments. ACE Academy notes are sufficient for this subject.", tags: ["Notes", "ACE Notes", "Priority: LOW"] },
  { icon: "🎯", title: "GATE PYQ Practice",         desc: "Solve GATE EE papers from 2015–2024 on GATE EE Topper website. Essential from Month 5 onwards. Every wrong answer is gold.", tags: ["PYQs", "Free", "Must-Do"] },
  { icon: "📱", title: "Unacademy / BYJU's",        desc: "Unacademy GATE EE course has excellent video lectures. Free content is enough — you don't need a paid subscription.", tags: ["Video", "App", "Free"] },
  { icon: "📰", title: "Made Easy / ACE Notes",     desc: "Made Easy and ACE Academy printed notes for all EE subjects. Best for last 2 months when you need crisp, exam-ready material.", tags: ["Notes", "Paid", "Revision"] },
];

const TIPS = [
  { t: "Start with Engineering Mathematics — it's 15 marks and foundational for Signals, Networks, and Control Systems. Never skip it." },
  { t: "Electrical Machines is your B.Tech strength. Exploit it ruthlessly — aim for 100% accuracy in this section. Study Nagrath & Kothari chapter by chapter." },
  { t: "Attempt NAT (Numerical Answer Type) questions first in the exam — they have ZERO negative marking. Never ever leave them blank." },
  { t: "For MCQs with negative marking: eliminate 2 wrong options first. Only guess if you can narrow it down to 2 choices with logic." },
  { t: "Revise each topic within 48 hours of first studying it. Spaced repetition is the most powerful memory technique known to science." },
  { t: "Take at least 7 full mock tests before the exam. Analyze every single wrong answer — understand the concept, don't just note the correct answer." },
  { t: "Sleep 7-8 hours daily without exception. Your brain consolidates memory during deep sleep. All-nighters destroy retention and are counter-productive." },
  { t: "Make your own 1-page formula sheet for each subject right after completing it. The act of writing forces deep recall and solidifies memory." },
  { t: "General Aptitude is 15 marks and relatively easy. Dedicate 30 minutes every single day from Month 3 onwards — don't treat it as secondary!" },
  { t: "Stop studying new topics in the final week before GATE. Only revise your formula sheets and short notes. Physical and mental rest is preparation too." },
  { t: "Use the Pomodoro technique: 25 minutes of deep focus + 5-minute break. After 4 rounds, take a 20-minute break. This doubles retention." },
  { t: "Track your daily hours in this app every single day. Consistency beats intensity — 6 focused hours daily for 240 days always beats cramming." },
  { t: "Join a GATE EE Telegram group for doubt resolution and motivation. Solving others' doubts is the fastest way to solidify your own understanding." },
  { t: "In the exam hall: start with 1-mark questions, then 2-mark. Do your confident subjects first. Keep last 15 minutes for review of flagged questions." },
];

const SESSIONS = [
  { num: "SESSION 01", time: "6:00 – 8:00 AM",   task: "New Concept Study — Read theory, make structured notes, understand derivations",    key: "s1" },
  { num: "SESSION 02", time: "8:00 – 9:00 AM",   task: "Solved Examples — Work textbook solved problems step-by-step from start to finish",  key: "s2" },
  { num: "SESSION 03", time: "9:30 – 11:00 AM",  task: "Problem Solving — Attempt 10–15 GATE PYQs or practice problems under time pressure",  key: "s3" },
  { num: "SESSION 04", time: "11:00 AM – 12 PM", task: "Revision — Review yesterday's notes + recite all formulas learned this week",         key: "s4" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let state       = {};
let mockData    = [];
let currentDateKey = todayKey();
let currentUser = null;
let activeFormulaSub = "All";

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}
function pad(n) { return String(n).padStart(2,'0'); }

function loadFromStorage() {
  try { state    = JSON.parse(localStorage.getItem('gate_state')   || '{}'); } catch { state    = {}; }
  try { mockData = JSON.parse(localStorage.getItem('gate_mocks')   || '[]'); } catch { mockData = []; }
  while (mockData.length < MOCK_TESTS.length) mockData.push({ score: '', date: '' });
}
function saveToStorage() {
  localStorage.setItem('gate_state', JSON.stringify(state));
  localStorage.setItem('gate_mocks', JSON.stringify(mockData));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NETLIFY IDENTITY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initAuth() {
  if (typeof netlifyIdentity === 'undefined') {
    // Fallback: if Identity widget not loaded (local dev), skip login
    showApp({ user_metadata: { full_name: 'Priyanshu' }, email: 'demo@gate.ee' });
    return;
  }

  netlifyIdentity.on('init', user => {
    if (user) showApp(user);
    else showLogin();
  });

  netlifyIdentity.on('login', user => {
    netlifyIdentity.close();
    showApp(user);
  });

  netlifyIdentity.on('logout', () => showLogin());

  netlifyIdentity.init();
}

function showLogin() {
  document.getElementById('login-overlay').style.display = 'flex';
  document.getElementById('app').classList.add('hidden');
}

function showApp(user) {
  currentUser = user;
  document.getElementById('login-overlay').style.display = 'none';
  document.getElementById('app').classList.remove('hidden');

  const name = (user.user_metadata && user.user_metadata.full_name)
    ? user.user_metadata.full_name.split(' ')[0]
    : (user.email ? user.email.split('@')[0] : 'Student');

  const initial = name[0].toUpperCase();

  ['user-avatar', 'mob-avatar', 'mob-avatar2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = initial;
  });
  ['user-name', 'mob-name'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = name;
  });

  loadFromStorage();
  renderAll();
  startCountdown();
}

function logOut() {
  if (typeof netlifyIdentity !== 'undefined') {
    netlifyIdentity.logout();
  } else {
    showLogin();
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function goTo(pageId, linkEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  if (linkEl) linkEl.classList.add('active');

  // Also highlight sidebar nav by data-page
  document.querySelectorAll('.nav-item[data-page="' + pageId + '"]').forEach(n => n.classList.add('active'));

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileNav() {
  const drawer  = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('visible');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COUNTDOWN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function startCountdown() {
  function tick() {
    const target = new Date('2027-02-01T09:00:00');
    const diff   = target - new Date();
    if (diff <= 0) { ['cd-d','cd-h','cd-m','cd-s'].forEach(id => { const el=document.getElementById(id); if(el) el.textContent='00'; }); return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2,'0'); };
    set('cd-d', d); set('cd-h', h); set('cd-m', m); set('cd-s', s);
  }
  tick();
  setInterval(tick, 1000);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RENDER ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderAll() {
  renderDashboard();
  renderPlan();
  renderTracker();
  renderMocks();
  renderFormulas();
  renderResources();
  renderTips();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DASHBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderDashboard() {
  // Compute totals
  let totalHrs = 0, totalPYQs = 0;
  Object.keys(state).forEach(k => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(k)) {
      totalHrs  += parseFloat(state[k].hours  || 0);
      totalPYQs += parseInt(state[k].pyqs    || 0);
    }
  });
  const mocksDone = mockData.filter(m => m && m.score !== '').length;
  const scores    = mockData.filter(m => m && m.score !== '').map(m => parseFloat(m.score));
  const avgScore  = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1)+'%' : '—';

  const statsEl = document.getElementById('dash-stats');
  const STATS = [
    { icon:'⏱️', num: totalHrs.toFixed(1), lbl:'Hours Logged' },
    { icon:'📝', num: totalPYQs,           lbl:'PYQs Solved' },
    { icon:'🧪', num: mocksDone,           lbl:'Tests Done' },
    { icon:'🎯', num: avgScore,            lbl:'Avg Mock Score' },
  ];
  statsEl.innerHTML = STATS.map(s => `
    <div class="dash-stat">
      <div class="ds-icon">${s.icon}</div>
      <div class="ds-num">${s.num}</div>
      <div class="ds-lbl">${s.lbl}</div>
    </div>`).join('');

  // Subject grid
  const grid = document.getElementById('subj-grid');
  grid.innerHTML = SUBJECTS.map((s, i) => {
    const pct = Math.min(100, Math.round((state[`subj_${i}`] || 0) * 100));
    const done = pct >= 100;
    return `<div class="subj-card" onclick="promptSubjectUpdate(${i})">
      <div class="sj-header">
        <span class="sj-name">${s.name}</span>
        <span class="sj-marks">${s.marks} marks</span>
      </div>
      <div class="sj-meta">${s.priority} · Phase ${s.phase} · ${s.hrs} hrs planned</div>
      <div class="pbar"><div class="pbar-fill" style="width:${pct}%;background:${done?'#27ae60':s.color}"></div></div>
      <div class="sj-footer"><span>${done?'✅ Complete':'Tap to update %'}</span><span class="sj-pct">${pct}%</span></div>
    </div>`;
  }).join('');
}

function promptSubjectUpdate(i) {
  const cur = Math.round((state[`subj_${i}`] || 0) * 100);
  const v   = prompt(`"${SUBJECTS[i].name}"\nEnter your progress (0–100%):\nCurrent: ${cur}%`, cur);
  if (v === null || v === '') return;
  const n = Math.max(0, Math.min(100, parseInt(v) || 0));
  state[`subj_${i}`] = n / 100;
  saveToStorage();
  renderDashboard();
  showToast('✅ Progress updated!');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STUDY PLAN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderPlan() {
  const phases = [
    { id: 'phase1', label: '📗 Phase 1: Foundation' },
    { id: 'phase2', label: '📘 Phase 2: Core EE' },
    { id: 'phase3', label: '📙 Phase 3: Advanced' },
    { id: 'phase4', label: '📕 Phase 4: Revision' },
  ];

  document.getElementById('phase-tabs').innerHTML = phases.map((p, i) =>
    `<button class="ptab${i===0?' active':''}" onclick="showPhase('${p.id}',this)">${p.label}</button>`
  ).join('');

  const content = document.getElementById('plan-content');
  content.innerHTML = phases.map(p => {
    const cards = MONTHS.filter(m => m.phase === p.id).map(m => `
      <div class="month-card">
        <div class="mc-header">
          <div><div class="mc-name">${m.name}</div><div class="mc-phase">${m.phaseLabel}</div></div>
          <div class="mc-hrs">${m.hrs}</div>
        </div>
        <div class="mc-body">
          ${m.weeks.map(w => `<div class="mc-week"><div class="mw-lbl">${w.w}</div><div class="mw-topic">${w.t}</div></div>`).join('')}
        </div>
      </div>`).join('');
    return `<div id="pgroup-${p.id}" class="month-cards" style="display:${p.id==='phase1'?'grid':'none'}">${cards}</div>`;
  }).join('');
}

function showPhase(id, btn) {
  document.querySelectorAll('[id^="pgroup-"]').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  const group = document.getElementById('pgroup-' + id);
  if (group) group.style.display = 'grid';
  if (btn) btn.classList.add('active');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DAILY TRACKER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderTracker() {
  const dayData = state[currentDateKey] || {};

  // Date display
  const d    = new Date(currentDateKey + 'T12:00:00');
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('tdc-date').textContent = d.toLocaleDateString('en-IN', opts);
  const today = todayKey();
  const diff  = Math.round((new Date(currentDateKey) - new Date(today)) / 86400000);
  document.getElementById('tdc-rel').textContent =
    diff === 0 ? '📅 Today' : diff > 0 ? `📅 ${diff} day(s) ahead` : `📅 ${Math.abs(diff)} day(s) ago`;

  // Sessions
  document.getElementById('sessions-wrap').innerHTML = SESSIONS.map(s => {
    const done = dayData[s.key] || false;
    return `<div class="session-card${done?' done':''}" id="sc-${s.key}">
      <div class="sess-num">${s.num}</div>
      <div class="sess-time">${s.time}</div>
      <div class="sess-task">${s.task}</div>
      <button class="sess-check" onclick="toggleSession('${s.key}')">${done?'✅ Done':'Mark Complete'}</button>
    </div>`;
  }).join('');

  // Form fields
  document.getElementById('t-subject').value = dayData.subject || '';
  document.getElementById('t-hours').value   = dayData.hours   || '';
  document.getElementById('t-pyqs').value    = dayData.pyqs    || '';
  document.getElementById('t-notes').value   = dayData.notes   || '';
  const moodSel = document.getElementById('t-mood');
  if (moodSel) moodSel.value = dayData.mood || '';
}

function toggleSession(key) {
  if (!state[currentDateKey]) state[currentDateKey] = {};
  state[currentDateKey][key] = !state[currentDateKey][key];
  saveToStorage();
  renderTracker();
}

function autoSave() {
  if (!state[currentDateKey]) state[currentDateKey] = {};
  const d = state[currentDateKey];
  d.subject = document.getElementById('t-subject').value;
  d.hours   = parseFloat(document.getElementById('t-hours').value) || 0;
  d.pyqs    = parseInt(document.getElementById('t-pyqs').value)    || 0;
  d.notes   = document.getElementById('t-notes').value;
  d.mood    = document.getElementById('t-mood').value;
  saveToStorage();
  renderDashboard();
  document.getElementById('save-status').textContent = '💾 Auto-saved';
  setTimeout(() => { const el=document.getElementById('save-status'); if(el) el.textContent=''; }, 2000);
}

function saveDay() {
  autoSave();
  showToast('✅ Day saved!');
}

function changeDay(delta) {
  const d = new Date(currentDateKey + 'T12:00:00');
  d.setDate(d.getDate() + delta);
  currentDateKey = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  renderTracker();
}
function goToday() { currentDateKey = todayKey(); renderTracker(); }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MOCK TESTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderMocks() {
  const done   = mockData.filter(m => m && m.score !== '');
  const scores = done.map(m => parseFloat(m.score));
  const avg    = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1) : '—';
  const best   = scores.length ? Math.max(...scores).toFixed(1) : '—';

  document.getElementById('mock-summary').innerHTML = [
    { num: done.length,           lbl: 'Tests Completed' },
    { num: avg + (avg!=='—'?'%':''), lbl: 'Average Score' },
    { num: best + (best!=='—'?'%':''), lbl: 'Best Score' },
    { num: MOCK_TESTS.length - done.length, lbl: 'Remaining' },
  ].map(s => `<div class="ms-card"><div class="ms-num">${s.num}</div><div class="ms-lbl">${s.lbl}</div></div>`).join('');

  document.getElementById('mock-grid').innerHTML = MOCK_TESTS.map((m, i) => {
    const d   = mockData[i] || { score: '', date: '' };
    const pct = d.score ? Math.min(100, parseFloat(d.score)) : 0;
    return `<div class="mock-card">
      <div class="mk-header">
        <span class="mk-name">${m.name}</span>
        <span class="mk-badge ${m.type}">${m.type==='pyq'?'PYQ':'MOCK'}</span>
      </div>
      <div class="mk-score-row">
        <span class="mk-lbl">Score /100</span>
        <input class="mk-inp" type="number" min="0" max="100" step="0.5"
          placeholder="Enter score" value="${d.score||''}"
          oninput="updateMock(${i},'score',this.value)"/>
        <span class="mk-pct" id="mpct-${i}">${d.score ? Math.round(parseFloat(d.score))+'%' : '—'}</span>
      </div>
      <div class="mk-bar"><div class="mk-fill" id="mfill-${i}" style="width:${pct}%"></div></div>
      <input class="mk-date" type="date" value="${d.date||''}"
        onchange="updateMock(${i},'date',this.value)" placeholder="Test date"/>
    </div>`;
  }).join('');
}

function updateMock(i, field, val) {
  while (mockData.length <= i) mockData.push({ score: '', date: '' });
  mockData[i][field] = val;
  saveToStorage();
  if (field === 'score') {
    const pct = Math.min(100, Math.max(0, parseFloat(val) || 0));
    const fill = document.getElementById(`mfill-${i}`);
    const lbl  = document.getElementById(`mpct-${i}`);
    if (fill) fill.style.width = pct + '%';
    if (lbl)  lbl.textContent  = val ? Math.round(pct) + '%' : '—';
    renderMocks(); // refresh summary stats
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORMULAS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderFormulas() {
  const subjects = ['All', ...new Set(FORMULAS.map(f => f.subj))];
  document.getElementById('filt-wrap').innerHTML = subjects.map(s =>
    `<button class="filt-btn${s==='All'?' active':''}" onclick="setFormulaSub('${s}',this)">${s==='All'?'All':s.split(' ').slice(0,2).join(' ')}</button>`
  ).join('');

  document.getElementById('formula-grid').innerHTML = FORMULAS.map(f =>
    `<div class="formula-card" data-subj="${f.subj}" data-name="${f.name.toLowerCase()}" data-eq="${f.eq.toLowerCase()}">
      <div class="fc-subj">${f.subj.toUpperCase()}</div>
      <div class="fc-name">${f.name}</div>
      <div class="fc-eq">${f.eq}</div>
      <div class="fc-note">💡 ${f.note}</div>
    </div>`
  ).join('');
}

function setFormulaSub(subj, btn) {
  activeFormulaSub = subj;
  document.querySelectorAll('.filt-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterFormulas();
}

function filterFormulas() {
  const q = (document.getElementById('formula-search').value || '').toLowerCase();
  document.querySelectorAll('.formula-card').forEach(c => {
    const matchSub  = activeFormulaSub === 'All' || c.dataset.subj === activeFormulaSub;
    const matchText = !q || c.dataset.name.includes(q) || c.dataset.eq.includes(q) || c.dataset.subj.toLowerCase().includes(q);
    c.classList.toggle('hidden', !(matchSub && matchText));
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESOURCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderResources() {
  document.getElementById('res-grid').innerHTML = RESOURCES.map(r => `
    <div class="res-card">
      <div class="rc-icon">${r.icon}</div>
      <div class="rc-title">${r.title}</div>
      <div class="rc-desc">${r.desc}</div>
      <div class="rc-tags">${r.tags.map(t=>`<span class="rc-tag">${t}</span>`).join('')}</div>
    </div>`).join('');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TIPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderTips() {
  document.getElementById('tips-grid').innerHTML = TIPS.map((tip, i) => `
    <div class="tip-card">
      <div class="tip-num">${String(i+1).padStart(2,'0')}</div>
      <div class="tip-text">${tip.t}</div>
    </div>`).join('');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOAST
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BOOT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.addEventListener('DOMContentLoaded', initAuth);
