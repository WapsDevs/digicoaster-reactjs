import { useNavigate } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { Nav } from "../components/Nav";
import { Profil } from "../components/Profil";
import { DonCards } from "../components/DonCards";
import { Tweet } from "../components/Tweet";
import { Tweetprofil } from "../components/Tweetprofil";
import { Tabbar } from "../components/Tabbar";

export const ProfilTweet = () => {
  const navigate = useNavigate();
  return (
    <>
      <Dashboard isActive="profil">
        <Profil />
        <Nav>
          <li className="actives" onClick={() => navigate("/profil")}>
            Posts
          </li>
          <li onClick={() => navigate("/profil/credits")}>Credits</li>
        </Nav>
        <Tweetprofil />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
