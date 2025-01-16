import { ACCEPTED_IMAGE_TYPES } from "@/constant/file.ts";
import * as stylex from "@stylexjs/stylex";
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
  return (
    <div {...stylex.props(styles.formGroup)}>
      <label {...stylex.props(styles.label)}>이미지 업로드</label>
      <div {...stylex.props(styles.imageUploadContainer)}>
        <input
          type="file"
          id="thumbnailImage"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          {...register}
          onClick={onClearError}
          {...stylex.props(styles.imageInput)}
        />
        <div {...stylex.props(styles.uploadPlaceholder)}>
          <span>클릭하여 이미지 업로드</span>
          <span {...stylex.props(styles.uploadHelper)}>
            5MB 이하의 JPG, PNG, WEBP 이미지
          </span>
        </div>
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
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  imageUploadContainer: {
    border: "2px dashed #DDE1E6",
    borderRadius: 8,
    cursor: "pointer",
    padding: "24px",
    position: "relative",
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
  uploadPlaceholder: {
    color: "#666",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    textAlign: "center",
  },
  uploadHelper: {
    color: "#999",
    fontSize: 12,
  },
  errorText: {
    color: "#E53E3E",
    fontSize: "12px",
  },
});
