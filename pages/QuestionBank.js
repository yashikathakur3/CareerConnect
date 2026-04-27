import { useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f0f6ff; color: #0f172a; }

.ac-page {
  min-height: 100vh;
  background: #f0f6ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 80px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.ac-header { text-align: center; margin-bottom: 28px; }
.ac-logo {
  width: 52px; height: 52px; border-radius: 14px;
  background: linear-gradient(135deg, #1a73e8, #34a853);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 800; color: white;
  margin: 0 auto 12px;
  box-shadow: 0 6px 20px rgba(26,115,232,0.35);
}
.ac-header h1 { font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.ac-header h1 span { color: #1a73e8; }
.ac-header p { font-size: 13px; color: #64748b; }

.ac-progress {
  display: flex; align-items: center; margin-bottom: 24px;
}
.ac-step { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.ac-step span { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.ac-step-done span { color: #1a73e8; }
.ac-step-circle {
  width: 36px; height: 36px; border-radius: 50%;
  background: #e2e8f0; color: #94a3b8;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; transition: all 0.3s;
}
.ac-step-done .ac-step-circle { background: #1a73e8; color: white; box-shadow: 0 4px 12px rgba(26,115,232,0.35); }
.ac-step-line { width: 60px; height: 2px; background: #e2e8f0; margin: 0 8px; margin-bottom: 22px; transition: background 0.3s; }
.ac-step-line-done { background: #1a73e8; }

.ac-card {
  width: 100%; max-width: 540px;
  background: white; border-radius: 18px;
  border: 1px solid rgba(26,115,232,0.15);
  box-shadow: 0 8px 40px rgba(26,115,232,0.12);
  overflow: hidden;
}

.ac-section { padding: 36px 38px; animation: fadeUp 0.3s ease both; }
@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

.ac-section-icon { font-size: 38px; text-align: center; margin-bottom: 12px; }
.ac-section h2 { font-size: 21px; font-weight: 700; color: #0f172a; text-align: center; margin-bottom: 6px; }
.ac-section-sub { font-size: 13px; color: #64748b; text-align: center; line-height: 1.7; margin-bottom: 26px; font-weight: 300; }

.ac-field { margin-bottom: 16px; }
.ac-field-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.ac-field label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
.ac-field-header label { margin-bottom: 0; }
.ac-required { color: #e53e3e; }
.ac-optional { color: #94a3b8; font-weight: 400; font-size: 11px; }

.ac-input {
  width: 100%; padding: 12px 15px;
  border: 1.5px solid rgba(26,115,232,0.2);
  border-radius: 10px; font-size: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #0f172a; background: #f8faff; outline: none; transition: all 0.2s;
}
.ac-input:focus { border-color: #1a73e8; background: white; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
.ac-input::placeholder { color: #b0bec5; }
.ac-input-error { border-color: #e53e3e; background: #fff5f5; }
.ac-input-error:focus { border-color: #e53e3e; box-shadow: 0 0 0 3px rgba(229,62,62,0.1); }
.ac-error { display: block; font-size: 12px; color: #e53e3e; font-weight: 500; margin-top: 4px; }

.ac-btn-primary {
  padding: 12px 28px; background: #1a73e8; color: white;
  border: none; border-radius: 50px;
  font-size: 14px; font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(26,115,232,0.35);
}
.ac-btn-primary:hover { background: #1255c0; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(26,115,232,0.4); }
.ac-btn-full { width: 100%; margin-top: 6px; padding: 14px; font-size: 15px; }

.ac-btn-secondary {
  padding: 12px 24px; background: transparent; color: #1a73e8;
  border: 1.5px solid rgba(26,115,232,0.25); border-radius: 50px;
  font-size: 14px; font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer; transition: all 0.2s;
}
.ac-btn-secondary:hover { background: #f0f6ff; border-color: #1a73e8; }

.ac-btn-add {
  width: 100%; padding: 12px;
  background: #f0f6ff; color: #1a73e8;
  border: 1.5px dashed rgba(26,115,232,0.4);
  border-radius: 10px; font-size: 13px; font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer; transition: all 0.2s;
  margin-bottom: 22px; margin-top: 4px;
}
.ac-btn-add:hover { background: #e8f0fe; border-color: #1a73e8; transform: translateY(-1px); }

.ac-remove-btn {
  background: none; border: none; color: #e53e3e;
  font-size: 12px; font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer; padding: 2px 8px; border-radius: 6px; transition: background 0.2s;
}
.ac-remove-btn:hover { background: #fff5f5; }

.ac-btn-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 8px; }

.ac-overlay {
  position: fixed; inset: 0;
  background: rgba(15,23,42,0.55);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; animation: overlayIn 0.2s ease both;
}
@keyframes overlayIn { from{opacity:0} to{opacity:1} }

.ac-popup {
  background: white; border-radius: 24px;
  padding: 44px 40px; max-width: 420px; width: 90%;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0,0,0,0.18);
  animation: popupIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275) both;
}
@keyframes popupIn { from{opacity:0;transform:scale(0.8) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }

.ac-popup-icon { font-size: 52px; margin-bottom: 16px; animation: bounce 0.6s ease 0.3s both; display: block; }
@keyframes bounce { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
.ac-popup h2 { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
.ac-popup p { font-size: 14px; color: #64748b; font-weight: 300; line-height: 1.75; margin-bottom: 26px; }
.ac-popup p strong { color: #1a73e8; font-weight: 600; }

.ac-popup-confetti { display: flex; justify-content: center; gap: 6px; margin-bottom: 18px; }
.ac-confetti-dot { width: 8px; height: 8px; border-radius: 50%; animation: confettiBounce 1s ease infinite; }
.ac-confetti-dot:nth-child(1){ background:#1a73e8; animation-delay:0s; }
.ac-confetti-dot:nth-child(2){ background:#34a853; animation-delay:0.15s; }
.ac-confetti-dot:nth-child(3){ background:#f59e0b; animation-delay:0.3s; }
.ac-confetti-dot:nth-child(4){ background:#ec4899; animation-delay:0.45s; }
.ac-confetti-dot:nth-child(5){ background:#1a73e8; animation-delay:0.6s; }
@keyframes confettiBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.ac-thank-box {
  width: 100%; max-width: 520px;
  background: white; border-radius: 18px;
  border: 1px solid rgba(26,115,232,0.15);
  box-shadow: 0 8px 40px rgba(26,115,232,0.12);
  padding: 48px 38px; text-align: center;
  animation: fadeUp 0.5s ease both;
}
.ac-thank-icon { font-size: 58px; margin-bottom: 16px; animation: bounce 0.6s ease 0.2s both; display: block; }
.ac-thank-box h2 { font-size: 26px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
.ac-thank-box p { font-size: 14px; color: #64748b; font-weight: 300; line-height: 1.75; margin-bottom: 28px; max-width: 380px; margin-left: auto; margin-right: auto; }

.ac-thank-summary {
  background: #f0f6ff; border: 1px solid rgba(26,115,232,0.15);
  border-radius: 10px; padding: 18px; margin-bottom: 26px; text-align: left;
}
.ac-summary-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; border-bottom: 1px solid rgba(26,115,232,0.08);
}
.ac-summary-item:last-child { border-bottom: none; }
.ac-summary-label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.ac-summary-value { font-size: 13px; font-weight: 600; color: #0f172a; max-width: 280px; word-break: break-all; text-align: right; }
.ac-summary-link { color: #1a73e8; }

.ac-footer { margin-top: 26px; font-size: 12px; color: #94a3b8; font-weight: 300; }

@media(max-width:560px){
  .ac-section { padding: 26px 20px; }
  .ac-thank-box { padding: 32px 20px; }
  .ac-popup { padding: 32px 22px; }
  .ac-step-line { width: 32px; }
  .ac-btn-row { flex-direction: column-reverse; }
  .ac-btn-row button { width: 100%; }
}
`;

export default function AlumniContribution() {

  var s1 = useState(1);   var step = s1[0];          var setStep = s1[1];
  var s2 = useState("");  var name = s2[0];           var setName = s2[1];
  var s3 = useState("");  var linkedin = s3[0];       var setLinkedin = s3[1];
  var s4 = useState(false); var showPopup = s4[0];   var setShowPopup = s4[1];
  var s5 = useState(false); var showThank = s5[0];   var setShowThank = s5[1];
  var s6 = useState("");  var nameErr = s6[0];        var setNameErr = s6[1];
  var s7 = useState("");  var linkedinErr = s7[0];    var setLinkedinErr = s7[1];
  var s8 = useState(["","","",""]);  var questions = s8[0];  var setQuestions = s8[1];
  var s9 = useState(["","","",""]);  var qErrors = s9[0];    var setQErrors = s9[1];

  function handleNameContinue() {
    if (name.trim().length < 2) { setNameErr("Please enter your full name."); return; }
    setNameErr("");
    setShowPopup(true);
  }

  function handlePopupClose() { setShowPopup(false); setStep(2); }

  function handleLinkedinContinue() {
    if (linkedin.trim() === "") { setLinkedinErr("LinkedIn URL is required."); return; }
    if (linkedin.indexOf("linkedin.com") === -1) { setLinkedinErr("Please enter a valid LinkedIn URL."); return; }
    setLinkedinErr("");
    setStep(3);
  }

  function handleQuestionChange(idx, val) {
    var arr = questions.slice();
    arr[idx] = val;
    setQuestions(arr);
    if (val.trim() !== "") {
      var errs = qErrors.slice();
      errs[idx] = "";
      setQErrors(errs);
    }
  }

  function handleAddQuestion() {
    setQuestions(questions.concat([""]));
    setQErrors(qErrors.concat([""]));
  }

  function handleRemoveQuestion(idx) {
    if (idx < 4) return;
    setQuestions(questions.filter(function(_, i){ return i !== idx; }));
    setQErrors(qErrors.filter(function(_, i){ return i !== idx; }));
  }

  // function handleSubmit() {
  //   var errs = qErrors.slice();
  //   var hasError = false;
  //   for (var i = 0; i < 4; i++) {
  //     if (questions[i].trim() === "") { errs[i] = "This question is required."; hasError = true; }
  //   }
  //   setQErrors(errs);
  //   if (hasError) return;
  //   setShowThank(true);
  // }
  async function handleSubmit() {

  var errs = qErrors.slice();
  var hasError = false;

  for (var i = 0; i < 4; i++) {
    if (questions[i].trim() === "") {
      errs[i] = "This question is required.";
      hasError = true;
    }
  }

  setQErrors(errs);

  if (hasError) return;

  try {

    var response = await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        linkedin: linkedin,
        questions: questions
      })
    });

    var data = await response.json();

    console.log(data);

    setShowThank(true);

  } catch (error) {

    console.log("Error saving questions:", error);
    alert("Failed to save questions");

  }
}

  function handleReset() {
    setStep(1); setName(""); setLinkedin("");
    setQuestions(["","","",""]); setQErrors(["","","",""]);
    setShowThank(false);
  }

  if (showThank) {
    return (
      <>
        <style>{css}</style>
        <div className="ac-page">
          <div className="ac-thank-box">
            <span className="ac-thank-icon">🙌</span>
            <h2>Thank You, {name}!</h2>
            <p>Your interview experience will help many juniors prepare better for their careers. You are a true part of the Career Connect family!</p>
            <div className="ac-thank-summary">
              <div className="ac-summary-item">
                <span className="ac-summary-label">Name</span>
                <span className="ac-summary-value">{name}</span>
              </div>
              <div className="ac-summary-item">
                <span className="ac-summary-label">LinkedIn</span>
                <span className="ac-summary-value ac-summary-link">{linkedin}</span>
              </div>
              <div className="ac-summary-item">
                <span className="ac-summary-label">Questions Shared</span>
                <span className="ac-summary-value">{questions.filter(function(q){ return q.trim() !== ""; }).length}</span>
              </div>
            </div>
            <button className="ac-btn-primary" onClick={handleReset}>Submit Another Response</button>
          </div>
          <p className="ac-footer">Career Connect — Bridging Students and Alumni</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      {showPopup && (
        <div className="ac-overlay">
          <div className="ac-popup">
            <span className="ac-popup-icon">🎉</span>
            <div className="ac-popup-confetti">
              <div className="ac-confetti-dot" />
              <div className="ac-confetti-dot" />
              <div className="ac-confetti-dot" />
              <div className="ac-confetti-dot" />
              <div className="ac-confetti-dot" />
            </div>
            <h2>Congratulations, {name}!</h2>
            <p>We are proud to have you as part of the <strong>Career Connect Alumni Network</strong>. Your experience can help juniors succeed.</p>
            <button className="ac-btn-primary" onClick={handlePopupClose}>Continue →</button>
          </div>
        </div>
      )}

      <div className="ac-page">

        <div className="ac-header">
          <div className="ac-logo">CC</div>
          <h1>Career<span>Connect</span></h1>
          <p>Alumni Interview Question Portal</p>
        </div>

        <div className="ac-progress">
          <div className={"ac-step" + (step >= 1 ? " ac-step-done" : "")}>
            <div className="ac-step-circle">1</div>
            <span>Name</span>
          </div>
          <div className={"ac-step-line" + (step >= 2 ? " ac-step-line-done" : "")} />
          <div className={"ac-step" + (step >= 2 ? " ac-step-done" : "")}>
            <div className="ac-step-circle">2</div>
            <span>LinkedIn</span>
          </div>
          <div className={"ac-step-line" + (step >= 3 ? " ac-step-line-done" : "")} />
          <div className={"ac-step" + (step >= 3 ? " ac-step-done" : "")}>
            <div className="ac-step-circle">3</div>
            <span>Questions</span>
          </div>
        </div>

        <div className="ac-card">

          {step === 1 && (
            <div className="ac-section">
              <div className="ac-section-icon">👤</div>
              <h2>Welcome, Alumni!</h2>
              <p className="ac-section-sub">Enter your name to get started. Your contribution will help hundreds of juniors crack their dream interviews.</p>
              <div className="ac-field">
                <label>Full Name <span className="ac-required">*</span></label>
                <input
                  className={"ac-input" + (nameErr ? " ac-input-error" : "")}
                  type="text"
                  placeholder="e.g. Yashika Thakur"
                  value={name}
                  onChange={function(e){ setName(e.target.value); setNameErr(""); }}
                />
                {nameErr && <span className="ac-error">{nameErr}</span>}
              </div>
              <button className="ac-btn-primary ac-btn-full" onClick={handleNameContinue}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div className="ac-section">
              <div className="ac-section-icon">🔗</div>
              <h2>Your LinkedIn Profile</h2>
              <p className="ac-section-sub">Share your LinkedIn so juniors can connect with you directly for guidance and mentorship.</p>
              <div className="ac-field">
                <label>LinkedIn Profile URL <span className="ac-required">*</span></label>
                <input
                  className={"ac-input" + (linkedinErr ? " ac-input-error" : "")}
                  type="text"
                  placeholder="https://linkedin.com/in/your-name"
                  value={linkedin}
                  onChange={function(e){ setLinkedin(e.target.value); setLinkedinErr(""); }}
                />
                {linkedinErr && <span className="ac-error">{linkedinErr}</span>}
              </div>
              <div className="ac-btn-row">
                <button className="ac-btn-secondary" onClick={function(){ setStep(1); }}>← Back</button>
                <button className="ac-btn-primary" onClick={handleLinkedinContinue}>Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="ac-section">
              <div className="ac-section-icon">💬</div>
              <h2>Share Interview Questions</h2>
              <p className="ac-section-sub">Share questions asked in your interview. First 4 are mandatory. Add more using the button below.</p>

              {questions.map(function(q, i){
                return (
                  <div className="ac-field" key={i}>
                    <div className="ac-field-header">
                      <label>
                        Question {i + 1}
                        {i < 4 && <span className="ac-required"> *</span>}
                        {i >= 4 && <span className="ac-optional"> (optional)</span>}
                      </label>
                      {i >= 4 && (
                        <button className="ac-remove-btn" onClick={function(){ handleRemoveQuestion(i); }}>
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      className={"ac-input" + (qErrors[i] ? " ac-input-error" : "")}
                      type="text"
                      placeholder={"Type interview question " + (i + 1) + " here..."}
                      value={q}
                      onChange={function(e){ handleQuestionChange(i, e.target.value); }}
                    />
                    {qErrors[i] && <span className="ac-error">{qErrors[i]}</span>}
                  </div>
                );
              })}

              <button className="ac-btn-add" onClick={handleAddQuestion}>+ Add More Questions</button>

              <div className="ac-btn-row">
                <button className="ac-btn-secondary" onClick={function(){ setStep(2); }}>← Back</button>
                <button className="ac-btn-primary" onClick={handleSubmit}>Submit 🙌</button>
              </div>
            </div>
          )}

        </div>

        <p className="ac-footer">Career Connect — Bridging Students and Alumni</p>
      </div>
    </>
  );
}