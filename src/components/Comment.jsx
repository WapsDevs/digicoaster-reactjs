import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";

export const Comment = ({ cid }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [cid]);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tweetcomment")
      .select("*")
      .eq("tid", cid)
      .order("created_at", { ascending: false }); // If created_at exists

    if (error) {
      console.error("Error fetching comments:", error.message);
    } else {
      setComments(data);
    }
    setLoading(false);
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <section className="comments">
      {comments.length === 0 ? null : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <h4>{comment.pseudo}</h4> <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
