import { useAuth } from "../components/AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .cc-profile-page {
    min-height: 100vh;
    background: #f0f4f8;
    font-family: 'Inter', sans-serif;
    padding: 48px 24px;
  }

  .cc-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .cc-section-label {
    display: inline-flex;
    align-items: center;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  .cc-page-title {
    font-size: 36px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px;
    line-height: 1.15;
  }

  .cc-page-title span {
    color: #2563eb;
  }

  .cc-page-sub {
    font-size: 14px;
    color: #64748b;
    margin: 0 0 36px;
  }

  .cc-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    width:2000px;
  }

  .cc-card-header {
    background: linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%);
    padding: 32px 36px 28px;
    position: relative;
    overflow: hidden;
  }

  .cc-card-header::after {
    content: '';
    position: absolute;
    right: -40px;
    top: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
  }

  .cc-header-inner {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
  }

  .cc-avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    color: #2563eb;
    flex-shrink: 0;
    border: 3px solid rgba(255,255,255,0.3);
  }

  .cc-header-text h2 {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 4px;
  }

  .cc-header-text p {
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    margin: 0;
  }

  .cc-stats-row {
    display: flex;
    border-bottom: 1px solid #f1f5f9;
  }

  .cc-stat {
    flex: 1;
    padding: 20px 24px;
    text-align: center;
    border-right: 1px solid #f1f5f9;
  }

  .cc-stat:last-child {
    border-right: none;
  }

  .cc-stat-val {
    font-size: 18px;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 2px;
  }

  .cc-stat-lbl {
    font-size: 11px;
    font-weight: 500;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cc-info-section {
    padding: 28px 36px;
  }

  .cc-section-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
    margin: 0 0 16px;
  }

  .cc-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .cc-info-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .cc-info-item-label {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #94a3b8;
  }

  .cc-info-item-value {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cc-role-badge {
    display: inline-block;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 12px;
    border-radius: 20px;
    width: fit-content;
  }

  .cc-noauth {
    min-height: 100vh;
    background: #f0f4f8;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cc-noauth-box {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 48px 40px;
    text-align: center;
    max-width: 320px;
  }

  .cc-noauth-icon {
    width: 52px;
    height: 52px;
    background: #dbeafe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 22px;
  }

  .cc-noauth-title {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px;
  }

  .cc-noauth-sub {
    font-size: 13px;
    color: #64748b;
    margin: 0;
  }
`;

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <style>{styles}</style>
        <div className="cc-noauth">
          <div className="cc-noauth-box">
            <div className="cc-noauth-icon">🔒</div>
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
          <div className="cc-section-label">MY ACCOUNT</div>
          <h1 className="cc-page-title">
            User <span>Profile</span>
          </h1>
          <p className="cc-page-sub">View and manage your Career Connect account details.</p>

          <div className="cc-card">
            <div className="cc-card-header">
              <div className="cc-header-inner">
                <div className="cc-avatar">{getInitials(user.fullName)}</div>
                <div className="cc-header-text">
                  <h2>{user.fullName}</h2>
                  <p>Career Connect Member</p>
                </div>
              </div>
            </div>

            <div className="cc-stats-row">
              <div className="cc-stat">
                <div className="cc-stat-val">{user.year}</div>
                <div className="cc-stat-lbl">Year</div>
              </div>
              <div className="cc-stat">
                <div className="cc-stat-val">{user.role}</div>
                <div className="cc-stat-lbl">Role</div>
              </div>
              <div className="cc-stat">
                <div className="cc-stat-val">Active</div>
                <div className="cc-stat-lbl">Status</div>
              </div>
            </div>

            <div className="cc-info-section">
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
                  <span className="cc-role-badge">{user.role}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-item-label">Year</span>
                  <span className="cc-info-item-value">{user.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

