import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Ads } from "../components/Ads";

export const Legal = () => {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const pages = {
    legal: `# Mentions légales

Conformément à la loi française (article 6 de la LCEN), voici les informations légales du site.

## Éditeur

- **Nom du site** : Digicoaster  
- **Responsable de publication** : Wassim  
- **Contact** : digicoaster@gmail.com  

## Hébergeur

- **Nom** : Netlify 
- **Adresse** : 
- **Site web** : https://www.netlify.com/

## Propriété intellectuelle

Tous les contenus (textes, images, logos, vidéos) sont la propriété de leurs auteurs respectifs. Toute reproduction est interdite sans autorisation.

---

Dernière mise à jour : Mai 2025
`,

    privacy: `# Politique de confidentialité

Chez **Digicoaster**, nous respectons ta vie privée. Cette politique explique quelles données nous collectons, pourquoi, et comment tu peux les gérer.

## 1. Données collectées

Nous collectons uniquement les données nécessaires au fonctionnement de la plateforme :
- Adresse email (lors de l’inscription)
- Pseudo choisi
- Activités publiques (ex. : tweets, likes, commentaires)
- Cookies de navigation (essentiels uniquement)

## 2. Utilisation des données

Les données sont utilisées pour :
- Fournir l’accès à ton compte
- Afficher ton contenu (publications, photo de profil)
- Améliorer la plateforme (statistiques anonymes)

Nous **ne revendons pas** tes données à des tiers.`,

    contact: `# Contact

Une question, un bug, une suggestion ou une demande liée à ta vie privée ?

Tu peux nous écrire à :

📧 **digicoaster@gmail.com**

Nous répondrons dans les meilleurs délais.

---

Merci de faire partie de la communauté **Digicoaster** 🎢
`,
  };

  const openModal = (key) => {
    setModalContent(pages[key]);
    setShowModal(true);
  };

  return (
    <>
      <aside>
        <div className="logo">
          <img
            src="https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images/images/logo.png"
            alt="Logo"
          />
        </div>
        <ul>
          <li onClick={() => navigate("/mode-anonyme")}>
            <i className="fa-solid fa-house"></i> Home
          </li>
          <li onClick={() => openModal("legal")}>
            <i className="fa-solid fa-scale-balanced"></i> Legal Notice
          </li>
        </ul>
        <button onClick={() => navigate("/sign")}>
          <i className="fa-solid fa-user"></i> Create an Account
        </button>
      </aside>

      <main className="main">
        <section className="secondnav">
          <ul>
            <li onClick={() => openModal("legal")}>
              <i className="fa-solid fa-file-contract"></i> Legal Notice
            </li>
            <li onClick={() => openModal("privacy")}>
              <i className="fa-solid fa-user-shield"></i> Privacy Policy
            </li>
            <li onClick={() => openModal("contact")}>
              <i className="fa-solid fa-envelope"></i> Contact
            </li>
          </ul>
        </section>
      </main>

      <button className="test" onClick={() => navigate("/sign")}>
        <i className="fa-solid fa-user"></i> Create an Account
      </button>

      {showModal && (
        <div className="modali">
          <div className="modal-contenti">
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <ReactMarkdown>{modalContent}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};
