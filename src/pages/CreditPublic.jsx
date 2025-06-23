import { useNavigate, useParams } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { PublicProfil } from "../components/PublicProfil";
import { Nav } from "../components/Nav";
import { UserTweetsFeed } from "../components/UserTweetsFeed";
import { CreditP } from "../components/CreditP";
import { Tabbar } from "../components/Tabbar";

export const CreditPublic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Dashboard>
        <PublicProfil uid={id} />
        <Nav>
          <li onClick={() => navigate("/profil/" + id)}>Posts</li>
          <li className="actives">Credits</li>
        </Nav>
        <CreditP cid={id} />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
