import { useNavigate } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { Nav } from "../components/Nav";
import { QuizzLang } from "../components/QuizzLang";
import { Tabbar } from "../components/Tabbar";
import { Ads } from "../components/Ads";

export const QuizzPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Dashboard>
        <Nav ismt={true}>
          <li className="actives">Quizz</li>
          <li onClick={() => navigate("/Quizz/top")}>🏆Ranking</li>
        </Nav>
        <QuizzLang />
      </Dashboard>
      <Tabbar />
      <DonCards />
    </>
  );
};
