import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { Quizz } from "../components/Quizz";
import { QuizzEn } from "../components/QuizzEn";
import { QuizzTop } from "../components/QuizzTop";
import { Tabbar } from "../components/Tabbar";

export const QuizzIdEn = () => {
  return (
    <>
      <Dashboard>
        <QuizzEn />
      </Dashboard>
      <Tabbar />
      <DonCards />
    </>
  );
};
