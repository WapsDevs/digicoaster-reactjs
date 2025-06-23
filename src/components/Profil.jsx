import { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

export const Profil = () => {
  const [showModal, setShowModal] = useState(false);
  const [Pseudo, setPseudo] = useState("");
  const [bio, setBio] = useState("");
  const [pictur, setPictur] = useState("");
  const [Banner, setBanner] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      setPseudo(userInfo.pseudo || "");
      setBio(userInfo.bio || "");
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      const { data: authData } = await supabase.auth.getUser(token);

      if (authData?.user?.id) {
        const { data: userData, error } = await supabase
          .from("user_info")
          .select("*")
          .eq("uid", authData.user.id)
          .single(); // pour récupérer juste un objet pas un tableau

        if (error) {
          console.error(error);
        } else {
          setUserInfo(userData);
        }
      }
    };

    fetchUserInfo();
  }, []);
  async function uploadImage(file, a) {
    const token = localStorage.getItem("token");
    const { data: authData } = await supabase.auth.getUser(token);

    const { data, error } = await supabase.storage
      .from("images")
      .upload("images/" + file.name, file);

    if (error) {
      console.error("Erreur :", error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl("images/" + file.name);

    if (a === true) {
      const { data: updatedUsers, errorss } = await supabase
        .from("user_info")
        .update({ image: publicUrl })
        .eq("uid", authData.user.id)
        .select()
        .single();
    } else {
      const { data: updatedUsers, errorss } = await supabase
        .from("user_info")
        .update({ banner: publicUrl })
        .eq("uid", authData.user.id)
        .select()
        .single();
    }

    console.log("Image URL:", publicUrl);
  }

  const save = async () => {
    const token = localStorage.getItem("token");
    const { data: authData } = await supabase.auth.getUser(token);

    if ((Pseudo !== "") & (bio !== "")) {
      const { data: updatedUser, error } = await supabase
        .from("user_info")
        .update({ pseudo: Pseudo, bio: bio })
        .eq("uid", authData.user.id)
        .select()
        .single();

      if (error) {
        console.error(error);
      } else {
        setUserInfo(updatedUser); // met à jour l'affichage directement
        setShowModal(false);
      }
    } else {
      alert("missing field !");
    }
    if (pictur != "") {
      uploadImage(pictur, true);
    } else if (Banner != "") {
      uploadImage(Banner, false);
    }
  };

  return (
    <section className="profil">
      <img
        src={
          userInfo?.banner ||
          "https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images//banner.png"
        }
        alt=""
        className="banner"
      />
      <div className="user-info">
        <div className="user-head">
          <img
            src={
              userInfo?.image ||
              "https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images//pp.png"
            }
            alt=""
            className="pp"
          />
          <div className="btns">
            <button onClick={() => setShowModal(true)}>configurate</button>
            <button
              className="share"
              onClick={() => navigate("/profil/" + userInfo?.uid)}
            >
              share
            </button>
          </div>
        </div>
        <h1>
          {userInfo?.pseudo || "Loading..."}
          {userInfo?.certif ? (
            <i className="fa-solid fa-circle-chevron-down"></i>
          ) : null}
        </h1>
        <p>{userInfo?.bio || "Set up your account!"}</p>
      </div>

      {showModal && (
        <div className="configurate modal">
          <div className="modal-content">
            <h1>Account Setup</h1>

            <div className="form-group">
              <label htmlFor="banner">Banner</label>
              <input
                type="file"
                id="banner"
                name="banner"
                className="banner-input"
                accept="image/*"
                onChange={(e) => setBanner(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profilePicture">Pictures</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                className="ppi"
                accept="image/*"
                onChange={(e) => setPictur(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                value={Pseudo}
                placeholder="Your username"
                required
                maxLength={30}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Biography</label>
              <textarea
                id="bio"
                name="bio"
                value={bio}
                placeholder="Tell us about yourself..."
                rows="3"
                maxLength={200}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="modal-buttons">
              <button className="save-button" onClick={save}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
