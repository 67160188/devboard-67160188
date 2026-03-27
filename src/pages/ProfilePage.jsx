import { useFavorites } from "../context/FavoritesContext";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetch from "../hooks/useFetch";

function ProfilePage() {
  const { favorites } = useFavorites();
  const { data: users, loading } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <LoadingSpinner />;

  const user = users?.[0];

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ color: "#2d3748", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}>
        👤 โปรไฟล์
      </h2>

      {user && (
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{
              width: "60px", height: "60px", background: "#1e40af", color: "white",
              borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem",
            }}>
              {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h3 style={{ margin: 0, color: "#2d3748" }}>{user.name}</h3>
              <p style={{ margin: 0, color: "#718096", fontSize: "0.9rem" }}>{user.email}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "เว็บไซต์", value: user.website },
              { label: "บริษัท", value: user.company?.name },
              { label: "เมือง", value: user.address?.city },
              { label: "โทรศัพท์", value: user.phone },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "#f7fafc", borderRadius: "6px", padding: "0.75rem" }}>
                <div style={{ fontSize: "0.8rem", color: "#718096" }}>{label}</div>
                <div style={{ color: "#2d3748", fontWeight: "500" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.5rem" }}>
        <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>สถิติ</h3>
        <p style={{ color: "#4a5568" }}>โพสต์ที่ถูกใจ: <strong style={{ color: "#e53e3e" }}>❤️ {favorites.length} รายการ</strong></p>
      </div>
    </div>
  );
}

export default ProfilePage;
