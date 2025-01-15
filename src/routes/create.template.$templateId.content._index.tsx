import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";
import type { Route } from "./+types/create.template.$templateId.content._index";

export async function loader({ params }: Route.LoaderArgs) {
    // Here you would typically fetch the template details using the templateId
    // For now, we'll return mock data
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
    time: string;
    location: string;
    description: string;
    contactNumber: string;
};

export default function Page({ loaderData: { template } }: Route.ComponentProps) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        contactNumber: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                <h1 {...stylex.props(styles.headerTitle)}>초대장 내용 입력</h1>
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
                        <label htmlFor="date" {...stylex.props(styles.label)}>날짜</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            {...stylex.props(styles.input)}
                        />
                    </div>

                    <div {...stylex.props(styles.formGroup)}>
                        <label htmlFor="time" {...stylex.props(styles.label)}>시간</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
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
                        <label htmlFor="description" {...stylex.props(styles.label)}>상세 내용</label>
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
                        <label htmlFor="contactNumber" {...stylex.props(styles.label)}>연락처</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="000-0000-0000"
                            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
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
});