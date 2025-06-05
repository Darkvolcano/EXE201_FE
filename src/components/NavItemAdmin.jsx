export function NavItem({ icon, label, active = false }) {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`}>
      <div className={`nav-item-icon ${active ? 'active' : ''}`}>
        {icon}
      </div>
      <span className={`nav-item-label ${active ? 'active' : ''}`}>{label}</span>
    </div>
  );
}