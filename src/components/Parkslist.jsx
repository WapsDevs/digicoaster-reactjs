import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

export const ParksList = () => {
  const [parks, setParks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParks() {
      const { data, error } = await supabase.from("park").select("*");
      if (error) {
        console.error("Erreur lors du fetch :", error.message);
      } else {
        setParks(data);
      }
    }

    fetchParks();
  }, []);

  // Filtrage des parcs en fonction de la requête de recherche
  const filteredParks = parks.filter(
    (park) =>
      park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Search for a park..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="tweet">
        {filteredParks.map((park) => (
          <div key={park.id} className="tweet-card">
            <strong>
              <div className="tweet-header">{park.name}</div>
            </strong>

            <p className="tweet-content">{park.bio}</p>
            <img src={park.image} alt="tweet" className="tweet-image" />
            <div className="btnst">
              <p
                style={{ opacity: "0.8", marginTop: "5px", fontSize: "0.8rem" }}
              >
                {park.country}-{park.continent}
              </p>
              <button
                className="comment-button"
                onClick={() => navigate(`/parc/${park.id}`)}
              >
                <i
                  class="fa-solid fa-star"
                  style={{ color: "rgb(255, 230, 0)", opacity: "0.6" }}
                ></i>
                your opinion
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
