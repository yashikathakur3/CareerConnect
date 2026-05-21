import { useAuth } from "../components/AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

  .cc-profile-page {
    min-height: calc(100vh - 62px);
    padding: 42px 24px 64px;
    background:
      linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(20, 184, 166, 0.06) 46%, rgba(245, 158, 11, 0.06)),
      #f7f9fc;
    font-family: 'Outfit', sans-serif;
    color: #0f172a;
  }

  .cc-container {
    width: min(100%, 980px);
    margin: 0 auto;
  }

  .cc-profile-hero {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    margin-bottom: 24px;
  }

  .cc-section-label {
    display: inline-flex;
    width: fit-content;
    border-radius: 999px;
    background: rgba(37, 99, 235, 0.1);
    color: #1d4ed8;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 6px 12px;
    text-transform: uppercase;
  }

  .cc-page-title {
    margin: 16px 0 8px;
    font-size: 34px;
    line-height: 1.08;
    font-weight: 700;
    letter-spacing: 0;
  }

  .cc-page-sub {
    max-width: 560px;
    color: #64748b;
    font-size: 15px;
    line-height: 1.55;
    font-weight: 500;
  }

  .cc-status-pill {
    border-radius: 999px;
    background: #ecfdf5;
    color: #047857;
    padding: 9px 14px;
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
  }

  .cc-profile-grid {
    display: grid;
    grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
    gap: 18px;
  }

  .cc-profile-card,
  .cc-info-panel {
    border: 1px solid rgba(148, 163, 184, 0.24);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.86);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.07);
    overflow: hidden;
  }

  .cc-profile-card {
    position: relative;
    padding: 24px;
  }

  .cc-profile-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(219, 234, 254, 0.95), rgba(240, 253, 250, 0.72) 62%, transparent);
    pointer-events: none;
  }

  .cc-profile-card > * {
    position: relative;
    z-index: 1;
  }

  .cc-avatar {
    width: 78px;
    height: 78px;
    border-radius: 24px;
    background: #1d4ed8;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 18px;
  }

  .cc-profile-card h2 {
    font-size: 24px;
    line-height: 1.12;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .cc-profile-card p {
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
  }

  .cc-role-badge {
    display: inline-flex;
    width: fit-content;
    margin-top: 16px;
    border-radius: 999px;
    background: #eff6ff;
    color: #1d4ed8;
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .cc-stat-stack {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 22px;
  }

  .cc-stat {
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.74);
    padding: 14px;
  }

  .cc-stat-val {
    display: block;
    color: #0f172a;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.15;
  }

  .cc-stat-lbl {
    display: block;
    margin-top: 5px;
    color: #64748b;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .cc-info-panel {
    padding: 24px;
  }

  .cc-section-title {
    margin-bottom: 16px;
    color: #64748b;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .cc-info-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .cc-info-item {
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 18px;
    background: linear-gradient(135deg, #f8fafc, #ffffff);
    padding: 16px;
  }

  .cc-info-item-label {
    display: block;
    margin-bottom: 7px;
    color: #64748b;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .cc-info-item-value {
    display: block;
    min-width: 0;
    overflow: hidden;
    color: #0f172a;
    font-size: 15px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cc-note {
    margin-top: 16px;
    border-radius: 18px;
    background: linear-gradient(135deg, #eff6ff, #f0fdfa);
    color: #475569;
    padding: 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.55;
  }

  .cc-noauth {
    min-height: calc(100vh - 62px);
    background: #f7f9fc;
    font-family: 'Outfit', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .cc-noauth-box {
    width: min(100%, 360px);
    background: #fff;
    border: 1px solid rgba(148, 163, 184, 0.24);
    border-radius: 24px;
    padding: 36px 30px;
    text-align: center;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.07);
  }

  .cc-noauth-icon {
    width: 52px;
    height: 52px;
    background: #dbeafe;
    color: #1d4ed8;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 22px;
  }

  .cc-noauth-title {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px;
  }

  .cc-noauth-sub {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }

  @media (max-width: 820px) {
    .cc-profile-hero {
      align-items: flex-start;
      flex-direction: column;
    }

    .cc-profile-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .cc-profile-page {
      padding: 30px 14px 48px;
    }

    .cc-page-title {
      font-size: 28px;
    }

    .cc-info-grid,
    .cc-stat-stack {
      grid-template-columns: 1fr;
    }
  }
`;

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function titleCase(value) {
  if (!value) return "Not set";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <style>{styles}</style>
        <div className="cc-noauth">
          <div className="cc-noauth-box">
            <div className="cc-noauth-icon">!</div>
            <h2 className="cc-noauth-title">Please login first</h2>
            <p className="cc-noauth-sub">You need to be logged in to view your profile.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="cc-profile-page">
        <div className="cc-container">
          <section className="cc-profile-hero">
            <div>
              <div className="cc-section-label">My Account</div>
              <h1 className="cc-page-title">Profile Overview</h1>
              <p className="cc-page-sub">
                View your Career Connect identity, account role, and academic details.
              </p>
            </div>
            <div className="cc-status-pill">Active account</div>
          </section>

          <section className="cc-profile-grid">
            <aside className="cc-profile-card">
              <div className="cc-avatar">{getInitials(user.fullName)}</div>
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
              <div className="cc-role-badge">{titleCase(user.role)}</div>

              <div className="cc-stat-stack">
                <div className="cc-stat">
                  <span className="cc-stat-val">{user.year || "N/A"}</span>
                  <span className="cc-stat-lbl">Year</span>
                </div>
                <div className="cc-stat">
                  <span className="cc-stat-val">{titleCase(user.role)}</span>
                  <span className="cc-stat-lbl">Role</span>
                </div>
              </div>
            </aside>

            <section className="cc-info-panel">
              <div className="cc-section-title">Account Information</div>
              <div className="cc-info-grid">
                <div className="cc-info-item">
                  <span className="cc-info-item-label">Full Name</span>
                  <span className="cc-info-item-value">{user.fullName}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-item-label">Email</span>
                  <span className="cc-info-item-value">{user.email}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-item-label">Role</span>
                  <span className="cc-info-item-value">{titleCase(user.role)}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-item-label">Year / Batch</span>
                  <span className="cc-info-item-value">{user.year || "Not set"}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-item-label">Company</span>
                  <span className="cc-info-item-value">{user.company || "Not set"}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-item-label">Job Role</span>
                  <span className="cc-info-item-value">{user.jobRole || "Not set"}</span>
                </div>
              </div>

              <div className="cc-note">
                {user.role === "alumni"
                  ? "As an alumni member, you can submit interview experiences and help juniors prepare with real company-specific guidance."
                  : "As a student member, you can explore question banks and connect with alumni for placement preparation."}
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default Profile;
