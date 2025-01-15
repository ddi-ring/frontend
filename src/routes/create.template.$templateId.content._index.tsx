import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";
import type { Route } from "./+types/create.template.$templateId.content._index";

export async function loader({ params }: Route.LoaderArgs) {
    return {
        template: {
            id: params.templateId,
            title: "이벤트 초대장",
        },
    };
}

type FormData = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    password: string;
    imageUrl: string;
};

export default function Page({ loaderData: { template } }: Route.ComponentProps) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        description: "",
        password: "",
        imageUrl: "",
    });

    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('image/')) {
            setUploadError('이미지 파일만 업로드 가능합니다.');
            return;
        }

        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('파일 크기는 5MB 이하여야 합니다.');
            return;
        }

        setIsUploading(true);
        setUploadError("");


    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically submit the form data to your API
        console.log("Form submitted:", formData);
        // Navigate to next step or preview page
        navigate(`/create/template/${template.id}/preview`);
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
                <h1 {...stylex.props(styles.headerTitle)}> 내용 입력</h1>
            </header>

            <main {...stylex.props(styles.main)}>
                <form onSubmit={handleSubmit} {...stylex.props(styles.form)}>
                    <div {...stylex.props(styles.formGroup)}>
                        <label htmlFor="title" {...stylex.props(styles.label)}>제목</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="초대장 제목을 입력하세요"
                            required
                            {...stylex.props(styles.input)}
                        />
                    </div>

                    <div {...stylex.props(styles.formGroup)}>
                        <label htmlFor="location" {...stylex.props(styles.label)}>장소</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="행사 장소를 입력하세요"
                            required
                            {...stylex.props(styles.input)}
                        />
                    </div>

                    <div {...stylex.props(styles.formGroup)}>
                        <label htmlFor="date" {...stylex.props(styles.label)}>날짜</label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="2024년 1월 15일"
                            required
                            {...stylex.props(styles.input)}
                        />
                    </div>


                    <div {...stylex.props(styles.formGroup)}>
                        <label {...stylex.props(styles.label)}>시간</label>
                        <div {...stylex.props(styles.timeInputContainer)}>
                            <div {...stylex.props(styles.timeInputWrapper)}>
                                <input
                                    type="text"
                                    id="startTime"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    placeholder="00:00"
                                    required
                                    {...stylex.props(styles.timeInput)}
                                />
                            </div>
                            <span {...stylex.props(styles.timeSeparator)}>~</span>
                            <div {...stylex.props(styles.timeInputWrapper)}>
                                <input
                                    type="text"
                                    id="endTime"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    placeholder="00:00"
                                    required
                                    {...stylex.props(styles.timeInput)}
                                />
                            </div>
                        </div>
                    </div>

                    <div {...stylex.props(styles.formGroup)}>
                        <label htmlFor="image" {...stylex.props(styles.label)}>이벤트 이미지</label>
                        <div {...stylex.props(styles.imageUploadContainer)}>
                            {formData.imageUrl ? (
                                <div {...stylex.props(styles.imagePreviewWrapper)}>
                                    <img
                                        src={formData.imageUrl}
                                        alt="이벤트 이미지"
                                        {...stylex.props(styles.imagePreview)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({...prev, imageUrl: ""}))}
                                        {...stylex.props(styles.removeImageButton)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ) : (
                                <div {...stylex.props(styles.imageUploadWrapper)}>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                        {...stylex.props(styles.imageInput)}
                                    />
                                    <div {...stylex.props(styles.uploadPlaceholder)}>
                                        {isUploading ? (
                                            <span>업로드 중...</span>
                                        ) : (
                                            <>
                                                <span>클릭하여 이미지 업로드</span>
                                                <span {...stylex.props(styles.uploadHelper)}>
                          5MB 이하의 이미지 파일
                        </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {uploadError && (
                            <span {...stylex.props(styles.errorMessage)}>{uploadError}</span>
                        )}
                    </div>


                    <div {...stylex.props(styles.formGroup)}>
                        <label htmlFor="description" {...stylex.props(styles.label)}>설명</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="초대장 내용을 입력하세요"
                            required
                            {...stylex.props(styles.textarea)}
                        />
                    </div>

                    <div {...stylex.props(styles.formGroup)}>
                        <label htmlFor="password" {...stylex.props(styles.label)}>초대장 비밀번호</label>
                        <input
                            type="tel"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력해주세요(****)"
                            required
                            {...stylex.props(styles.input)}
                        />
                    </div>

                    <button type="submit" {...stylex.props(styles.submitButton)}>
                        다음으로
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
        width: 430,
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
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 500,
        color: "#333",
    },
    input: {
        border: "1px solid #DDE1E6",
        borderRadius: 8,
        fontSize: 16,
        padding: "12px 16px",
        width: "100%",
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
    },
    timeInputContainer: {
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    timeInputWrapper: {
        flex: 1,
    },
    timeInput: {
        border: "1px solid #DDE1E6",
        borderRadius: 8,
        fontSize: 16,
        padding: "12px 16px",
        width: "100%",
    },
    timeSeparator: {
        color: "#666",
        fontSize: 16,
    },
    imageUploadContainer: {
        width: "100%",
    },
    imageUploadWrapper: {
        border: "2px dashed #DDE1E6",
        borderRadius: 8,
        cursor: "pointer",
        padding: "24px",
        position: "relative",
        textAlign: "center",
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
    },
    uploadHelper: {
        color: "#999",
        fontSize: 12,
    },
    imagePreviewWrapper: {
        position: "relative",
        width: "100%",
    },
    imagePreview: {
        borderRadius: 8,
        width: "100%",
        height: "auto",
    },
    removeImageButton: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "none",
        borderRadius: 4,
        color: "#fff",
        cursor: "pointer",
        fontSize: 14,
        padding: "6px 12px",
        position: "absolute",
        right: 8,
        top: 8,
    },
    errorMessage: {
        color: "#E53E3E",
        fontSize: 12,
        marginTop: 4,
    },
});