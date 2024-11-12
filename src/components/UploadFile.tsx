"use client";

import { useRef, useState } from "react";

export default function UploadFile() {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // send to /api/upload
    try {
      setIsUploading(true);
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("file uploaded successfully");
        } else {
          alert("file upload failed");
        }
      }
    } catch (error) {
      console.error(error);
      alert("file upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section>
      <button
        className="border border-input bg-background hover:bg-accent hover:text-accent-foreground text-input px-4 py-2 rounded-md transition-colors"
        onClick={handleClick}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </button>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
    </section>
  );
}
