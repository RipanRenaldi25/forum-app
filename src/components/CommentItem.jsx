import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { getTotalVote, parseDate, removeTags } from '../utils/utils';
import { useSelector } from 'react-redux';

function CommentItem({ content, createdAt, upVotesBy, downVotesBy, owner, onUpVoteComment, onDownVoteComment, onNeutralVoteComment, id, }) {
  const profile = useSelector((states) => states.profile);
  const { user } = profile || {};
  const isAlreadyUpVoted = upVotesBy.includes(user?.id);
  const isAlreadyDownVoted = downVotesBy.includes(user?.id);

  return (
    <div data-testid="comment-item" className='mb-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            alt='avatar'
            className='mr-2 h-7 w-7 rounded-full object-cover'
            src={owner.avatar || 'https://generated-image-url.jpg'}
          />
          <span className='text-sm font-medium text-white'>{owner.name}</span>
        </div>
        <div className='text-xs text-slate-400'>{parseDate(createdAt)}</div>
      </div>
      <p className='text-sm leading-6 text-slate-300'>{removeTags(content)}</p>
      <div className='mt-3 flex text-sm text-slate-400'>
        <div className='mr-4 flex items-center'>
          <button type='button' className="cursor-pointer" onClick={() => isAlreadyUpVoted ? onNeutralVoteComment(id) : onUpVoteComment(id)}>
            <FaThumbsUp className={isAlreadyUpVoted ? 'text-cyan-400' : 'text-slate-400'} />
          </button>
          <span className='ml-1'>{getTotalVote(upVotesBy)}</span>
        </div>
        <div className='flex items-center'>
          <button type='button' className="cursor-pointer" onClick={() => isAlreadyDownVoted ? onNeutralVoteComment(id) : onDownVoteComment(id)}>
            <FaThumbsDown className={isAlreadyDownVoted ? 'text-red-400' : 'text-slate-400'} />
          </button>
          <span className='ml-1'>{getTotalVote(downVotesBy)}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
