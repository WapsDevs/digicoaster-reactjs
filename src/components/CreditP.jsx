import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";

export const CreditP = ({ cid }) => {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    async function fetchCredit() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const { data: user_info, error: userInfoError } = await supabase
        .from("user_info")
        .select("credit")
        .eq("uid", cid) // <- cid vient des props
        .single();

      if (userInfoError || !user_info) {
        alert("User info not found. Please complete your profile.");
        return;
      }

      setCredits(user_info.credit || []);
    }

    fetchCredit();
  }, [cid]);

  return (
    <div className="credit-list">
      <ul>
        {credits.map((park, index) => (
          <li key={index}>{park}</li>
        ))}
      </ul>
    </div>
  );
};
