import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

export const Review = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getReviews() {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("pkid", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors du chargement des avis :", error);
      } else {
        setReviews(data);
      }
    }

    getReviews();
  }, [id]);

  return (
    <div className="tweet">
      {reviews.length === 0
        ? null
        : reviews.map((review) => (
            <div className="tweet-card" key={review.id}>
              <div className="tweet-header">
                <img
                  src={review.pp}
                  alt="profile"
                  className="tweet-avatar"
                  onClick={() => navigate("/profil/" + review.uid)}
                  style={{ cursor: "pointer" }}
                />
                <div>
                  <strong
                    className="ppts"
                    onClick={() => navigate("/profil/" + review.uid)}
                    style={{ cursor: "pointer" }}
                  >
                    {review.pseudo}
                  </strong>
                </div>
              </div>
              <p className="tweet-content">{review.content}</p>
              <div className="btnst">
                <p className="tweet-note">
                  <i class="fa-solid fa-star"></i> ({review.note} / 5)
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};
