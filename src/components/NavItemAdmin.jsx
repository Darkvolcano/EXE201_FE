export function NavItem({ icon, label, active = false, onClick }) {
  return (
    <div
      className={`nav-item ${active ? "active" : ""}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className={`nav-item-icon ${active ? "active" : ""}`}>{icon}</div>
      <span className={`nav-item-label ${active ? "active" : ""}`}>
        {label}
      </span>
    </div>
  );
}
