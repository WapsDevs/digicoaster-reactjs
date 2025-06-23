import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: Email,
      password: Password,
    });

    if (error) {
      console.error("Erreur de connexion:", error.message);
      alert("Wrong credentials !");
    } else {
      console.log("Connexion réussie :", data);

      // Récupérer le token
      const accessToken = data.session.access_token;

      // Stocker dans localStorage
      localStorage.setItem("token", accessToken);

      // Rediriger vers la page d'accueil ou dashboard
      navigate("/"); // adapte "/home" si nécessaire
    }
  };

  return (
    <section className="logincard">
      <div className="card">
        <h1>Welcome back!</h1>
        <br />
        <label>Email</label>
        <input
          type="text"
          placeholder="Exemple@gmail.com..."
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={login}>Log in</button>
        <br />
        <p onClick={() => navigate("/sign")}>Don't have an account?</p>
      </div>
    </section>
  );
};
