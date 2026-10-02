import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

function CommentList({ comments, onUpVoteComment, onDownVoteComment, onNeutralVoteComment }) {
  const currentUserId = useSelector((state) => state.profile?.user?.id);
  if (comments.length === 0) {
    return (
      <p className='rounded-2xl border border-dashed border-white/15 px-4 py-6 text-sm text-slate-400'>
        Belum ada komentar.
      </p>
    );
  }

  return (
    <div>
      <div className='header w-full space-y-3'>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            onUpVoteComment={onUpVoteComment}
            onDownVoteComment={onDownVoteComment}
            onNeutralVoteComment={onNeutralVoteComment}
            comment={comment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentList;
