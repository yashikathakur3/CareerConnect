function FeatureCard({ title }) {
  const handleClick = () => {
    alert(title);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="icon">🎓</div>
      <p>{title}</p>
    </div>
  );
}

export default FeatureCard;