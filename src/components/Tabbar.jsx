import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../SupabaseClient";

export const Tabbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [image, setimage] = useState("");

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
      <nav className="mobile-tabbar">
        <div className="tab-left">
          <button onClick={() => navigate("/")}>
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </button>

          <button onClick={() => navigate("/theme-park")}>
            <i className="fa-solid fa-wand-sparkles"></i>
            <span>Park</span>
          </button>
        </div>

        <button className="new-post-btn" onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus"></i>
        </button>

        <div className="tab-right">
          <button onClick={() => navigate("/other")}>
            <i class="fa-solid fa-book"></i>
            <span>other</span>
          </button>

          <button onClick={() => navigate("/profil")}>
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </button>
        </div>
      </nav>
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
