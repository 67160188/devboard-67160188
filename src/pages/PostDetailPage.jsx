import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "../components/CommentList";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetch from "../hooks/useFetch";

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <p style={{ color: "#c53030" }}>เกิดข้อผิดพลาด: {error}</p>
    </div>
  );

  const favorite = isFavorite(post.id);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <button onClick={() => navigate(-1)} style={{
        background: "none", border: "1px solid #cbd5e0", borderRadius: "6px",
        padding: "0.4rem 0.9rem", cursor: "pointer", marginBottom: "1.5rem",
        color: "#4a5568", fontSize: "0.9rem",
      }}>
        ← กลับ
      </button>

      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.5rem" }}>
        <h2 style={{ color: "#1e40af", margin: "0 0 1rem" }}>{post.title}</h2>
        <p style={{ color: "#4a5568", lineHeight: 1.8, marginBottom: "1rem" }}>{post.body}</p>

        <button onClick={() => toggleFavorite(post.id)} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: "1rem", padding: "0.25rem 0.5rem", borderRadius: "4px",
          color: favorite ? "#e53e3e" : "#a0aec0", marginBottom: "1.5rem",
        }}>
          {favorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>

        <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", marginBottom: "1rem" }} />
        <CommentList postId={post.id} />
      </div>
    </div>
  );
}

export default PostDetailPage;
