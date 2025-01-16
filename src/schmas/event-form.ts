import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constant/file.ts";
import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  address: z.string().min(1, "주소를 입력해주세요"),
  addressDetail: z.string().optional(),
  invitationMessage: z.string().optional(),
  eventDate: z
    .string()
    .regex(/^\d{4}\.\d{2}\.\d{2}$/, "올바른 날짜 형식이 아닙니다 (0000.00.00)"),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "올바른 시간 형식이 아닙니다 (00:00)"),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "올바른 시간 형식이 아닙니다 (00:00)"),
  password: z
    .string()
    .length(4, "4자리 숫자를 입력해주세요")
    .regex(/^\d+$/, "숫자만 입력 가능합니다"),
  thumbnailImage: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "파일 크기는 5MB 이하여야 합니다",
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다",
    ),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
