import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const Tweetprofil = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const navigate = useNavigate();

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    getCurrentUser();
  }, []);

  // Une fois l'utilisateur récupéré, fetch ses tweets
  useEffect(() => {
    if (user) {
      fetchUserTweets();
    }
  }, [user]);

  // Fonction pour obtenir l'utilisateur connecté
  async function getCurrentUser() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur :",
        authError.message
      );
    } else {
      setUser(user);
    }
  }

  // Récupérer les tweets de l'utilisateur
  async function fetchUserTweets() {
    const { data, error } = await supabase
      .from("tweet")
      .select("*")
      .eq("uid", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Erreur lors de la récupération des tweets :",
        error.message
      );
    } else {
      setTweets(data);
    }
  }

  // Supprimer un tweet par son id
  async function deleteTweet(id) {
    const { error } = await supabase.from("tweet").delete().eq("id", id);

    if (error) {
      console.error("Erreur lors de la suppression :", error.message);
    } else {
      setTweets((prev) => prev.filter((twt) => twt.id !== id));
    }
  }

  return (
    <section className="Tweetprofil">
      {tweets.length === 0 ? (
        <p>Aucun tweet trouvé.</p>
      ) : (
        tweets.map((twt) => (
          <div key={twt.id} className="tweet-card">
            <div className="tweet-header">
              <img src={twt.pp} alt="profil" className="tweet-avatar" />
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
            <div className="tweet-actions">
              <button
                className="comment-button"
                onClick={() => navigate(`/tweet/${twt.id}`)}
              >
                <i className="fa-solid fa-comment"></i> comment
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTweet(twt.id)}
              >
                <i className="fa-solid fa-trash"></i> DELETE
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};
