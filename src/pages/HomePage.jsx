import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { Tabbar } from "../components/Tabbar";
import { Tweet } from "../components/Tweet";

export const Homepage = () => {
  return (
    <>
      <Dashboard isActive="home">
        <Tweet />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
