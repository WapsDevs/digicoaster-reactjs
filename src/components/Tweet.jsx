import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const Tweet = () => {
  const [tweets, setTweets] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    fetchTweets();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user?.id);
  }

  async function fetchTweets() {
    const { data, error } = await supabase
      .from("tweet")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching tweets:", error.message);
    } else {
      setTweets(data);
    }
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
      // Refresh tweets after like update
      setTweets((prevTweets) =>
        prevTweets.map((t) =>
          t.id === tweet.id ? { ...t, likes: updatedLikes } : t
        )
      );
    }
  }

  return (
    <section className="tweet">
      {tweets.length === 0 ? (
        <p>No tweets found.</p>
      ) : (
        tweets.map((twt) => (
          <div key={twt.id} className="tweet-card">
            <div className="tweet-header">
              <img src={twt.pp} alt="profile" className="tweet-avatar" />

              <div>
                <strong
                  className="ppts"
                  onClick={() => navigate("/profil/" + twt.uid)}
                >
                  {twt.pseudo}
                </strong>{" "}
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
