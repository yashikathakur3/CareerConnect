import { useState } from "react";
import "./QuestionBank.css";

const STEPS = [
  { tag: "Step 1 of 4", num: 1 },
  { tag: "Step 2 of 4", num: 2 },
  { tag: "Step 3 of 4", num: 3 },
  { tag: "Step 4 of 4", num: 4 },
];

export default function QuestionBank() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState("fwd");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [questions, setQuestions] = useState(["", "", "", "", ""]);
  const [additionalInfo, setAdditionalInfo] = useState(["", "", ""]);

  const go = (n) => {
    setDir(n > step ? "fwd" : "bck");
    setStep(n);
  };

  const validate = () => {
    if (step === 0) {
      if (!name.trim()) { alert("Please enter your name 👋"); return false; }
    }
    if (step === 1) {
      if (!linkedin.trim()) { alert("Please enter your LinkedIn URL 🔗"); return false; }
      if (!linkedin.startsWith("http") && !linkedin.includes("linkedin")) {
        alert("Please enter a valid LinkedIn URL"); return false;
      }
    }
    if (step === 2) {
      if (!company.trim()) { alert("Please enter the company name 🏢"); return false; }
      if (questions.some(q => !q.trim())) { alert("Please fill in all interview questions ❓"); return false; }
      if (additionalInfo.some(a => !a.trim())) { alert("Please fill in all additional info fields 📝"); return false; }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validate()) return;

    if (step < 3) {
      go(step + 1);
    } else {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, linkedin, email, company, questions, additionalInfo }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || data.message || "Server error");

        setSubmitted(true);
      } catch (err) {
        // console.error(err);
        alert("Something went wrong: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => { if (step > 0) go(step - 1); };

  const handleReset = () => {
    setStep(0); setDir("fwd"); setSubmitted(false);
    setName(""); setLinkedin(""); setEmail(""); setCompany("");
    setQuestions(["", "", "", "", ""]);
    setAdditionalInfo(["", "", ""]);
  };

  const addQ = () => setQuestions([...questions, ""]);
  const rmQ = (i) => { if (questions.length > 5) setQuestions(questions.filter((_, x) => x !== i)); };
  const setQ = (i, v) => { const u = [...questions]; u[i] = v; setQuestions(u); };

  const addA = () => setAdditionalInfo([...additionalInfo, ""]);
  const rmA = (i) => { if (additionalInfo.length > 3) setAdditionalInfo(additionalInfo.filter((_, x) => x !== i)); };
  const setA = (i, v) => { const u = [...additionalInfo]; u[i] = v; setAdditionalInfo(u); };

  const firstName = name.trim().split(" ")[0];

  return (
    <div className="qb-page">
      <div className="qb-page-header">
        <span className="emoji">🎓</span>
        <h1>Career Connect</h1>
        <p>Share your interview experience · Help juniors succeed</p>
      </div>

      <div className="qb-card">
        <div className="qb-card-topbar" />

        {submitted ? (
          <div className="qb-success">
            <div className="qb-success-ring">🎉</div>
            <h2>Thank you, {firstName}!</h2>
            <p>
              Your interview experience has been added to the question bank.
              You're helping the next generation of students land their dream jobs!
            </p>
            <div className="qb-success-stats">
              <div className="qb-stat">
                <span>{questions.length}</span>
                Questions shared
              </div>
              <div className="qb-stat">
                <span>{additionalInfo.length}</span>
                Tips added
              </div>
              <div className="qb-stat">
                <span>🏢</span>
                {company}
              </div>
            </div>
            <button className="qb-restart-btn" onClick={handleReset}>
              ↩ Submit Another
            </button>
          </div>
        ) : (
          <>
            <div className="qb-stepper">
              <div className="qb-step-meta">
                <span className="qb-step-tag">{STEPS[step].tag}</span>
                <span className="qb-step-fraction">{step + 1} / {STEPS.length}</span>
              </div>
              <div className="qb-dots-row">
                {STEPS.map((_, i) => (
                  <div key={i} className="qb-dot-wrap">
                    <div className={`qb-dot ${i === step ? "active" : i < step ? "done" : ""}`}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="qb-line">
                        <div className={`qb-line-fill ${i < step ? "filled" : ""}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="qb-step-heading">
              {step === 0 && (<><h2>What's your name?</h2><p>Let's start with the basics. Your name helps juniors connect with you.</p></>)}
              {step === 1 && (<><h2>Hey, <span className="qb-greeting-name">{firstName}!</span> 👋</h2><p>Great to have you here! Share your LinkedIn so juniors can reach out to you directly.</p></>)}
              {step === 2 && (<><h2>Company & Interview Details</h2><p>Which company did you interview at? Share the questions and tips that helped you.</p></>)}
              {step === 3 && (<><h2>Almost there! ✨</h2><p>Review your submission — everything looks good? Hit submit to go live!</p></>)}
            </div>

            <div key={step} className={`qb-step-body anim-${dir}`}>
              {step === 0 && (
                <div>
                  <input
                    className="qb-big-input"
                    placeholder="Your Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                    onKeyDown={e => e.key === "Enter" && handleNext()}
                  />
                  <p className="qb-input-hint">Press Enter or click Continue →</p>
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="qb-input-wrap">
                    <span className="qb-input-icon">🔗</span>
                    <input className="qb-input" type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={e => setLinkedin(e.target.value)} autoFocus />
                  </div>
                  <div className="qb-input-wrap">
                    <span className="qb-input-icon">📧</span>
                    <input className="qb-input" type="email" placeholder="Email address (optional)" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <p className="qb-input-hint" style={{ marginTop: 4 }}>Your LinkedIn helps juniors ask follow-up questions</p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="qb-section-label" style={{ marginTop: 0 }}>
                    <span className="qb-section-title">🏢 Company Name</span>
                  </div>
                  <input className="qb-input-plain" type="text" placeholder="e.g. Google, Microsoft, Infosys..." value={company} onChange={e => setCompany(e.target.value)} autoFocus />

                  <div className="qb-section-label">
                    <span className="qb-section-title">❓ Interview Questions</span>
                    <span className="qb-count-pill blue">{questions.length} / min 5</span>
                  </div>
                  <div className="qb-rows">
                    {questions.map((q, i) => (
                      <div key={i} className="qb-row">
                        <div className="qb-row-num blue">{i + 1}</div>
                        <input className="qb-row-input" placeholder={`Question ${i + 1}`} value={q} onChange={e => setQ(i, e.target.value)} />
                        <button className="qb-rm-btn" type="button" onClick={() => rmQ(i)}>×</button>
                      </div>
                    ))}
                  </div>
                  <button className="qb-add-btn blue" type="button" onClick={addQ}>＋ Add Question</button>

                  <div className="qb-section-label">
                    <span className="qb-section-title">📝 Additional Info</span>
                    <span className="qb-count-pill indigo">{additionalInfo.length} / min 3</span>
                  </div>
                  <div className="qb-rows">
                    {additionalInfo.map((a, i) => (
                      <div key={i} className="qb-row">
                        <div className="qb-row-num indigo">{i + 1}</div>
                        <input className="qb-row-input indigo" placeholder={`Tip ${i + 1} — e.g. Rounds, difficulty, advice`} value={a} onChange={e => setA(i, e.target.value)} />
                        <button className="qb-rm-btn" type="button" onClick={() => rmA(i)}>×</button>
                      </div>
                    ))}
                  </div>
                  <button className="qb-add-btn indigo" type="button" onClick={addA}>＋ Add Info</button>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { icon: "👤", label: "Name", value: name },
                    { icon: "🔗", label: "LinkedIn", value: linkedin },
                    { icon: "🏢", label: "Company", value: company },
                    { icon: "❓", label: "Questions", value: `${questions.length} questions added` },
                    { icon: "📝", label: "Tips", value: `${additionalInfo.length} additional info added` },
                  ].map(({ icon, label, value }, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc", borderRadius: "12px", padding: "12px 14px", border: "1.5px solid #e2e8f0" }}>
                      <span style={{ fontSize: "18px" }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                        <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#0f172a", marginTop: "1px" }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="qb-footer">
              <button className="qb-back-btn" onClick={handleBack} disabled={step === 0}>← Back</button>
              <div className="qb-mini-dots">
                {STEPS.map((_, i) => (
                  <div key={i} className={`qb-mini-dot ${i === step ? "active" : i < step ? "done" : ""}`} />
                ))}
              </div>
              <button className="qb-next-btn" onClick={handleNext} disabled={loading}>
                {loading ? "Submitting..." : step === 3 ? "🚀 Submit" : "Continue →"}
              </button>
            </div>
          </>
        )}
      </div>

      <p className="qb-page-footer">Your data helps juniors prepare better 💙</p>
    </div>
  );
}