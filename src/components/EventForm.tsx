import { type EventFormData, eventFormSchema } from "@/schmas/event-form.ts";
// import { createEventCard, uploadEventCardFile } from "@ddi-ring/api";
import { zodResolver } from "@hookform/resolvers/zod";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAddressSearch } from "../hooks/useAddressSearch";
import { AddressSearch } from "./AddressSearch";
import { ImageUpload } from "./ImageUpload";

interface EventFormProps {
  templateId: string;
}

export function EventForm({ templateId }: EventFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, setIsOpen, isScriptLoaded } = useAddressSearch();

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

  const handleAddressComplete = (data: any) => {
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
        template_key: templateId,
        thumbnail_image_id: thumbnailImageId,
        title: data.title,
        address: data.address,
        address_detail: data.addressDetail,
        invitation_message: data.invitationMessage,
        event_time: new Date(data.eventTime).toISOString(),
        password: data.password,
      });

      navigate(`/create/template/${templateId}/preview`);
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
      <div {...stylex.props(styles.addressGroup)}>
        <div {...stylex.props(styles.formGroup)}>
          <label htmlFor="address" {...stylex.props(styles.label)}>
            주소
          </label>
          <div {...stylex.props(styles.inputWrapper)}>
            <input
              type="text"
              id="address"
              placeholder="주소"
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
          <AddressSearch
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onComplete={handleAddressComplete}
            isScriptLoaded={isScriptLoaded}
          />
          {errors.address && (
            <span {...stylex.props(styles.errorText)}>
              {errors.address.message}
            </span>
          )}
        </div>

        <div {...stylex.props(styles.addressDetailGroup)}>
          <input
            type="text"
            id="addressDetail"
            placeholder="상세 주소를 입력하세요"
            {...register("addressDetail")}
            {...stylex.props(styles.input)}
          />
        </div>
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

      <ImageUpload
        register={register("thumbnailImage")}
        onClearError={() => clearErrors("thumbnailImage")}
        error={errors.thumbnailImage?.message}
      />

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
        <div {...stylex.props(styles.submitError)}>{errors.root.message}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        {...stylex.props(styles.submitButton)}
      >
        카드 생성하기
      </button>
    </form>
  );
}

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
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
  errorText: {
    color: "#E53E3E",
    fontSize: "12px",
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

  submitButton: {
    backgroundColor: "#FF731D",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    padding: "16px",
    width: "100%",
    ":disabled": {
      backgroundColor: "#FFB088",
      cursor: "not-allowed",
    },
  },
  addressGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  addressDetailGroup: {
    marginTop: 8,
    width: "100%",
    display: "flex",
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
});
