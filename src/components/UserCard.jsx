// Challenge Level 2: Avatar หลากสีตามตัวอักษรแรกของชื่อ
function getAvatarColor(name) {
  const code = name.charCodeAt(0);
  const bucket = code % 3;
  switch (bucket) {
    case 0:
      return "#1e40af"; // สีน้ำเงิน (A–G range)
    case 1:
      return "#15803d"; // สีเขียว (H–N range)
    case 2:
      return "#7c3aed"; // สีม่วง (O–Z range)
    default:
      return "#1e40af";
  }
}

function UserCard({ name, email }) {
  // ดึงตัวอักษรแรกมาทำ avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const avatarColor = getAvatarColor(name);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: avatarColor,
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
