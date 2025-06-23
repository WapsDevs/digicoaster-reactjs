import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const QuizzEn = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchQuestion = async () => {
      const randomId = Math.floor(Math.random() * 40) + 1;

      const { data, error } = await supabase
        .from("quizz_en")
        .select("*")
        .eq("id", randomId)
        .single();

      if (error) {
        console.error("Erreur Supabase :", error);
        return;
      }

      if (data) {
        setQuestion(data);
        console.log(data);

        const answers = [data.correct, ...data.bad];
        const shuffled = answers.sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffled);
      }
    };
    async function getuser() {
      const { data: authData } = await supabase.auth.getUser();

      setUserData(authData);
    }
    getuser();
    fetchQuestion();
  }, []);

  const handleAnswerClick = async (answer) => {
    if (answer === question.correct) {
      const userId = userData.user.id;

      // 1. Récupérer les points
      const { data: userInfo, error: fetchError } = await supabase
        .from("user_info")
        .select("quizz_point")
        .eq("uid", userId)
        .single();

      if (fetchError) {
        console.error("Erreur fetch user_info :", fetchError);
        return;
      }

      console.log("User info:", userInfo);

      const currentPoints = parseInt(userInfo.quizz_point) || 0;

      // 2. Incrémenter
      const { error: updateError } = await supabase
        .from("user_info")
        .update({ quizz_point: currentPoints + 1 })
        .eq("uid", userId);

      if (updateError) {
        console.error("Erreur update :", updateError);
      } else {
        alert("Bonne réponse !");
      }
    }

    window.location.reload(); // recharge dans tous les cas
  };

  if (!question) return <p>Chargement du quiz...</p>;

  return (
    <section className="tweet">
      <div className="tweet-card">
        <div className="tweet-header">
          <img
            src="https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images/images/logo.png"
            alt="profile"
            className="tweet-avatar"
          />
          <div>
            <strong
              className="ppts"
              onClick={() =>
                navigate("/profil/a1241d09-2ee9-42bb-9b74-3a371a3cc1ed")
              }
            >
              Digicoaster
            </strong>
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "blue" }}
            ></i>
          </div>
        </div>

        <p className="tweet-content">{question.question}</p>

        <ul>
          {shuffledAnswers.map((answer, index) => (
            <li key={index} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
