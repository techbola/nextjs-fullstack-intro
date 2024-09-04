"use client";
import React, { useState } from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }

    // Clear the form
    setTitle("");
    setContent("");
  };

  return (
    <main className={styles.main}>
      <Link href={"/"}>View Feed</Link>
      <div>Add Post</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
