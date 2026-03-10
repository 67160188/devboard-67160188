import { useState } from "react";
import PostCard from "./PostCard";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  // Challenge ⭐⭐: Sort order
  const [sortOrder, setSortOrder] = useState("desc");

  const filtered = posts
    .filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
    // Challenge ⭐⭐: sort ก่อน render
    .sort((a, b) =>
      sortOrder === "desc" ? b.id - a.id : a.id - b.id
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* Search + Sort Row */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="ค้นหาโพสต์..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />

        {/* Challenge ⭐⭐: Sort button */}
        <button
          onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            background: "white",
            cursor: "pointer",
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
          }}
        >
          {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
        </button>
      </div>

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {filtered.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
