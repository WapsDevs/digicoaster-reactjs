import { useNavigate } from "react-router-dom";
import { DonCards } from "../components/DonCards";
import { Tabbar } from "../components/Tabbar";
import { Tweet } from "../components/Tweet";

export const Anonyme = () => {
  const navigate = useNavigate();
  return (
    <>
      <aside>
        <div className="logo">
          <img
            src="https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images/images/logo.png"
            alt="Logo"
          />
        </div>
        <ul>
          <li onClick={() => navigate("/mode-anonyme")}>
            <i className="fa-solid fa-house"></i>Home
          </li>
          <li onClick={() => navigate("/legal")}>
            <i className="fa-solid fa-scale-balanced"></i> Legal Notice
          </li>
        </ul>
        <button onClick={() => navigate("/sign")}>
          <i className="fa-solid fa-user"></i>Create an Account
        </button>
      </aside>
      <main className="main">
        <Tweet />
      </main>

      <button className="test" onClick={() => navigate("/sign")}>
        <i className="fa-solid fa-user"></i>Create an Account
      </button>

      <DonCards />
    </>
  );
};
