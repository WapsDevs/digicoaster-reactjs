import { useNavigate } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { Nav } from "../components/Nav";
import { QuizzTop } from "../components/QuizzTop";
import { Tabbar } from "../components/Tabbar";

export const QuizzUserTop = () => {
  const navigate = useNavigate();
  return (
    <>
      <Dashboard>
        <Nav ismt={true}>
          <li onClick={() => navigate("/Quizz")}>Quizz</li>
          <li className="actives">🏆Ranking</li>
        </Nav>
        <QuizzTop />
      </Dashboard>
      <Tabbar />
      <DonCards />
    </>
  );
};
