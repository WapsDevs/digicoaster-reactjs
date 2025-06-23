import { useParams } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { ParkOpinion } from "../components/ParkOpinion";
import { Tabbar } from "../components/Tabbar";
import { Review } from "../components/Review";

export const Parkid = () => {
  const { id } = useParams();

  return (
    <>
      <Dashboard>
        <ParkOpinion id={id} />
        <Review id={id} />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
