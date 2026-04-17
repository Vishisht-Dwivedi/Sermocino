"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";
type Props = {
  onChange?: (file: File | null) => void;
  label?: string;
};
export default function ImageUpload({ onChange, label = "Upload Image" }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return false;
    }
    return true;
  };
  const handleFile = (file: File) => {
    if (!validateFile(file)) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };
  return (
    <div className="space-y-2">
      <label className="px-0.5 text-sm font-medium text-emerald-900">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-3 transition
          ${
            dragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-emerald-900/30 bg-white/60 hover:bg-white/80"
          }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="h-32 w-32 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="text-center text-sm text-emerald-900/70">
            <p className="font-medium">Click or drag image</p>
            <p className="text-xs">PNG, JPG up to 5MB</p>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onInputChange}
        className="hidden"
      />
    </div>
  );
}