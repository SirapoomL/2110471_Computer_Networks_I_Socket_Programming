import { useUser } from "../UserProvider"

export function TopBar(){
  const { username, profileIndex } = useUser();
  return (
    <div style={{ 
      display: "flex", justifyContent: "center", alignItems: "center",
      minWidth: "15rem", minHeight: "10rem", backgroundColor: "#1A202C", padding: "0.5rem" 
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={"/profile"+(String(profileIndex) || "1")+".png"} alt="profile" className="w-[80px] h-[80px] rounded-full mb-2" />
        <span style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center", color: "white" }}>{username}</span>
      </div>
    </div>
  );
}
