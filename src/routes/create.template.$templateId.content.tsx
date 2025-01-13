import stylex from "@stylexjs/stylex";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "../components/Button";
import { Flex } from "../components/Flex";
import { Input } from "../components/Input";
import { TextField, TextFieldLabel } from "../components/TextField";

export default function Page() {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.headerTitle)}>내용 입력</h1>
      </header>
      <main {...stylex.props(styles.main)}>
        <CreateForm />
      </main>
    </>
  );
}

const Fields = z.object({
  address_detail: z.string(),
  address: z.string(),
  event_time: z.string(),
  invitation_message: z.string(),
  password: z.string(),
  thumbnail_image_id: z.string(),
  title: z.string(),
});

function CreateForm() {
  const form = useForm({
    validators: {
      onBlur: Fields,
    },
  });

  return (
    <Flex asChild={true} direction="column" gap={16}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="title">
          {(field) => (
            <TextField
              error={field.state.meta.errors.length > 0}
              label={<TextFieldLabel>제목</TextFieldLabel>}
              name={field.name}
              placeholder="초대장 제목을 입력해주세요"
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={({ currentTarget: { value } }) => {
                field.handleChange(value);
              }}
            />
          )}
        </form.Field>
        <AddressField label="장소" />
        <label>
          <TextFieldLabel>일자</TextFieldLabel>
          <Input placeholder="0000.00.00" type="date" />
        </label>
        <label>
          <TextFieldLabel>시간</TextFieldLabel>
          <Input placeholder="00:00" type="time" />
          <Input placeholder="00:00" type="time" />
        </label>
        <label>
          <TextFieldLabel>이미지 업로드</TextFieldLabel>
          <Input type="file" accept="image/*" />
        </label>
        <label>
          <TextFieldLabel>설명</TextFieldLabel>
          <textarea placeholder="초대장 설명을 입력해주세요" />
        </label>
        <form.Field name="password">
          {(field) => (
            <TextField
              bottomText={<TextFieldLabel>초대장 비밀번호</TextFieldLabel>}
              label={<TextFieldLabel>초대장 비밀번호</TextFieldLabel>}
              name={field.name}
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={({ currentTarget: { value } }) => {
                field.handleChange(value);
              }}
            />
          )}
        </form.Field>
        <form.Subscribe selector={({ isSubmitting }) => isSubmitting}>
          {(isSubmitting) => (
            <Button disabled={isSubmitting}>카드 생성하기</Button>
          )}
        </form.Subscribe>
      </form>
    </Flex>
  );
}

function AddressField({ label }: { label: string }) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <Input placeholder="주소" type="text" />
      <Button type="button">주소 찾기</Button>
      <Input placeholder="상세 주소를 입력해주세요" type="text" />
    </fieldset>
  );
}

const styles = stylex.create({
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottom: "1px solid #DDE1E6",
    display: "flex",
    height: 52,
    justifyContent: "center",
    padding: "14px 16px",
    position: "fixed",
    top: 0,
    width: "100%",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "19.8px",
  },
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
});
