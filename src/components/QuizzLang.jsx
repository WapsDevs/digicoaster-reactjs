import { useNavigate } from "react-router-dom";

export const QuizzLang = () => {
  const navigate = useNavigate();
  return (
    <section className="secondnav">
      <ul>
        <li onClick={() => navigate("/Quizz/fr")}>
          <i className="fa-solid fa-earth-americas"></i>Français
        </li>
        <li onClick={() => navigate("/Quizz/en")}>
          <i className="fa-solid fa-earth-americas"></i>
          English
        </li>
      </ul>
    </section>
  );
};
