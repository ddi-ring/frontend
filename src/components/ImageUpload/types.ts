import type { UseFormRegisterReturn } from "react-hook-form";

export interface ImageUploadProps {
  register: UseFormRegisterReturn;
  onClearError: () => void;
  error?: string;
}
