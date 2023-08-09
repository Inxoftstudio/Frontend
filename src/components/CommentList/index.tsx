import style from "./style.module.css";
import Comment from "../Comments/index";


interface CommentProps {
    comments: Array<{
        createdAt: string;
        authorUsername: string;
        content: string;
    }>;
}
    


const CommentList: React.FC<CommentProps> = ({ comments }) => {

  return (
    <div className={style.commentListWrapper}>
      <div className={style.commentList}>
        {comments.length === 0 ? (
          <div className={style.noComments}>No comments posted</div>
        ) : (
          comments.map((comment: any) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentList;