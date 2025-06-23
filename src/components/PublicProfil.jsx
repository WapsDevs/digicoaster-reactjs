import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";

export const PublicProfil = ({ uid }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      alert("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie : ", err);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data, error } = await supabase
        .from("user_info")
        .select("*")
        .eq("uid", uid)
        .single();

      if (error) {
        console.error("Error fetching user info:", error.message);
      } else {
        setUserInfo(data);
      }
    };

    if (uid) fetchUserInfo();
  }, [uid]);

  if (!userInfo) return <p>Loading profile...</p>;

  return (
    <section className="profil">
      <img
        src={
          userInfo.banner ||
          "https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images/banner.png"
        }
        alt="Banner"
        className="banner"
      />

      <div className="user-info">
        <div className="user-head">
          <img
            src={
              userInfo.image ||
              "https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images/pp.png"
            }
            alt="Profile"
            className="pp"
          />
          <button onClick={handleCopy}>share</button>
        </div>
        <h1>
          {userInfo.pseudo}
          {userInfo.certif && (
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "blue" }}
            ></i>
          )}
          {userInfo.pp_cosmetique && (
            <img src={userInfo.pp_cosmetique} alt="" className="cosmetique" />
          )}
        </h1>
        <p>{userInfo.bio || "This user hasn't written a bio yet."}</p>
      </div>
    </section>
  );
};
