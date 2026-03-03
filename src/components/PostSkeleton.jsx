function PostSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      {/* Title skeleton */}
      <div
        style={{
          background: "#e2e8f0",
          borderRadius: "4px",
          height: "18px",
          width: "60%",
          marginBottom: "0.75rem",
        }}
      />
      {/* Body skeleton - line 1 */}
      <div
        style={{
          background: "#e2e8f0",
          borderRadius: "4px",
          height: "14px",
          width: "100%",
          marginBottom: "0.5rem",
        }}
      />
      {/* Body skeleton - line 2 */}
      <div
        style={{
          background: "#e2e8f0",
          borderRadius: "4px",
          height: "14px",
          width: "80%",
        }}
      />
    </div>
  );
}

export default PostSkeleton;
