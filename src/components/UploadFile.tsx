"use client";

import { useRef, useState } from "react";

export default function UploadFile() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    // send to /api/upload
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onreadystatechange = function () {
        if (xhr.readyState != XMLHttpRequest.DONE) {
          return;
        }

        if (xhr.status >= 200 && xhr.status < 400) {
          alert("file uploaded successfully");
        } else {
          alert("file upload failed");
        }

        setIsUploading(false);
        setUploadProgress(0);
      };

      xhr.addEventListener("error", () => {
        alert("file upload failed");
        setIsUploading(false);
      });

      xhr.upload.addEventListener("progress", (progressEvt) => {
        if (progressEvt.lengthComputable) {
          const percentComplete =
            (progressEvt.loaded / progressEvt.total) * 100;
          setUploadProgress(Math.floor(percentComplete));
        }
      });

      xhr.open("POST", "/api/upload", true);
      xhr.send(formData);
    }
  };

  return (
    <section>
      <button
        className="border border-input bg-background hover:bg-accent hover:text-accent-foreground text-input px-4 py-2 rounded-md transition-colors"
        onClick={handleClick}
        disabled={isUploading}
      >
        {isUploading ? `Uploading...(${uploadProgress}%)` : "Upload File"}
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
