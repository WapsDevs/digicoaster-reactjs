import { useNavigate } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { Nav } from "../components/Nav";
import { Profil } from "../components/Profil";
import { Credit } from "../components/Credit";
import { DonCards } from "../components/DonCards";
import { Tabbar } from "../components/Tabbar";

export const ProfilCredit = () => {
  const navigate = useNavigate();
  return (
    <>
      <Dashboard isActive="profil">
        <Profil />
        <Nav>
          <li onClick={() => navigate("/profil")}>Posts</li>
          <li className="actives" onClick={() => navigate("/profil/credits")}>
            Credits
          </li>
        </Nav>
        <Credit />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
