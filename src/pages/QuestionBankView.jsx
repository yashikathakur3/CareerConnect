// // import { useState, useEffect } from "react";
// // import "./QuestionBankView.css";

// // export default function QuestionBankView() {
// //   const [submissions, setSubmissions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [search, setSearch] = useState("");
// //   const [selected, setSelected] = useState(null);

// //   useEffect(() => {
// //     fetch(`${import.meta.env.VITE_API_URL}/api/submissions`)
// //       .then((res) => res.json())
// //       .then((data) => { setSubmissions(data); setLoading(false); })
// //       .catch(() => { setError("Failed to load data"); setLoading(false); });
// //   }, []);

// //   const filtered = submissions.filter((s) =>
// //     s.company.toLowerCase().includes(search.toLowerCase()) ||
// //     s.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const formatDate = (d) =>
// //     new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// //   return (
// //     <div className="qbv-page">
// //       {/* Header */}
// //       <div className="qbv-header">
// //         <span className="qbv-emoji">📚</span>
// //         <h1>Question Bank</h1>
// //         <p>Real interview questions shared by seniors · Prepare smarter</p>

// //         <div className="qbv-search-wrap">
// //           <span className="qbv-search-icon">🔍</span>
// //           <input
// //             className="qbv-search"
// //             placeholder="Search by company or name..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>

// //         <div className="qbv-stats">
// //           <div className="qbv-stat-pill">🏢 {submissions.length} Submissions</div>
// //           <div className="qbv-stat-pill">
// //             ❓ {submissions.reduce((a, s) => a + s.questions.length, 0)} Questions
// //           </div>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       {loading && (
// //         <div className="qbv-loading">
// //           <div className="qbv-spinner" />
// //           <p>Loading submissions...</p>
// //         </div>
// //       )}

// //       {error && <div className="qbv-error">⚠️ {error}</div>}

// //       {!loading && !error && filtered.length === 0 && (
// //         <div className="qbv-empty">
// //           <span>🔎</span>
// //           <p>No results found for "{search}"</p>
// //         </div>
// //       )}

// //       {/* Cards Grid */}
// //       {!loading && !error && (
// //         <div className="qbv-grid">
// //           {filtered.map((s) => (
// //             <div
// //               key={s._id}
// //               className="qbv-card"
// //               onClick={() => setSelected(s)}
// //             >
// //               <div className="qbv-card-top">
// //                 <div className="qbv-company-badge">🏢 {s.company}</div>
// //                 <div className="qbv-date">{formatDate(s.createdAt)}</div>
// //               </div>

// //               <div className="qbv-card-author">
// //                 <div className="qbv-avatar">
// //                   {s.name.trim()[0].toUpperCase()}
// //                 </div>
// //                 <div>
// //                   <div className="qbv-author-name">{s.name}</div>
// //                   <a
// //                     href={s.linkedin}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="qbv-linkedin"
// //                     onClick={(e) => e.stopPropagation()}
// //                   >
// //                     🔗 LinkedIn
// //                   </a>
// //                 </div>
// //               </div>

// //               {/* Preview of questions */}
// //               <div className="qbv-questions-preview">
// //                 {s.questions.slice(0, 3).map((q, i) => (
// //                   <div key={i} className="qbv-q-preview">
// //                     <span className="qbv-q-num">{i + 1}</span>
// //                     <span>{q}</span>
// //                   </div>
// //                 ))}
// //                 {s.questions.length > 3 && (
// //                   <div className="qbv-more">+{s.questions.length - 3} more questions</div>
// //                 )}
// //               </div>

// //               <div className="qbv-card-footer">
// //                 <span className="qbv-pill blue">❓ {s.questions.length} Questions</span>
// //                 <span className="qbv-pill indigo">📝 {s.additionalInfo.length} Tips</span>
// //                 <span className="qbv-view-btn">View All →</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Modal */}
// //       {selected && (
// //         <div className="qbv-modal-overlay" onClick={() => setSelected(null)}>
// //           <div className="qbv-modal" onClick={(e) => e.stopPropagation()}>
// //             <button className="qbv-modal-close" onClick={() => setSelected(null)}>✕</button>

