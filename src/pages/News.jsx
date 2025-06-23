import { useParams } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { DonCards } from "../components/DonCards";
import { Tabbar } from "../components/Tabbar";
import { UserTweetsFeed } from "../components/UserTweetsFeed";

export const News = () => {
  const { id } = useParams();
  return (
    <>
      <Dashboard>
        <UserTweetsFeed uid={id} />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
