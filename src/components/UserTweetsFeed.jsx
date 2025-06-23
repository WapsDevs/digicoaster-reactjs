import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const UserTweetsFeed = ({ uid }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    fetchUserTweets();
  }, [uid]);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user?.id);
  }

  async function fetchUserTweets() {
    setLoading(true);
    const { data, error } = await supabase
      .from("tweet")
      .select("*")
      .eq("uid", uid)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching user tweets:", error.message);
    } else {
      setTweets(data);
    }
    setLoading(false);
  }

  async function handleLike(tweet) {
    const currentLikes = tweet.likes || [];
    const hasLiked = currentLikes.includes(userId);
    const updatedLikes = hasLiked
      ? currentLikes.filter((id) => id !== userId)
      : [...currentLikes, userId];

    const { error } = await supabase
      .from("tweet")
      .update({ likes: updatedLikes })
      .eq("id", tweet.id);

    if (error) {
      console.error("Error updating likes:", error.message);
    } else {
      setTweets((prevTweets) =>
        prevTweets.map((t) =>
          t.id === tweet.id ? { ...t, likes: updatedLikes } : t
        )
      );
    }
  }

  if (loading) return <p>Loading user's tweets...</p>;

  return (
    <section className="Tweetprofil">
      {tweets.length === 0 ? (
        <p>No tweets found.</p>
      ) : (
        tweets.map((twt) => (
          <div key={twt.id} className="tweet-card">
            <div className="tweet-header">
              <img
                src={
                  twt.pp ||
                  "https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images/pp.png"
                }
                alt="profile"
                className="tweet-avatar"
              />
              <div>
                <strong>{twt.pseudo}</strong>{" "}
                {twt.iscertif && (
                  <i
                    className="fa-solid fa-circle-check"
                    style={{ color: "blue" }}
                  ></i>
                )}
              </div>
            </div>

            <p className="tweet-content">{twt.content}</p>

            {twt.image && (
              <img src={twt.image} alt="tweet" className="tweet-image" />
            )}

            <div className="btnst">
              <button
                className="comment-button"
                onClick={() => navigate(`/tweet/${twt.id}`)}
              >
                <i className="fa-solid fa-comment"></i> Comment
              </button>

              <button
                className="like-button"
                onClick={() => handleLike(twt)}
                disabled={!userId}
              >
                <i
                  className={`fa-solid fa-heart ${
                    twt.likes?.includes(userId) ? "liked" : ""
                  }`}
                ></i>{" "}
                {twt.likes?.length || 0}
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};
