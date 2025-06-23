import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

export const ParkOpinion = ({ id }) => {
  const [park, setPark] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    async function getPark() {
      let { data, error } = await supabase
        .from("park")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error retrieving park:", error);
      } else {
        setPark(data);
      }
    }

    getPark();
  }, [id]);

  async function PostReview() {
    if (!content || !note) {
      alert("Please fill in all fields.");
      return;
    }

    const numericNote = Number(note);
    if (isNaN(numericNote) || numericNote < 1 || numericNote > 5) {
      alert("The rating must be a number between 1 and 5.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const { data: authData } = await supabase.auth.getUser(token);

      const { data: user_info, error: userError } = await supabase
        .from("user_info")
        .select("*")
        .eq("uid", authData.user.id);

      if (userError || !user_info || user_info.length === 0) {
        alert("Error retrieving user information.");
        return;
      }

      const { data: notes, error: insertError } = await supabase
        .from("notes")
        .insert([
          {
            pp: user_info[0].image,
            pseudo: user_info[0].pseudo,
            uid: authData.user.id,
            pkid: id,
            content,
            note: numericNote,
          },
        ]);

      if (insertError) {
        alert("Error submitting review.");
        console.error(insertError);
      } else {
        alert("Review posted successfully!");
        setShowModal(false);
        setContent("");
        setNote("");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    }
  }

  if (!park) return <p>Loading...</p>;

  return (
    <>
      <div className="tweet">
        <div key={park.id} className="tweet-card">
          <strong>
            <div className="tweet-header">{park.name}</div>
          </strong>
          <p className="tweet-content">{park.bio}</p>
          <img src={park.image} alt="tweet" className="tweet-image" />
          <button className="donate-btn" onClick={() => setShowModal(true)}>
            Post your review
          </button>
        </div>
      </div>

      {showModal && (
        <div className="configurate modal">
          <div className="modal-content">
            <h1>Post a review</h1>

            <div className="form-group">
              <label htmlFor="content">Your opinion</label>
              <input
                type="text"
                id="content"
                name="content"
                placeholder="Post an opinion..."
                required
                maxLength={300}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="note">Your note</label>
              <input
                type="number"
                id="note"
                name="note"
                placeholder="/5"
                min="1"
                max="5"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="modal-buttons">
              <button className="save-button" onClick={PostReview}>
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
