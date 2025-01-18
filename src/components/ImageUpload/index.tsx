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
  const [isHovered, setIsHovered] = useState(false);

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

      <div {...stylex.props(styles.imageContainer)}>
        <div {...stylex.props(styles.uploadBox)}>
          <input
            type="file"
            multiple
            id="thumbnailImage"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            {...register}
            onChange={(e) => {
              register.onChange(e);
              handleImageChange(e);
            }}
            {...stylex.props(styles.imageInput)}
          />
          <img src={`${ASSET_URL}/ic_image.svg`} alt="갤러리 아이콘" />
          <span {...stylex.props(styles.uploadText)}>이미지 추가</span>
        </div>

        <div {...stylex.props(styles.previewScroll)}>
          {previewUrls.map((url, index) => (
            <div key={url} {...stylex.props(styles.imagePreview)}>
              <img src={url} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {error && <span {...stylex.props(styles.errorText)}>{error}</span>}
    </div>
  );
}
