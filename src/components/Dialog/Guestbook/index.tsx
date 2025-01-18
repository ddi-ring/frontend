import { styles } from "@/components/Dialog/Guestbook/styles.ts";
import { EventCardCommentDTO } from "@ddi-ring/api/lib/structures/EventCardCommentDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import * as stylex from "@stylexjs/stylex";
import { format } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface GuestbookDialogProps {
  comments: EventCardCommentDTO[];
  onClose: () => void;
  onSubmit: SubmitHandler<Fields>;
}

const Fields = z.object({
  username: z.string().min(1),
  content: z.string().min(1),
});
type Fields = z.infer<typeof Fields>;

export function GuestbookDialog({
  comments,
  onClose,
  onSubmit,
}: GuestbookDialogProps) {
  const { handleSubmit, register } = useForm<Fields>({
    resolver: zodResolver(Fields),
  });

  return (
    <div {...stylex.props(styles.overlay)}>
      <div {...stylex.props(styles.dialog)}>
        <div {...stylex.props(styles.header)}>
          <h2 {...stylex.props(styles.title)}>
            방명록{" "}
            <span {...stylex.props(styles.titleNum)}>{comments.length}</span>
          </h2>
          <img
            onClick={onClose}
            src="/close.svg"
            alt="닫기 아이콘"
            {...stylex.props(styles.closeIcon)}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          {...stylex.props(styles.formContainer)}
        >
          <input
            type="text"
            placeholder="별명"
            {...stylex.props(styles.input)}
            {...register("username")}
          />
          <input
            type="text"
            placeholder="댓글 작성하기"
            {...stylex.props(styles.input)}
            {...register("content")}
          />
          <button type="submit" {...stylex.props(styles.submitButton)}>
            작성
          </button>
        </form>

        <div {...stylex.props(styles.comments)}>
          {comments.map((comment) => (
            <div key={comment.id} {...stylex.props(styles.commentItem)}>
              <div {...stylex.props(styles.commentHeader)}>
                <button {...stylex.props(styles.editButton)}>
                  {comment.username}
                </button>
                <span {...stylex.props(styles.date)}>
                  {format(
                    comment.updated_at ?? comment.created_at,
                    "yyyy.MM.dd"
                  )}
                </span>
              </div>
              <p {...stylex.props(styles.commentText)}>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
