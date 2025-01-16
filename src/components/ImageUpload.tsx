import { ACCEPTED_IMAGE_TYPES } from "@/constant/file.ts";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface ImageUploadProps {
  register: UseFormRegisterReturn;
  onClearError: () => void;
  error?: string;
}

export function ImageUpload({
  register,
  onClearError,
  error,
}: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClearError();

    const files = e.target.files;
    if (!files) {
      return;
    }

    const newPreviewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <div {...stylex.props(styles.formGroup)}>
      <div {...stylex.props(styles.labelContainer)}>
        <label {...stylex.props(styles.label)}>이미지 업로드</label>
        <span {...stylex.props(styles.imageCount)}>{previewUrls.length}/5</span>
      </div>

      <div {...stylex.props(styles.imageGrid)}>
        <div {...stylex.props(styles.uploadBox)}>
          <input
            type="file"
            id="thumbnailImage"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            {...register}
            onChange={(e) => {
              register.onChange(e);
              handleImageChange(e);
            }}
            {...stylex.props(styles.imageInput)}
          />
          <img
            src="/gallery.svg"
            alt="갤러리 아이콘"
            {...stylex.props(styles.galleryIcon)}
          />
          <span {...stylex.props(styles.uploadText)}>이미지 추가</span>
        </div>

        {previewUrls.map((url, index) => (
          <div key={url} {...stylex.props(styles.imagePreview)}>
            <img src={url} alt={`Preview ${index + 1}`} />
          </div>
        ))}
      </div>

      {error && <span {...stylex.props(styles.errorText)}>{error}</span>}
    </div>
  );
}

const styles = stylex.create({
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  labelContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  imageCount: {
    fontSize: "14px",
    color: "#666",
  },
  imageGrid: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    paddingBottom: "4px",
  },
  uploadBox: {
    width: "100px",
    height: "100px",
    border: "1px solid #DDE1E6",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    position: "relative",
    flexShrink: 0,
    backgroundColor: "#F8F9FA",
  },
  galleryIcon: {
    width: 24,
    height: 24,
  },
  imageInput: {
    cursor: "pointer",
    height: "100%",
    left: 0,
    opacity: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  uploadText: {
    fontSize: "12px",
    color: "#666",
  },
  imagePreview: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    overflow: "hidden",
    flexShrink: 0,
    backgroundColor: "#F8F9FA",
  },
  "imagePreview img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  errorText: {
    color: "#E53E3E",
    fontSize: "12px",
  },
});
