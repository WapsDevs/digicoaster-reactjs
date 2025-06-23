import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";
import { UserTweetsFeed } from "./UserTweetsFeed";

export const Tweetcomment = ({ pid }) => {
  const [showModal, setShowModal] = useState(false);
  const [tweet, setTweet] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTweet();
  }, []);

  const fetchTweet = async () => {
    const { data, error } = await supabase
      .from("tweet")
      .select("*")
      .eq("id", pid)
      .single();

    if (error) {
      console.error("Error fetching tweet:", error.message);
      alert("Failed to load tweet. Please try again.");
    } else {
      setTweet(data);
    }
  };

  const postC = async () => {
    if (!comment.trim()) {
      alert("Missing field! Please enter a comment.");
      return;
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      alert("You are not logged in. Please log in to post a comment.");
      return;
    }

    const { data: user_info, error: userInfoError } = await supabase
      .from("user_info")
      .select("*")
      .eq("uid", user.id);

    if (userInfoError || !user_info?.length) {
      alert("User profile not found. Please complete your profile.");
      return;
    }

    const { error } = await supabase.from("tweetcomment").insert([
      {
        pseudo: user_info[0].pseudo,
        content: comment,
        tid: pid,
      },
    ]);

    if (error) {
      alert("Failed to post comment. Please try again.");
      console.error("Insert error:", error.message);
    } else {
      alert("Comment posted successfully!");
      setComment("");
      setShowModal(false);
    }
  };

  if (!tweet) return <p>Loading tweet...</p>;

  return (
    <>
      <section className="tweet_comment">
        <div className="tweet-card">
          <div className="tweet-header">
            <img src={tweet.pp} alt="profile" className="tweet-avatar" />
            <div>
              <strong onClick={() => navigate("/profil/" + tweet.uid)}>
                {tweet.pseudo}
              </strong>{" "}
              {tweet.iscertif && (
                <i
                  className="fa-solid fa-circle-check"
                  style={{ color: "blue" }}
                ></i>
              )}
            </div>
          </div>
          <p className="tweet-content">{tweet.content}</p>
          {tweet.image && (
            <img src={tweet.image} alt="tweet" className="tweet-image" />
          )}
          <button onClick={() => setShowModal(true)}>Post a comment</button>
        </div>
      </section>

      {showModal && (
        <div className="configurate modal">
          <div className="modal-content">
            <h1>Post a Comment</h1>

            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <input
                type="text"
                id="comment"
                name="comment"
                placeholder="Post a comment..."
                required
                maxLength={300}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="modal-buttons">
              <button className="save-button" onClick={postC}>
                Post
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
