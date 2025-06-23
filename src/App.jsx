import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // <-- importé proprement
import { Homepage } from "./pages/HomePage";
import { SignPage } from "./pages/SignPage";
import { LoginPage } from "./pages/LoginPage";
import { Verifi } from "./pages/Verifi";
import { ProfilTweet } from "./pages/ProfilTweet";
import { ProfilCredit } from "./pages/ProfilCredit";
import { Tweetid } from "./pages/Tweetid";
import { PublicProfilPage } from "./pages/PublicProfilPage";
import { CreditPublic } from "./pages/CreditPublic";
import { ParkPage } from "./pages/ParkPage";
import { Other } from "./pages/Other";
import { QuizzPage } from "./pages/QuizzPage";
import { QuizzId } from "./pages/QuizzId";
import { QuizzUserTop } from "./pages/QuizzUserTop";
import { QuizzIdEn } from "./pages/QuizzIdEn";
import { News } from "./pages/News";
import { Anonyme } from "./pages/Anonyme";
import { Legal } from "./pages/Legal";
import { Parkid } from "./pages/Parkid";
import { Help } from "./pages/Help";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route path="/mode-anonyme" element={<Anonyme />} />
        <Route path="/help" element={<Help />} />
        <Route path="/legal" element={<Legal />} />
        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <ProfilTweet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil/credits"
          element={
            <ProtectedRoute>
              <ProfilCredit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tweet/:id"
          element={
            <ProtectedRoute>
              <Tweetid />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil/:id"
          element={
            <ProtectedRoute>
              <PublicProfilPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil/credits/:id"
          element={
            <ProtectedRoute>
              <CreditPublic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/theme-park"
          element={
            <ProtectedRoute>
              <ParkPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/other"
          element={
            <ProtectedRoute>
              <Other />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parc/:id"
          element={
            <ProtectedRoute>
              <Parkid />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Quizz"
          element={
            <ProtectedRoute>
              <QuizzPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Quizz/fr"
          element={
            <ProtectedRoute>
              <QuizzId />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Quizz/en"
          element={
            <ProtectedRoute>
              <QuizzIdEn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/News/:id"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Quizz/top"
          element={
            <ProtectedRoute>
              <QuizzUserTop />
            </ProtectedRoute>
          }
        />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<Verifi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
