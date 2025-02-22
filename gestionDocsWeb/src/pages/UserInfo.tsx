import { useNavigate } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa";

import CardUser from "../components/CardUser";

const UserInfo = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-100 overflow-auto p-4">
        <button
          className="bg-gray-300 p-2 rounded-md flex items-center justify-center text-center w-100% gap-2 mb-5"
          onClick={handleHome}
        >
          <FaCaretLeft className="text-lg align-middle" /> Regresar
        </button>

        <CardUser />
      </div>
    </>
  );
};

export default UserInfo;
