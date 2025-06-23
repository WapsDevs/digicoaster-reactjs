import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SecondNav = () => {
  const [lang, setLang] = useState("fr");
  const navigate = useNavigate();

  const translations = {
    fr: {
      donate: "Faire un don",
      quiz: "Quizz",
      message: `📢 SOUTENEZ LE SITE & MA PASSION ! 🎢 Ce site, c’est un projet 100% perso, créé avec passion par quelqu’un qui découvre tout juste le monde incroyable des parcs à thème ! 🎠 Vos dons ne servent pas juste à garder le site en ligne : ils me soutiennent directement dans cette aventure et m’aident à vivre pleinement cette passion naissante. ❤️ Chaque contribution, même petite, fait une vraie différence ! 🙏 Merci du fond du cœur pour votre soutien. 🎁✨`,
      english: "English",
      french: "Français",
    },
    en: {
      donate: "Donate",
      quiz: "Quiz",
      message: `📢 SUPPORT THE SITE & MY PASSION! 🎢 This site is a 100% personal project, created with passion by someone just discovering the amazing world of theme parks! 🎠 Your donations don’t just keep the site online – they directly support me on this adventure and help me fully live out this growing passion. ❤️ Every contribution, even a small one, truly makes a difference! 🙏 Thank you so much for your support. 🎁✨`,
      english: "English",
      french: "French",
    },
  };

  const t = translations[lang];

  return (
    <>
      <section className="secondnav">
        <ul>
          <li
            onClick={() =>
              (window.location.href = "https://ko-fi.com/digicoaster")
            }
          >
            <i className="fa-solid fa-hand-holding-dollar"></i>
            Donate
          </li>
          <li onClick={() => navigate("/Quizz")}>
            <i className="fa-solid fa-check-to-slot"></i>
            Quizz
          </li>
          <li
            onClick={() =>
              navigate("/News/3a09d206-a649-4d5d-9f67-c54a6af52c0e")
            }
          >
            <i className="fa-solid fa-cart-shopping"></i>
            Shopping
          </li>
          <li style={{ padding: "13.6px" }}>
            <i className="fa-solid fa-ranking-star"></i>
            Top Coasters <span className="snl">in development</span>
          </li>
        </ul>
      </section>
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
          <p className="tweet-content">{t.message}</p>
          <img
            src="https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images//pluto-5962694_1280.jpg"
            alt="tweet"
            className="tweet-image"
          />
          <button
            className="donate-btn"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          >
            {lang === "fr" ? t.english : t.french}
          </button>
        </div>
      </section>
    </>
  );
};
