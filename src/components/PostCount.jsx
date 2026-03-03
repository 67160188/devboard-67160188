function PostCount({ count }) {
  return (
    <p
      style={{
        margin: "0 0 1rem",
        color: "#718096",
        fontSize: "0.9rem",
        fontStyle: "italic",
      }}
    >
      โพสต์ทั้งหมด: <strong style={{ color: "#1e40af" }}>{count} รายการ</strong>
    </p>
  );
}

export default PostCount;
