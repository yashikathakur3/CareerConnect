import { useEffect, useMemo, useState } from "react";
import "../styles/AlumniPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const ACCENTS = ["blue", "green", "violet", "amber", "rose", "cyan"];

function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function AlumniPage() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");
  const [role, setRole] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/alumni`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const text = await res.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            "Backend returned HTML instead of JSON. Restart the backend server and make sure it is running on port 5000."
          );
        }

        if (!res.ok) throw new Error(data.message || "Failed to load alumni");
        return data;
      })
      .then((data) => {
        setAlumni(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const companies = useMemo(() => {
    return ["All", ...new Set(alumni.map((item) => item.company).filter(Boolean))].sort();
  }, [alumni]);

  const roles = useMemo(() => {
    return ["All", ...new Set(alumni.map((item) => item.jobRole).filter(Boolean))].sort();
  }, [alumni]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return alumni.filter((item) => {
      const matchesSearch =
        !query ||
        item.fullName?.toLowerCase().includes(query) ||
        item.company?.toLowerCase().includes(query) ||
        item.jobRole?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query);
      const matchesCompany = company === "All" || item.company === company;
      const matchesRole = role === "All" || item.jobRole === role;

      return matchesSearch && matchesCompany && matchesRole;
    });
  }, [alumni, company, role, search]);

  const totalQuestions = alumni.reduce((sum, item) => sum + item.questionCount, 0);
  const activeContributors = alumni.filter((item) => item.contributionCount > 0).length;

  return (
    <div className="ap-page">
      <section className="ap-hero">
        <div>
          <span className="ap-eyebrow">Alumni Network</span>
          <h1>Find Seniors Who Have Been There</h1>
          <p>
            Explore alumni by company and role, then use their shared interview
            experiences to prepare with better context.
          </p>
        </div>

        <div className="ap-stats">
          <div>
            <strong>{alumni.length}</strong>
            <span>Alumni</span>
          </div>
          <div>
            <strong>{activeContributors}</strong>
            <span>Contributors</span>
          </div>
          <div>
            <strong>{totalQuestions}</strong>
            <span>Questions</span>
          </div>
        </div>
      </section>

      <section className="ap-toolbar">
        <input
          className="ap-search"
          type="text"
          placeholder="Search by name, company, role, or email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          className="ap-filter-select"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        >
          {companies.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All companies" : item}
            </option>
          ))}
        </select>

        <select
          className="ap-filter-select"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          {roles.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All roles" : item}
            </option>
          ))}
        </select>

        <span className="ap-results">
          {filtered.length} of {alumni.length} shown
        </span>
      </section>

      {loading && (
        <div className="ap-state">
          <div className="ap-spinner" />
          <p>Loading alumni directory...</p>
        </div>
      )}

      {error && <div className="ap-error">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="ap-empty">
          <h2>No alumni found</h2>
          <p>Try a different search, company, or role filter.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <section className="ap-grid">
          {filtered.map((item, index) => (
            <article className={`ap-card ${ACCENTS[index % ACCENTS.length]}`} key={item.id}>
              <div className="ap-card-top">
                <div className="ap-avatar">{getInitials(item.fullName)}</div>
                <div>
                  <h2>{item.fullName}</h2>
                  <p>{item.email}</p>
                </div>
              </div>

              <div className="ap-role-row">
                <span>{item.jobRole || "Role not set"}</span>
                <span>{item.company || "Company not set"}</span>
              </div>

              <div className="ap-meta-grid">
                <div>
                  <strong>{item.year || "N/A"}</strong>
                  <span>Batch</span>
                </div>
                <div>
                  <strong>{item.contributionCount}</strong>
                  <span>Experiences</span>
                </div>
                <div>
                  <strong>{item.questionCount}</strong>
                  <span>Questions</span>
                </div>
              </div>

              <div className="ap-card-foot">
                <div>
                  <span>Shared roles</span>
                  <strong>
                    {item.rolesContributed.length
                      ? item.rolesContributed.slice(0, 2).join(", ")
                      : "No submissions yet"}
                  </strong>
                </div>
                <a href={item.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default AlumniPage;
