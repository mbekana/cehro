"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface BlogPost {
  title: string;
  content: string;
  image: string;
}

export default function AdminPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Store image as Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newPost: BlogPost = { title, content, image };
    const savedPosts: BlogPost[] = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    savedPosts.push(newPost);
    localStorage.setItem("blogPosts", JSON.stringify(savedPosts));

    alert("Blog post published!");
    router.push("/"); // Redirect to public page
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Admin: Create Blog Post</h1>
      <form onSubmit={handlePost}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} />}
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>Publish Post</button>
      </form>
    </div>
  );
}
