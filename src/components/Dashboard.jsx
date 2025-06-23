import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";

export const Dashboard = ({ children, isActive }) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [image, setimage] = useState("");
  const navigate = useNavigate();

  async function postT() {
    if (content.trim() === "") {
      alert("Please enter some content before publishing.");
      return;
    }

    let imageLink = "";

    if (image) {
      // Nettoyage du nom de fichier (slugify)
      const timestamp = Date.now();
      const extension = image.name.split(".").pop();
      const safeFileName = `image_${timestamp}.${extension}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(`images/${safeFileName}`, image);

      if (error) {
        console.error("Image upload error:", error.message);
        alert("Image upload failed. Please use a different image.");
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("images")
        .getPublicUrl(`images/${safeFileName}`);

      imageLink = publicUrl;
    }

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
      .select("*")
      .eq("uid", user?.id);

    if (userInfoError || !user_info?.length) {
      alert("User info not found. Please complete your profile.");
      return;
    }

    const { data: insertData, error: insertError } = await supabase
      .from("tweet")
      .insert([
        {
          pp: user_info[0]?.image || null,
          pseudo: user_info[0]?.pseudo || "",
          content: content,
          image: imageLink || null,
          iscertif: user_info[0]?.certif || false,
          uid: user_info[0]?.uid || "",
        },
      ])
      .select();

    if (insertError) {
      alert("Failed to publish tweet. Please try again.");
    } else {
      alert("Your post has been published successfully!");
      setShowModal(false);
      setContent("");
      setimage("");
    }
  }

  return (
    <>
      <aside>
        <div className="logo">
          <img
            src="https://qacizfsxcsxsgpzdjryn.supabase.co/storage/v1/object/public/images/images/logo.png"
            alt="Logo"
          />
        </div>
        <ul>
          <li
            className={isActive === "home" ? "active" : null}
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-house"></i>Home
          </li>
          <li
            onClick={() => navigate("/theme-park")}
            className={isActive === "park" ? "active" : null}
          >
            <i className="fa-solid fa-wand-sparkles"></i>Theme Park
          </li>

          <li
            onClick={() => navigate("/other")}
            className={isActive === "other" ? "active" : null}
          >
            <i className="fa-solid fa-book"></i>Other
          </li>

          <li
            className={isActive === "profil" ? "active" : null}
            onClick={() => navigate("/profil")}
          >
            <i className="fa-solid fa-user"></i>
            Profile
          </li>
          <li
            style={{ color: "rgb(92, 6, 6)" }}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <i
              class="fa-solid fa-right-from-bracket"
              style={{ color: "rgb(92, 6, 6)" }}
            ></i>
            Logout
          </li>
        </ul>
        <button onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus"></i>New Post
        </button>
      </aside>
      <div className="main">{children}</div>
      {showModal && (
        <div className="configurate modal">
          <div className="modal-content">
            <h1>Share your passion!</h1>

            <div className="form-group">
              <label htmlFor="timg">Image (optional)</label>
              <input
                type="file"
                id="timg"
                name="timg"
                className="banner-input"
                accept="image/*"
                onChange={(e) => setimage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">content</label>
              <textarea
                id="content"
                name="content"
                placeholder="example: hi what do you think of..."
                rows="3"
                maxLength={500}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button className="save-button" onClick={postT}>
                published
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
    </>
  );
};
