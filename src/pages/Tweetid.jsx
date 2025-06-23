import { useParams } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { Tweetcomment } from "../components/Tweetcomment";
import { DonCards } from "../components/DonCards";
import { Comment } from "../components/Comment";
import { Tabbar } from "../components/Tabbar";
import { Ads } from "../components/Ads";
export const Tweetid = () => {
  const { id } = useParams();

  return (
    <>
      <Dashboard>
        <Tweetcomment pid={id} />
        <Comment cid={id} />
      </Dashboard>
      <DonCards />
      <Tabbar />
    </>
  );
};
