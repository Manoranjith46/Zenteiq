function Header({ title, subtitle, meta, actions, onMenuClick }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick} aria-label="Open navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {meta && <p className="header-meta">{meta}</p>}
        </div>
      </div>
      {actions}
    </header>
  )
}

export default Header
