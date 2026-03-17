import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";

const POSTS_PER_PAGE = 10; // Challenge ⭐⭐

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Challenge ⭐⭐

  // แยก fetch logic เป็น function — Challenge ⭐
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Challenge ⭐⭐: Pagination
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
        <button
          onClick={fetchPosts}
          style={{
            marginLeft: "1rem",
            padding: "0.25rem 0.75rem",
            background: "#c53030",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🔄 ลองใหม่
        </button>
      </div>
    );

  return (
    <div>
      {/* Header + ปุ่มโหลดใหม่ Challenge ⭐ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
        <h2 style={{ color: "#2d3748", margin: 0 }}>โพสต์ล่าสุด</h2>
        <button
          onClick={() => { setCurrentPage(1); fetchPosts(); }}
          style={{
            background: "none",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            padding: "0.25rem 0.75rem",
            cursor: "pointer",
            fontSize: "0.9rem",
            color: "#4a5568",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {paginated.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}

      {/* Challenge ⭐⭐: Pagination controls */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "0.4rem 0.9rem",
              border: "1px solid #cbd5e0",
              borderRadius: "6px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              background: currentPage === 1 ? "#f7fafc" : "white",
              color: currentPage === 1 ? "#a0aec0" : "#2d3748",
            }}
          >
            ← ก่อนหน้า
          </button>
          <span style={{ color: "#4a5568", fontSize: "0.9rem" }}>
            หน้า {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.4rem 0.9rem",
              border: "1px solid #cbd5e0",
              borderRadius: "6px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              background: currentPage === totalPages ? "#f7fafc" : "white",
              color: currentPage === totalPages ? "#a0aec0" : "#2d3748",
            }}
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
