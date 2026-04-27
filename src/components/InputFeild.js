function InputField({ label, type = "text", name, value, onChange, error, placeholder }) {
  return (
    <div className="cc-field">
      <label className="cc-label">{label}</label>
      <input
        className={`cc-input${error ? " error" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      {error && <p className="cc-error-msg">⚠ {error}</p>}
    </div>
  );
}

export default InputField;