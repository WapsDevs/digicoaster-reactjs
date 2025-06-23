import { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient"; // Assuming you have supabaseClient.js for supabase setup

export const Credit = () => {
  const [Attraction, setAttraction] = useState(""); // To store the input value
  const [user, setUser] = useState(null); // To store the authenticated user
  const [creditData, setCreditData] = useState([]); // To store the attractions (credit data)
  const [error, setError] = useState(null); // To handle errors

  // Fetch user data based on the token
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data: authData, error } = await supabase.auth.getUser(token);
      if (error) {
        setError(error.message);
        return;
      }

      if (authData) {
        setUser(authData.user);
      }
    };

    fetchUserData();
  }, []);

  // Fetch the user's credit data (attractions)
  useEffect(() => {
    const fetchCreditData = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("user_info")
        .select("credit")
        .eq("uid", user.id)
        .single();

      if (error) {
        setError(error.message);
        return;
      }

      // Set the fetched credit data (assuming it's an array of attractions)
      setCreditData(data?.credit || []);
    };

    fetchCreditData();
  }, [user]);

  // Function to add an attraction to the user's credit column
  const handleAddAttraction = async () => {
    if (!user) {
      setError("No user authenticated");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_info")
        .select("credit")
        .eq("uid", user.id)
        .single();

      if (error) {
        setError(error.message);
        return;
      }

      const currentCredits = data?.credit || [];
      const updatedCredits = [...currentCredits, Attraction];

      // Update the user_info table
      const { updateError } = await supabase
        .from("user_info")
        .update({ credit: updatedCredits })
        .eq("uid", user.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // Clear the input field and update the state
      setAttraction("");
      setCreditData(updatedCredits);
      alert("Attraction added successfully!");
    } catch (err) {
      setError("Error adding attraction: " + err.message);
    }
  };

  // Function to handle attraction modification
  const handleModifyAttraction = async (index) => {
    const newAttraction = prompt(
      "Enter the new attraction name:",
      creditData[index]
    );

    if (newAttraction && newAttraction !== creditData[index]) {
      const updatedCredits = [...creditData];
      updatedCredits[index] = newAttraction;

      // Update the user_info table
      const { updateError } = await supabase
        .from("user_info")
        .update({ credit: updatedCredits })
        .eq("uid", user.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // Update the local state
      setCreditData(updatedCredits);
      alert("Attraction modified successfully!");
    }
  };

  // Function to handle attraction deletion
  const handleDeleteAttraction = async (index) => {
    const updatedCredits = creditData.filter((_, i) => i !== index);

    // Update the user_info table
    const { updateError } = await supabase
      .from("user_info")
      .update({ credit: updatedCredits })
      .eq("uid", user.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    // Update the local state
    setCreditData(updatedCredits);
    alert("Attraction deleted successfully!");
  };

  return (
    <section className="credits">
      <div className="credit-head">
        <input
          type="text"
          placeholder="Give an attraction name"
          value={Attraction}
          onChange={(e) => setAttraction(e.target.value)}
        />
        <button onClick={handleAddAttraction}>Add</button>
      </div>

      <div className="credit-list">
        {creditData.length > 0 ? (
          <ul>
            {creditData.map((attraction, index) => (
              <li key={index}>
                {attraction}
                <button
                  onClick={() => handleModifyAttraction(index)}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAttraction(index)}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No attractions added yet.</p>
        )}
      </div>

      <div className="credit-total">
        <p>Total Attractions: {creditData.length}</p>
      </div>

      {error && <p className="error">{error}</p>}
    </section>
  );
};
