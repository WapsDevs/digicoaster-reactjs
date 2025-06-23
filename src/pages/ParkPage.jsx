import { Dashboard } from "../components/Dashboard";

import { DonCards } from "../components/DonCards";
import { ParksList } from "../components/Parkslist";
import { Tabbar } from "../components/Tabbar";

export const ParkPage = () => {
  return (
    <>
      <Dashboard isActive={"park"}>
        <ParksList />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
