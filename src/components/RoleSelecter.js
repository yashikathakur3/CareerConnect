function RoleSelector({ value, onChange }) {
  return (
    <div className="cc-field">
      <label className="cc-label">I am a</label>
      <div className="cc-role-group">
        {["student", "alumni"].map((role) => (
          <label className="cc-role-option" key={role}>
            <input
              type="radio"
              name="role"
              value={role}
              checked={value === role}
              onChange={onChange}
            />
            <span className="cc-role-label">
              {role === "student" ? "🎓" : "💼"}{" "}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RoleSelector;