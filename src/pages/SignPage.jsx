import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const SignPage = () => {
  const [Pseudo, setPseudo] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const sign = async () => {
    // Check if all fields are filled
    if (!Pseudo) {
      alert("Username is required!");
      return;
    }
    if (!Email) {
      alert("Email is required!");
      return;
    }
    if (!Password) {
      alert("Password is required!");
      return;
    }

    let { data, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
    });

    console.log(data);

    if (!error && data?.user) {
      const { error: insertError } = await supabase.from("user_info").insert({
        uid: data.user.id, // l'ID unique Supabase
        pseudo: Pseudo, // le pseudo choisi
        image:
          "https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images//pp.png",
        banner:
          "https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images//banner.png",
      });

      if (!insertError) {
        navigate("/verification");
      } else {
        console.error(insertError);
      }
    } else {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  return (
    <section className="signcard">
      <div className="card">
        <h1>Create an account</h1>
        <br />
        <label>Username</label>
        <input
          type="text"
          placeholder="Pseudo..."
          onChange={(e) => setPseudo(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Exemple@gmail.com..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={sign}>Register</button>
        <br />
        <p onClick={() => navigate("/login")}>Already have an account?</p>
        <p
          onClick={() => navigate("/mode-anonyme")}
          style={{ cursor: "pointer", color: "#007bff" }}
        >
          Enter as Guest (Sans Compte)
        </p>
      </div>
    </section>
  );
};
