import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function PostCard({ post }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(post.id);

  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      background: "white",
    }}>
      <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>{post.title}</h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>{post.body}</p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            color: favorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {favorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>

        <Link
          to={`/posts/${post.id}`}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
            textDecoration: "none",
          }}
        >
          💬 ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
