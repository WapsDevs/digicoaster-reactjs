import { useNavigate } from "react-router-dom";

export const Verifi = () => {
  const navigate = useNavigate();
  return (
    <section className="logincard">
      <div className="card">
        <h1>Welcome !</h1>
        <br />
        <p>
          For security reasons, please verify your email address by clicking the
          confirmation link we sent you before attempting to log in to your
          account.
        </p>
        <br />
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
    </section>
  );
};
