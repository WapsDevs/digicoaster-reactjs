import { useState, useEffect } from "react";

export const DonCards = () => {
  const [lang, setLang] = useState("fr");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hidePopup = localStorage.getItem("hideDonPopup");
    if (hidePopup !== "true") {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hideDonPopup", "true");
    setIsVisible(false);
  };

  const texts = {
    fr: {
      title: "💙 Soutiens le projet",
      description: `Je découvre tout juste l’univers des parcs à thème, avec beaucoup d’envie et un petit budget.
Ce site est un projet perso, fait avec passion.
Vos dons permettent non seulement de le garder en ligne, mais aussi de me soutenir directement dans cette nouvelle passion, pour que je puisse continuer à avancer et partager tout ça ici.`,
      button: "EN",
      close: "Ne plus afficher",
    },
    en: {
      title: "💙 Support the project",
      description: `I'm just starting to explore the world of theme parks, with a lot of excitement and a small budget.
This site is a personal passion project.
Donations help keep it online, but also support me directly in discovering more and continuing to share the journey here.`,
      button: "FR",
      close: "Don’t show again",
    },
  };

  const content = texts[lang];

  if (!isVisible) return null;

  return (
    <section className="doncards">
      <div className="doncards-header">
        <h2>{content.title}</h2>
        <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}>
          {content.button}
        </button>
      </div>
      <p>
        {content.description.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <a
        href="https://ko-fi.com/N4N51BO1FI"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          height="36"
          style={{ border: "0px", height: "36px" }}
          src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
      <button className="doncards-close" onClick={handleClose}>
        {content.close}
      </button>
    </section>
  );
};