// //             <div className="qbv-modal-header">
// //               <div className="qbv-modal-company">🏢 {selected.company}</div>
// //               <div className="qbv-modal-meta">
// //                 <div className="qbv-avatar large">{selected.name.trim()[0].toUpperCase()}</div>
// //                 <div>
// //                   <div className="qbv-author-name">{selected.name}</div>
// //                   <a href={selected.linkedin} target="_blank" rel="noreferrer" className="qbv-linkedin">
// //                     🔗 View LinkedIn
// //                   </a>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="qbv-modal-body">
// //               {/* Questions */}
// //               <div className="qbv-modal-section">
// //                 <div className="qbv-modal-section-title blue">
// //                   ❓ Interview Questions
// //                   <span className="qbv-count-pill blue">{selected.questions.length}</span>
// //                 </div>
// //                 <div className="qbv-modal-list">
// //                   {selected.questions.map((q, i) => (
// //                     <div key={i} className="qbv-modal-item">
// //                       <span className="qbv-row-num blue">{i + 1}</span>
// //                       <span>{q}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Tips */}
// //               <div className="qbv-modal-section">
// //                 <div className="qbv-modal-section-title indigo">
// //                   📝 Tips & Additional Info
// //                   <span className="qbv-count-pill indigo">{selected.additionalInfo.length}</span>
// //                 </div>
// //                 <div className="qbv-modal-list">
// //                   {selected.additionalInfo.map((a, i) => (
// //                     <div key={i} className="qbv-modal-item">
// //                       <span className="qbv-row-num indigo">{i + 1}</span>
// //                       <span>{a}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <p className="qbv-footer">Contributed by seniors · Built for juniors 💙</p>
// //     </div>
// //   );
// // }


import { useState, useEffect } from "react";
import "./QuestionBankView.css";

export default function QuestionBankView() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/submissions")
      .then((res) => res.json())
      .then((data) => { setSubmissions(data); setLoading(false); })
      .catch(() => { setError("Failed to load data"); setLoading(false); });
  }, []);

  // All questions flat with company tag
  const allQuestions = submissions.flatMap((s) =>
    s.questions.map((q) => ({ question: q, company: s.company.trim() }))
  );

  // Filter by company if search is active
  const filtered = search.trim()
    ? allQuestions.filter((q) =>
        q.company.toLowerCase().includes(search.trim().toLowerCase())
      )
    : allQuestions;

  return (
    <div className="qbv-page">
      {/* Header */}
      <div className="qbv-header">
        <span className="qbv-emoji">📚</span>
        <h1>Question Bank</h1>
        <p>Type a company name to see all interview questions asked there</p>

        <div className="qbv-search-wrap">
          <span className="qbv-search-icon">🔍</span>
          <input
            className="qbv-search"
            placeholder="e.g. Zomato, Google, Flipkart..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="qbv-clear-btn" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        {/* Stats bar */}
        {!loading && !error && (
          <div className="qbv-stats">
            <span className="qbv-stat-pill">
              📋 {filtered.length} Question{filtered.length !== 1 ? "s" : ""}
            </span>
            {search && (
              <span className="qbv-stat-pill active">
                🏢 {search}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="qbv-loading">
          <div className="qbv-spinner" />
          <p>Loading questions...</p>
        </div>
      )}

      {/* Error */}
      {error && <div className="qbv-error">⚠️ {error}</div>}

      {/* No results */}
      {!loading && !error && filtered.length === 0 && (
        <div className="qbv-empty">
          <span>🔎</span>
          <p>No questions found for <strong>"{search}"</strong></p>
          <button className="qbv-reset-btn" onClick={() => setSearch("")}>
            Show all questions
          </button>
        </div>
      )}

      {/* Questions */}
      {!loading && !error && filtered.length > 0 && (
        <div className="qbv-content">
          {filtered.map((item, i) => (
            <div key={i} className="qbv-question-item">
              <span className="qbv-q-num">{i + 1}</span>
              <span className="qbv-q-text">{item.question}</span>
            </div>
          ))}
        </div>
      )}

      <p className="qbv-footer">Contributed by seniors · Built for juniors 💙</p>
    </div>
  );
}
