import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.auth.getUser(token);
        console.log(data);

        if (error) {
          console.error("Erreur de token:", error.message);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("Erreur inattendue:", e);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>; // Tu peux mettre un vrai loader si tu veux
  }

  if (!isAuthenticated || isAuthenticated) {
    return <Navigate to="/help" replace />;
  }

  return children;
};

export default ProtectedRoute;
