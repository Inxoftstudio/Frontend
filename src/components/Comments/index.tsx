import style from "./style.module.css";

interface CommentProps {
  comment: {
    createdAt: string;
    authorUsername: string;
    content: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {

  const { authorUsername, content, createdAt } = comment;

  const date = new Date(createdAt).toDateString();

  return (
    <div className={style.comment}>
      <div className={style.commentText}>{content}</div>
      <div className={style.header}>
        <div className={style.author}>{authorUsername}</div>
        <div className={style.date}>{date}</div>
      </div>
    </div>
  );
}

export default Comment;