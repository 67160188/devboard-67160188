import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetch from "../hooks/useFetch";

function FavoritesPage() {
  const { favorites } = useFavorites();
  const { data: allPosts, loading } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <LoadingSpinner />;

  const favoritePosts = allPosts?.filter((post) => favorites.includes(post.id)) || [];

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ color: "#2d3748", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}>
        ❤️ โพสต์ที่ถูกใจ ({favoritePosts.length})
      </h2>

      {favoritePosts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
          <p style={{ fontSize: "1.2rem" }}>ยังไม่มีโพสต์ที่ถูกใจ</p>
          <p>กลับไปหน้าแรกแล้วกด 🤍 เพื่อเพิ่มโพสต์ที่ชอบ</p>
        </div>
      ) : (
        favoritePosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default FavoritesPage;
