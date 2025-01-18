import { styles } from "@/components/ImageUpload/styles.ts";
import type { ImageUploadProps } from "@/components/ImageUpload/types.ts";
import { ASSET_URL } from "@/constant/assetUrl.ts";
import { ACCEPTED_IMAGE_TYPES } from "@/constant/file.ts";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

export function ImageUpload({
  register,
  onClearError,
  error,
}: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClearError();

    const files = e.target.files;

    if (!files) {
      return;
    }

    setFileName(files[0].name);
    const newPreviewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <div {...stylex.props(styles.formGroup)}>
      <div {...stylex.props(styles.labelContainer)}>
        <p {...stylex.props(styles.label)}>이미지 업로드</p>
      </div>

      {fileName ? (
        <div {...stylex.props(styles.deleteBox)}>
          <span {...stylex.props(styles.imageCount)}>{fileName}</span>
          <img
            src={`${ASSET_URL}/ic_delete.svg`}
            alt="delete"
            {...stylex.props(styles.icon)}
            onClick={() => {
              setFileName("");
              setPreviewUrls([]);
            }}
          />
        </div>
      ) : (
        <div {...stylex.props(styles.uploadBox)}>
          <input
            type="file"
            id="thumbnailImage"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            {...register}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onChange={(e) => {
              register.onChange(e);
              handleImageChange(e);
            }}
            {...stylex.props(styles.imageInput)}
          />

          <img
            src={`${ASSET_URL}/ic_image${isHovered ? "_color" : ""}.svg`}
            alt="갤러리 아이콘"
          />
          <span {...stylex.props(styles.uploadText(isHovered))}>
            이미지 추가
          </span>
        </div>
      )}

      {error && <span {...stylex.props(styles.errorText)}>{error}</span>}
    </div>
  );
}
