import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "0.4rem 0.75rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
    background: location.pathname === path ? "rgba(255,255,255,0.2)" : "transparent",
  });

  return (
    <nav style={{
      background: "#1e40af",
      color: "white",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>กระดานนักพัฒนา</p>
        </div>
      </Link>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Link to="/" style={linkStyle("/")}>🏠 หน้าแรก</Link>
        <Link to="/favorites" style={linkStyle("/favorites")}>
          ❤️ ถูกใจ
          {favorites.length > 0 && (
            <span style={{
              background: "#e53e3e",
              borderRadius: "10px",
              padding: "0.1rem 0.4rem",
              fontSize: "0.75rem",
              marginLeft: "0.3rem",
            }}>
              {favorites.length}
            </span>
          )}
        </Link>
        <Link to="/profile" style={linkStyle("/profile")}>👤 โปรไฟล์</Link>
      </div>
    </nav>
  );
}

export default Navbar;
