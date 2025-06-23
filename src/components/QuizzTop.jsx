import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

export const QuizzTop = () => {
  const navigate = useNavigate();
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const { data, error } = await supabase
        .from("user_info")
        .select("*")
        .order("quizz_point", { ascending: true })
        .limit(100); // Limite à 100 utilisateurs

      if (error) {
        console.error("Erreur récupération classement :", error);
      } else {
        console.log("Données récupérées : ", data);

        // Tri des utilisateurs par points dans le frontend (au cas où Supabase ne trie pas bien)
        const sortedData = data.sort((a, b) => b.quizz_point - a.quizz_point);

        // Mise à jour de l'état avec les données triées
        setTopUsers(sortedData);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <section className="tweet">
      <div className="tweet-card">
        <ul>
          {topUsers.map((user, index) => (
            <li key={index} onClick={() => navigate("/profil/" + user.uid)}>
              <strong>{index + 1}.</strong>
              <img src={user.image} alt="profile" className="tweet-avatar" />
              {user.pseudo} — {user.quizz_point} points
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
