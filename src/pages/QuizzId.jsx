import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { Quizz } from "../components/Quizz";
import { QuizzTop } from "../components/QuizzTop";
import { Tabbar } from "../components/Tabbar";

export const QuizzId = () => {
  return (
    <>
      <Dashboard>
        <Quizz />
      </Dashboard>
      <Tabbar />
      <DonCards />
    </>
  );
};
