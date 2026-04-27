import { useState } from "react";
import "../styles/AlumniPage.css";

var alumniData = [
  { id: 1,  name: "Mohit Thakur",       linkedin: "https://linkedin.com/in/yashika-thakur",     company: "Microsoft", role: "SDE-2",                batch: "2021", color: "#1a73e8" },
  { id: 2,  name: "Rahul Sharma",       linkedin: "https://linkedin.com/in/rahul-sharma",       company: "Google",    role: "Software Engineer",    batch: "2020", color: "#34a853" },
  { id: 3,  name: "Priya Mehta",        linkedin: "https://linkedin.com/in/priya-mehta",        company: "Amazon",    role: "SDE-1",                batch: "2022", color: "#ff6b35" },
  { id: 4,  name: "Arjun Verma",        linkedin: "https://linkedin.com/in/arjun-verma",        company: "Infosys",   role: "Systems Engineer",     batch: "2019", color: "#6366f1" },
  { id: 5,  name: "Sneha Kapoor",       linkedin: "https://linkedin.com/in/sneha-kapoor",       company: "TCS",       role: "Associate Consultant", batch: "2020", color: "#ec4899" },
  { id: 6,  name: "Vikram Singh",       linkedin: "https://linkedin.com/in/vikram-singh",       company: "Wipro",     role: "Project Engineer",     batch: "2018", color: "#0ea5e9" },
  { id: 7,  name: "Ananya Joshi",       linkedin: "https://linkedin.com/in/ananya-joshi",       company: "Flipkart",  role: "Product Analyst",      batch: "2021", color: "#f59e0b" },
  { id: 8,  name: "Rohan Gupta",        linkedin: "https://linkedin.com/in/rohan-gupta",        company: "Zomato",    role: "Backend Engineer",     batch: "2022", color: "#ef4444" },
  { id: 9,  name: "Kavya Reddy",        linkedin: "https://linkedin.com/in/kavya-reddy",        company: "Paytm",     role: "Data Analyst",         batch: "2020", color: "#8b5cf6" },
  { id: 10, name: "Nikhil Bansal",      linkedin: "https://linkedin.com/in/nikhil-bansal",      company: "Razorpay",  role: "Frontend Engineer",    batch: "2021", color: "#14b8a6" },
  { id: 11, name: "Divya Nair",         linkedin: "https://linkedin.com/in/divya-nair",         company: "BYJUS",     role: "Content Engineer",     batch: "2022", color: "#f97316" },
  { id: 12, name: "Aditya Khanna",      linkedin: "https://linkedin.com/in/aditya-khanna",      company: "PhonePe",   role: "SDE-2",                batch: "2019", color: "#06b6d4" },
  { id: 13, name: "Meera Pillai",       linkedin: "https://linkedin.com/in/meera-pillai",       company: "Swiggy",    role: "ML Engineer",          batch: "2021", color: "#10b981" },
  { id: 14, name: "Siddharth Malhotra", linkedin: "https://linkedin.com/in/siddharth-malhotra", company: "Ola",       role: "Platform Engineer",    batch: "2020", color: "#3b82f6" },
  { id: 15, name: "Pooja Agarwal",      linkedin: "https://linkedin.com/in/pooja-agarwal",      company: "HCL",       role: "Tech Lead",            batch: "2017", color: "#d946ef" },
];

function getInitials(name) {
  var parts = name.split(" ");
  var first = parts[0] ? parts[0][0] : "";
  var second = parts[1] ? parts[1][0] : "";
  return (first + second).toUpperCase();
}

function openLink(url) {
  window.open(url, "_blank");
}

function AlumniRow(props) {
  var alumni = props.alumni;
  var index = props.index;
  return (
    <div className="ap-row" style={{ animationDelay: index * 0.04 + "s" }}>

      <div className="ap-td ap-td-name">
        <div className="ap-avatar" style={{ background: alumni.color }}>
          {getInitials(alumni.name)}
        </div>
        <span>{alumni.name}</span>
      </div>

      <div className="ap-td">
        <button
          className="ap-linkedin-btn"
          onClick={function() { openLink(alumni.linkedin); }}
        >
          LinkedIn
        </button>
      </div>

      <div className="ap-td">
        <span className="ap-company-name">{alumni.company}</span>
      </div>

      <div className="ap-td">
        <span className="ap-role-badge">{alumni.role}</span>
      </div>

      <div className="ap-td">
        <span className="ap-batch">{alumni.batch}</span>
      </div>

    </div>
  );
}

