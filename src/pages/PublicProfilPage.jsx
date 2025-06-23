import { useNavigate, useParams } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { PublicProfil } from "../components/PublicProfil";
import { Nav } from "../components/Nav";
import { UserTweetsFeed } from "../components/UserTweetsFeed";
import { Tabbar } from "../components/Tabbar";

export const PublicProfilPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Dashboard>
        <PublicProfil uid={id} />
        <Nav>
          <li className="actives" onClick={() => navigate("/profil/" + id)}>
            Posts
          </li>
          <li onClick={() => navigate("/profil/credits/" + id)}>Credits</li>
        </Nav>
        <UserTweetsFeed uid={id} />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
