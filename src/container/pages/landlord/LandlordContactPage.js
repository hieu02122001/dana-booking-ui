import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useAuth } from "../../../context/authContext";
import { useEffect } from "react";
import http from "../../../config/axiosConfig";
import { PATHS } from "../../../utils/paths";

const PROJECT_ID = "8a2d12b4-823f-47b4-b53b-69a04718556f"

const LandlordContactPage = (props) => {
  const { user } = useAuth();
  useEffect(() => {
    http.post(PATHS.contactAuth, user)
  }, [user])
  console.log(user);

  return (
    <div className="min-h-[85vh] h-[85vh]">
      <PrettyChatWindow
        projectId={PROJECT_ID}
        username={user.email || "landlord@gmail.com"}
        secret={user.email || "landlord@gmail.com"}
      />
    </div>
  );
};

export default LandlordContactPage;