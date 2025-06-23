import { Dashboard } from "../components/Dashboard";
import { SecondNav } from "../components/SecondNav";
import { DonCards } from "../components/DonCards";
import { Tabbar } from "../components/Tabbar";
import { Nav } from "../components/Nav";

export const Other = () => {
  return (
    <>
      <Dashboard isActive="other">
        <SecondNav />
      </Dashboard>
      <Tabbar />
      <DonCards />
    </>
  );
};
