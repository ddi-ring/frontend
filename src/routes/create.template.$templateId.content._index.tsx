import { zodResolver } from "@hookform/resolvers/zod";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/create.template.$templateId.content._index";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const eventFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  address: z.string().min(1, "주소를 입력해주세요"),
  addressDetail: z.string().optional(),
  invitationMessage: z.string().optional(),
  eventTime: z.string().min(1, "이벤트 시간을 선택해주세요"),
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

type EventFormData = z.infer<typeof eventFormSchema>;

export async function loader({ params }: Route.LoaderArgs) {
  return {
    template: {
      id: params.templateId,
      title: "이벤트 초대장",
    },
  };
}

export default function Page({
  loaderData: { template },
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("address", fullAddress);
    clearErrors("address");
    setIsOpen(false);
  };

  const openPostcode = () => {
    if (!isScriptLoaded) {
      return;
    }

    const postcodeContainer = document.getElementById(
      "daum-postcode-container",
    );
    if (!postcodeContainer) {
      return;
    }

    const postcode = new window.daum.Postcode({
      oncomplete: handleComplete,
      width: "100%",
      height: "100%",
    });

    postcode.embed(postcodeContainer);
  };

  useEffect(() => {
    if (isOpen && isScriptLoaded) {
      openPostcode();
    }
  }, [isOpen, isScriptLoaded]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      address: "",
      addressDetail: "",
      invitationMessage: "",
      eventTime: "",
      password: "",
    },
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true);

      let thumbnailImageId = undefined;
      if (data.thumbnailImage?.length) {
        const uploadResult = await uploadEventCardFile({
          file: data.thumbnailImage[0],
        });
        thumbnailImageId = uploadResult.id;
      }

      await createEventCard({
        template_key: template.id,
        thumbnail_image_id: thumbnailImageId,
        title: data.title,
        address: data.address,
        address_detail: data.addressDetail,
        invitation_message: data.invitationMessage,
        event_time: new Date(data.eventTime).toISOString(),
        password: data.password,
      });

      navigate(`/create/template/${template.id}/preview`);
    } catch (error) {
      console.error("Form submission error:", error);
      setError("root", {
        message: "초대장 생성 중 오류가 발생했습니다",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.header)}>
        <button
          onClick={() => navigate(-1)}
          {...stylex.props(styles.backButton)}
        >
          ←
        </button>
        <h1 {...stylex.props(styles.headerTitle)}>내용 입력</h1>
      </header>

      <main {...stylex.props(styles.main)}>
        <form onSubmit={handleSubmit(onSubmit)} {...stylex.props(styles.form)}>
          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor="title" {...stylex.props(styles.label)}>
              제목
            </label>
            <input
              type="text"
              id="title"
              placeholder="초대장 제목을 입력하세요"
              {...register("title")}
              {...stylex.props(styles.input)}
            />
            {errors.title && (
              <span {...stylex.props(styles.errorText)}>
                {errors.title.message}
              </span>
            )}
          </div>

          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor="address" {...stylex.props(styles.label)}>
              주소
            </label>
            <div {...stylex.props(styles.inputWrapper)}>
              <input
                type="text"
                id="address"
                placeholder="주소를 입력하세요"
                readOnly
                {...register("address")}
                {...stylex.props(styles.input)}
              />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                {...stylex.props(styles.searchButton)}
              >
                주소 찾기
              </button>
            </div>
            {errors.address && (
              <span {...stylex.props(styles.errorText)}>
                {errors.address.message}
              </span>
            )}

            {isOpen && (
              <div
                {...stylex.props(styles.modalOverlay)}
                onClick={() => setIsOpen(false)}
              >
                <div
                  {...stylex.props(styles.modalContent)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div {...stylex.props(styles.modalHeader)}>
                    <h2 {...stylex.props(styles.modalTitle)}>주소 검색</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      {...stylex.props(styles.closeButton)}
                    >
                      ✕
                    </button>
                  </div>
                  <div
                    id="daum-postcode-container"
                    {...stylex.props(styles.postcodeContainer)}
                  />
                </div>
              </div>
            )}
          </div>

          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor="addressDetail" {...stylex.props(styles.label)}>
              상세 주소
            </label>
            <input
              type="text"
              id="addressDetail"
              placeholder="상세 주소를 입력하세요"
              {...register("addressDetail")}
              {...stylex.props(styles.input)}
            />
          </div>

          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor="eventTime" {...stylex.props(styles.label)}>
              이벤트 시간
            </label>
            <input
              type="datetime-local"
              id="eventTime"
              {...register("eventTime")}
              {...stylex.props(styles.input)}
            />
            {errors.eventTime && (
              <span {...stylex.props(styles.errorText)}>
                {errors.eventTime.message}
              </span>
            )}
          </div>

          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor="thumbnailImage" {...stylex.props(styles.label)}>
              이벤트 이미지
            </label>
            <div {...stylex.props(styles.imageUploadContainer)}>
              <input
                type="file"
                id="thumbnailImage"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                {...register("thumbnailImage")}
                onClick={() => clearErrors("thumbnailImage")}
                {...stylex.props(styles.imageInput)}
              />
              <div {...stylex.props(styles.uploadPlaceholder)}>
                <span>클릭하여 이미지 업로드</span>
                <span {...stylex.props(styles.uploadHelper)}>
                  5MB 이하의 JPG, PNG, WEBP 이미지
                </span>
              </div>
            </div>
            {errors.thumbnailImage && (
              <span {...stylex.props(styles.errorText)}>
                {errors.thumbnailImage.message}
              </span>
            )}
          </div>

          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor="invitationMessage" {...stylex.props(styles.label)}>
              초대 메시지
            </label>
            <textarea
              id="invitationMessage"
              placeholder="초대장 내용을 입력하세요"
              {...register("invitationMessage")}
              {...stylex.props(styles.textarea)}
            />
          </div>

          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor="password" {...stylex.props(styles.label)}>
              초대장 비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="4자리 숫자를 입력해주세요"
              maxLength={4}
              {...register("password")}
              {...stylex.props(styles.input)}
            />
            {errors.password && (
              <span {...stylex.props(styles.errorText)}>
                {errors.password.message}
              </span>
            )}
          </div>

          {errors.root && (
            <div {...stylex.props(styles.submitError)}>
              {errors.root.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            {...stylex.props(styles.submitButton)}
          >
            {isSubmitting ? "처리중..." : "다음으로"}
          </button>
        </form>
      </main>
    </div>
  );
}

const styles = stylex.create({
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottom: "1px solid #DDE1E6",
    display: "flex",
    height: 52,
    padding: "14px 16px",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  backButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 20,
    padding: 8,
    position: "absolute",
    left: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "19.8px",
    textAlign: "center",
  },
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  textarea: {
    border: "1px solid #DDE1E6",
    borderRadius: 8,
    fontSize: 16,
    minHeight: 120,
    padding: "12px 16px",
    resize: "vertical",
    width: "100%",
  },
  submitError: {
    backgroundColor: "#FEB2B2",
    borderRadius: 4,
    color: "#C53030",
    fontSize: 14,
    padding: "8px 12px",
    textAlign: "center",
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
  submitButton: {
    backgroundColor: "#FF731D",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    padding: "16px",
    width: "100%",
    ":disabled": {
      backgroundColor: "#FFB088",
      cursor: "not-allowed",
    },
  },
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
  inputWrapper: {
    display: "flex",
    gap: "8px",
    width: "100%",
  },
  input: {
    flex: "1",
    border: "1px solid #DDE1E6",
    borderRadius: "8px",
    fontSize: "16px",
    padding: "12px 16px",
    backgroundColor: "#F8F9FA",
    cursor: "default",
  },
  searchButton: {
    backgroundColor: "#FF731D",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0 16px",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  errorText: {
    color: "#E53E3E",
    fontSize: "12px",
  },
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "50",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #DDE1E6",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "4px",
    color: "#666",
  },
  postcodeContainer: {
    width: "100%",
    height: "400px",
  },
});
