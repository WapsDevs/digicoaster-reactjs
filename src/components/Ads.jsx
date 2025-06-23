import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";

export const Ads = () => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      const randomId = Math.floor(Math.random() * 5) + 1; // entre 1 et 5

      const { data, error } = await supabase
        .from("Ads")
        .select("*")
        .eq("id", randomId) // On suppose que tes pubs ont un champ id de 1 à 5
        .single(); // Récupère un seul résultat

      if (error) {
        console.error("Erreur lors du chargement de la pub :", error);
      } else {
        setAd(data);
      }
    };

    fetchAd();
  }, []);

  if (!ad) return null; // Rien afficher tant que la pub n'est pas chargée

  return (
    <section className="ads">
      <img
        src={ad.banner}
        alt="Publicité"
        onClick={() => (window.location.href = ad.link)}
        style={{ cursor: "pointer" }}
      />
      {ad.link === "mailto:digicoaster@gmail.com" ? (
        <a href="mailto:digicoaster@gmail.com">digicoaster@gmail.com</a>
      ) : null}
    </section>
  );
};
