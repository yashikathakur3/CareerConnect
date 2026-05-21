import { useEffect, useMemo, useState } from "react";
import "./QuestionBankView.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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

export default function QuestionBankView() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  const companyGroups = useMemo(() => {
    const groups = new Map();

    submissions.forEach((submission) => {
      const company = submission.company?.trim() || "Unknown Company";
      const existing = groups.get(company) || {
        company,
        experiences: [],
        questions: [],
        tips: [],
        alumni: new Set(),
      };

      existing.experiences.push(submission);
      existing.questions.push(...(submission.questions || []));
      existing.tips.push(...(submission.additionalInfo || []));
      if (submission.name) existing.alumni.add(submission.name);

      groups.set(company, existing);
    });

    return Array.from(groups.values())
      .map((group) => ({
        ...group,
        alumniCount: group.alumni.size,
      }))
      .sort((a, b) => b.experiences.length - a.experiences.length);
  }, [submissions]);

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return companyGroups;

    return companyGroups.filter((group) => {
      const matchesCompany = group.company.toLowerCase().includes(query);
      const matchesAlumni = group.experiences.some((experience) =>
        experience.name?.toLowerCase().includes(query)
      );
      const matchesQuestion = group.questions.some((question) =>
        question.toLowerCase().includes(query)
      );

      return matchesCompany || matchesAlumni || matchesQuestion;
    });
  }, [companyGroups, search]);

  const totalQuestions = companyGroups.reduce(
    (sum, company) => sum + company.questions.length,
    0
  );

  const totalTips = companyGroups.reduce(
    (sum, company) => sum + company.tips.length,
    0
  );

  return (
    <div className="qbv-page">
      <div className="qbv-header">
        <span className="qbv-eyebrow">Question Bank</span>
        <h1>Explore Interview Experiences by Company</h1>
        <p>
          Browse real questions, alumni context, and preparation tips shared by seniors.
        </p>

        <div className="qbv-search-wrap">
          <span className="qbv-search-icon">Search</span>
          <input
            className="qbv-search"
            placeholder="Search company, question, or alumni..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="qbv-clear-btn"
              onClick={() => setSearch("")}
              type="button"
            >
              Clear
            </button>
          )}
        </div>

        {!loading && !error && (
          <div className="qbv-stats">
            <span className="qbv-stat-pill">{companyGroups.length} Companies</span>
            <span className="qbv-stat-pill">{submissions.length} Experiences</span>
            <span className="qbv-stat-pill">{totalQuestions} Questions</span>
            <span className="qbv-stat-pill">{totalTips} Tips</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="qbv-loading">
          <div className="qbv-spinner" />
          <p>Loading interview experiences...</p>
        </div>
      )}

      {error && <div className="qbv-error">{error}</div>}

      {!loading && !error && filteredCompanies.length === 0 && (
        <div className="qbv-empty">
          <h2>No matching experiences found</h2>
          <p>Try searching for another company, question, or alumni name.</p>
          <button className="qbv-reset-btn" onClick={() => setSearch("")} type="button">
            Show all companies
          </button>
        </div>
      )}

      {!loading && !error && filteredCompanies.length > 0 && (
        <div className="qbv-grid">
          {filteredCompanies.map((group) => {
            const latest = group.experiences[0];
            const previewQuestions = group.questions.slice(0, 3);
            const previewTip = group.tips[0];

            return (
              <article className="qbv-company-card" key={group.company}>
                <div className="qbv-card-head">
                  <div>
                    <span className="qbv-card-label">Company</span>
                    <h2>{group.company}</h2>
                  </div>
                  <div className="qbv-company-mark">
                    {group.company.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="qbv-card-meta">
                  <span>{group.experiences.length} experience{group.experiences.length !== 1 ? "s" : ""}</span>
                  <span>{group.questions.length} questions</span>
                  <span>{group.alumniCount} alumni</span>
                </div>

                <div className="qbv-author-strip">
                  <div className="qbv-avatar">{getInitials(latest?.name)}</div>
                  <div>
                    <p>Latest shared by</p>
                    <strong>{latest?.name}</strong>
                  </div>
                  <span>{formatDate(latest?.createdAt)}</span>
                </div>

                <div className="qbv-preview-list">
                  {previewQuestions.map((question, index) => (
                    <div className="qbv-preview-question" key={`${group.company}-${index}`}>
                      <span>{index + 1}</span>
                      <p>{question}</p>
                    </div>
                  ))}
                </div>

                {previewTip && (
                  <div className="qbv-tip-preview">
                    <span>Alumni tip</span>
                    <p>{previewTip}</p>
                  </div>
                )}

                <button
                  className="qbv-view-btn"
                  onClick={() => setSelectedCompany(group)}
                  type="button"
                >
                  View full experience
                </button>
              </article>
            );
          })}
        </div>
      )}

      {selectedCompany && (
        <div className="qbv-modal-overlay" onClick={() => setSelectedCompany(null)}>
          <div className="qbv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qbv-modal-header">
              <div>
                <span className="qbv-card-label">Company details</span>
                <h2>{selectedCompany.company}</h2>
                <p>
                  {selectedCompany.experiences.length} alumni experience
                  {selectedCompany.experiences.length !== 1 ? "s" : ""} with{" "}
                  {selectedCompany.questions.length} questions.
                </p>
              </div>
              <button
                className="qbv-modal-close"
                onClick={() => setSelectedCompany(null)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="qbv-modal-body">
              {selectedCompany.experiences.map((experience) => (
                <section className="qbv-experience" key={experience._id}>
                  <div className="qbv-experience-head">
                    <div className="qbv-avatar large">{getInitials(experience.name)}</div>
                    <div>
                      <h3>{experience.name}</h3>
                      <p>{formatDate(experience.createdAt)}</p>
                    </div>
                    <a
                      href={experience.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="qbv-linkedin"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div className="qbv-detail-section">
                    <h4>Interview Questions</h4>
                    <div className="qbv-detail-list">
                      {(experience.questions || []).map((question, index) => (
                        <div className="qbv-detail-item" key={`${experience._id}-q-${index}`}>
                          <span>{index + 1}</span>
                          <p>{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="qbv-detail-section tips">
                    <h4>Tips and Context</h4>
                    <div className="qbv-detail-list">
                      {(experience.additionalInfo || []).map((tip, index) => (
                        <div className="qbv-detail-item tip" key={`${experience._id}-t-${index}`}>
                          <span>{index + 1}</span>
                          <p>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="qbv-footer">Contributed by alumni. Built for placement prep.</p>
    </div>
  );
}
