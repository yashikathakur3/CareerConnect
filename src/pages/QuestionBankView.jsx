import { useEffect, useMemo, useState } from "react";
import "./QuestionBankView.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const CATEGORIES = {
  companies: {
    label: "Companies",
    key: "company",
    cardLabel: "Company",
    empty: "No companies found",
  },
  roles: {
    label: "Job Roles",
    key: "jobRole",
    cardLabel: "Job Role",
    empty: "No job roles found",
  },
};
const CARD_ACCENTS = [
  "blue",
  "green",
  "violet",
  "amber",
  "rose",
  "cyan",
];

function formatDate(date) {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function buildQuestionItems(submissions) {
  return submissions.flatMap((submission) =>
    (submission.questions || []).map((question, index) => ({
      id: `${submission._id}-${index}`,
      question,
      questionNumber: index + 1,
      company: submission.company || "Unknown Company",
      jobRole: submission.jobRole || "Not specified",
      uploadedBy: submission.name,
      linkedin: submission.linkedin,
      email: submission.email,
      tips: submission.additionalInfo || [],
      createdAt: submission.createdAt,
      experienceId: submission._id,
      totalQuestions: submission.questions?.length || 0,
    }))
  );
}

export default function QuestionBankView() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("companies");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/submissions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load data");
        return data;
      })
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const allQuestions = useMemo(() => buildQuestionItems(submissions), [submissions]);

  const groups = useMemo(() => {
    const groupKey = CATEGORIES[activeCategory].key;
    const map = new Map();

    allQuestions.forEach((item) => {
      const title = item[groupKey] || "Not specified";
      const existing = map.get(title) || {
        title,
        questions: [],
        companies: new Set(),
        roles: new Set(),
        alumni: new Set(),
        latestDate: null,
      };

      existing.questions.push(item);
      existing.companies.add(item.company);
      existing.roles.add(item.jobRole);
      if (item.uploadedBy) existing.alumni.add(item.uploadedBy);
      if (!existing.latestDate || new Date(item.createdAt) > new Date(existing.latestDate)) {
        existing.latestDate = item.createdAt;
      }

      map.set(title, existing);
    });

    return Array.from(map.values())
      .map((group) => ({
        ...group,
        companies: Array.from(group.companies),
        roles: Array.from(group.roles),
        alumniCount: group.alumni.size,
      }))
      .sort((a, b) => b.questions.length - a.questions.length);
  }, [activeCategory, allQuestions]);

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return groups;

    return groups.filter((group) => {
      const inTitle = group.title.toLowerCase().includes(query);
      const inCompany = group.companies.some((company) =>
        company.toLowerCase().includes(query)
      );
      const inRole = group.roles.some((role) => role.toLowerCase().includes(query));
      const inQuestions = group.questions.some((item) =>
        item.question.toLowerCase().includes(query) ||
        item.uploadedBy?.toLowerCase().includes(query)
      );

      return inTitle || inCompany || inRole || inQuestions;
    });
  }, [groups, search]);

  const totalCompanies = new Set(allQuestions.map((item) => item.company)).size;
  const totalRoles = new Set(allQuestions.map((item) => item.jobRole)).size;

  const openGroup = (group) => {
    setSelectedGroup(group);
    setSelectedQuestion(group.questions[0] || null);
  };

  const closeGroup = () => {
    setSelectedGroup(null);
    setSelectedQuestion(null);
  };

  return (
    <div className="qbv-page">
      <div className="qbv-header">
        <span className="qbv-eyebrow">Question Bank</span>
        <h1>Browse Placement Questions by Category</h1>
        <p>
          Pick a company or job role, scan question lists, and open the
          full alumni context when you need details.
        </p>

        <div className="qbv-search-wrap">
          <span className="qbv-search-icon">Search</span>
          <input
            className="qbv-search"
            placeholder="Search company, role, alumni, or question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="qbv-clear-btn" onClick={() => setSearch("")} type="button">
              Clear
            </button>
          )}
        </div>

        {!loading && !error && (
          <>
            <div className="qbv-tabs">
              {Object.entries(CATEGORIES).map(([key, category]) => (
                <button
                  key={key}
                  className={`qbv-tab ${activeCategory === key ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(key);
                    setSelectedGroup(null);
                    setSelectedQuestion(null);
                  }}
                  type="button"
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="qbv-stats">
              <span className="qbv-stat-pill">{totalCompanies} Companies</span>
              <span className="qbv-stat-pill">{totalRoles} Job Roles</span>
              <span className="qbv-stat-pill">{submissions.length} Experiences</span>
              <span className="qbv-stat-pill">{allQuestions.length} Questions</span>
            </div>
          </>
        )}
      </div>

      {loading && (
        <div className="qbv-loading">
          <div className="qbv-spinner" />
          <p>Loading interview questions...</p>
        </div>
      )}

      {error && <div className="qbv-error">{error}</div>}

      {!loading && !error && filteredGroups.length === 0 && (
        <div className="qbv-empty">
          <h2>{CATEGORIES[activeCategory].empty}</h2>
          <p>Try searching for another company, role, alumni, or question.</p>
          <button className="qbv-reset-btn" onClick={() => setSearch("")} type="button">
            Show all
          </button>
        </div>
      )}

      {!loading && !error && filteredGroups.length > 0 && (
        <div className="qbv-grid">
          {filteredGroups.map((group, index) => (
            <button
              className={`qbv-category-card ${CARD_ACCENTS[index % CARD_ACCENTS.length]}`}
              key={group.title}
              onClick={() => openGroup(group)}
              type="button"
            >
              <div className="qbv-card-head">
                <div>
                  <span className="qbv-card-label">
                    {CATEGORIES[activeCategory].cardLabel}
                  </span>
                  <h2>{group.title}</h2>
                </div>
                <div className="qbv-company-mark">{group.title.slice(0, 2).toUpperCase()}</div>
              </div>

              <div className="qbv-card-meta">
                <span>{group.questions.length} questions</span>
                <span>{group.alumniCount} alumni</span>
                <span>{formatDate(group.latestDate)}</span>
              </div>

              <div className="qbv-role-row">
                {(activeCategory === "companies" ? group.roles : group.companies)
                  .slice(0, 3)
                  .map((item) => (
                    <span key={item}>{item}</span>
                  ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedGroup && (
        <div className="qbv-modal-overlay" onClick={closeGroup}>
          <div className="qbv-modal qbv-question-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qbv-modal-header">
              <div>
                <span className="qbv-card-label">
                  {CATEGORIES[activeCategory].cardLabel} questions
                </span>
                <h2>{selectedGroup.title}</h2>
                <p>
                  {selectedGroup.questions.length} questions from{" "}
                  {selectedGroup.alumniCount} alumni contributor
                  {selectedGroup.alumniCount !== 1 ? "s" : ""}.
                </p>
              </div>
              <button className="qbv-modal-close" onClick={closeGroup} type="button">
                Close
              </button>
            </div>

            <div className="qbv-modal-split">
              <div className="qbv-question-list">
                <div className="qbv-panel-title">
                  <span>Question List</span>
                  <strong>{selectedGroup.questions.length}</strong>
                </div>
                {selectedGroup.questions.map((item, index) => (
                  <button
                    key={item.id}
                    className={`qbv-question-row ${
                      selectedQuestion?.id === item.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedQuestion(item)}
                    type="button"
                  >
                    <span className="qbv-row-index">{index + 1}</span>
                    <span className="qbv-row-main">
                      <strong>{item.question}</strong>
                      <small>
                        {item.company} · {item.jobRole} · {item.uploadedBy}
                      </small>
                    </span>
                    <span className="qbv-row-tip">{item.tips.length} tips</span>
                  </button>
                ))}
              </div>

              <aside className="qbv-question-detail">
                {selectedQuestion ? (
                  <>
                    <div className="qbv-detail-top">
                      <span className="qbv-card-label">Question details</span>
                      <h3>{selectedQuestion.question}</h3>
                    </div>

                    <div className="qbv-detail-grid">
                      <div>
                        <span>Company</span>
                        <strong>{selectedQuestion.company}</strong>
                      </div>
                      <div>
                        <span>Job Role</span>
                        <strong>{selectedQuestion.jobRole}</strong>
                      </div>
                      <div>
                        <span>Uploaded By</span>
                        <strong>{selectedQuestion.uploadedBy}</strong>
                      </div>
                      <div>
                        <span>Date</span>
                        <strong>{formatDate(selectedQuestion.createdAt)}</strong>
                      </div>
                    </div>

                    <div className="qbv-uploader">
                      <div className="qbv-avatar large">
                        {getInitials(selectedQuestion.uploadedBy)}
                      </div>
                      <div>
                        <p>Shared by {selectedQuestion.uploadedBy}</p>
                        <small>
                          Question {selectedQuestion.questionNumber} of{" "}
                          {selectedQuestion.totalQuestions} from this experience
                        </small>
                      </div>
                      <a
                        href={selectedQuestion.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="qbv-linkedin"
                      >
                        LinkedIn
                      </a>
                    </div>

                    <div className="qbv-detail-section tips">
                      <h4>Tips and Context</h4>
                      <div className="qbv-detail-list">
                        {selectedQuestion.tips.map((tip, index) => (
                          <div className="qbv-detail-item tip" key={tip}>
                            <span>{index + 1}</span>
                            <p>{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="qbv-detail-empty">Select a question to see details.</p>
                )}
              </aside>
            </div>
          </div>
        </div>
      )}

      <p className="qbv-footer">Contributed by alumni. Built for placement prep.</p>
    </div>
  );
}