function AlumniPage() {
  var searchState = useState("");
  var search = searchState[0];
  var setSearch = searchState[1];

  var companyState = useState("All");
  var filterCompany = companyState[0];
  var setFilterCompany = companyState[1];

  var batchState = useState("All");
  var filterBatch = batchState[0];
  var setFilterBatch = batchState[1];

  var companyList = ["All"];
  alumniData.forEach(function(a) {
    if (companyList.indexOf(a.company) === -1) {
      companyList.push(a.company);
    }
  });

  var batchList = ["All"];
  alumniData.forEach(function(a) {
    if (batchList.indexOf(a.batch) === -1) {
      batchList.push(a.batch);
    }
  });
  batchList.sort();

  var filtered = alumniData.filter(function(a) {
    var q = search.toLowerCase();
    var matchSearch =
      a.name.toLowerCase().indexOf(q) !== -1 ||
      a.company.toLowerCase().indexOf(q) !== -1 ||
      a.role.toLowerCase().indexOf(q) !== -1;
    var matchCompany = filterCompany === "All" || a.company === filterCompany;
    var matchBatch = filterBatch === "All" || a.batch === filterBatch;
    return matchSearch && matchCompany && matchBatch;
  });

  return (
    <div className="ap-root">

      {/* <nav className="ap-nav">
        <div className="ap-nav-brand">
          <div className="ap-nav-icon">CC</div>
          <h2>Career<span>Connect</span></h2>
        </div>
        <ul className="ap-nav-links">
          <li><span className="ap-nav-link">Home</span></li>
          <li><span className="ap-nav-link">About</span></li>
          <li><span className="ap-nav-link active">Alumni</span></li>
          <li><span className="ap-nav-link">Events</span></li>
        </ul>
        <button className="ap-nav-btn">Get Started</button>
      </nav> */}

      <div className="ap-page">

        <div className="ap-header">
          <div className="ap-header-top">
            <div className="ap-header-left">
              <span className="ap-eyebrow">Our Network</span>
              <h1>Alumni <span>Directory</span></h1>
              <p className="ap-header-sub">
                Connect with graduates from our college working at top companies.
                Click LinkedIn to reach out directly.
              </p>
            </div>
            <div className="ap-stats">
              <div className="ap-stat-pill">
                <span className="ap-stat-num">{alumniData.length}</span>
                <span className="ap-stat-label">Alumni</span>
              </div>
              <div className="ap-stat-pill">
                <span className="ap-stat-num">{companyList.length - 1}</span>
                <span className="ap-stat-label">Companies</span>
              </div>
              <div className="ap-stat-pill">
                <span className="ap-stat-num">{batchList.length - 1}</span>
                <span className="ap-stat-label">Batches</span>
              </div>
            </div>
          </div>

          <div className="ap-controls">
            <input
              className="ap-search"
              type="text"
              placeholder="Search by name, company or role..."
              value={search}
              onChange={function(e) { setSearch(e.target.value); }}
            />
            <select
              className="ap-filter-select"
              value={filterCompany}
              onChange={function(e) { setFilterCompany(e.target.value); }}
            >
              {companyList.map(function(c) {
                return (
                  <option key={c} value={c}>
                    {c === "All" ? "All Companies" : c}
                  </option>
                );
              })}
            </select>
            <select
              className="ap-filter-select"
              value={filterBatch}
              onChange={function(e) { setFilterBatch(e.target.value); }}
            >
              {batchList.map(function(b) {
                return (
                  <option key={b} value={b}>
                    {b === "All" ? "All Batches" : "Batch " + b}
                  </option>
                );
              })}
            </select>
            <span className="ap-results-count">
              <strong>{filtered.length}</strong> of {alumniData.length} shown
            </span>
          </div>
        </div>

        <div className="ap-table-card">

          <div className="ap-table-head">
            <div className="ap-th">Name</div>
            <div className="ap-th">LinkedIn</div>
            <div className="ap-th">Company</div>
            <div className="ap-th">Role</div>
            <div className="ap-th">Batch</div>
          </div>

          <div className="ap-table-body">
            {filtered.length === 0 ? (
              <div className="ap-empty">
                <h3>No alumni found</h3>
                <p>Try changing your search or filters</p>
              </div>
            ) : (
              filtered.map(function(alumni, index) {
                return (
                  <AlumniRow
                    key={alumni.id}
                    alumni={alumni}
                    index={index}
                  />
                );
              })
            )}
          </div>

        </div>

        <p className="ap-footer">
          Verified alumni from our college network
        </p>

      </div>
    </div>
  );
}

export default AlumniPage;