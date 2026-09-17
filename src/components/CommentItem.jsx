import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { getTotalVote, parseDate, removeTags } from '../utils/utils';

function CommentItem({ content, createdAt, upVotesBy, downVotesBy, owner }) {
  return (
    <div className='mb-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4'>
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
          <button type='button'>
            <FaThumbsUp />
          </button>
          <span className='ml-1'>{getTotalVote(upVotesBy)}</span>
        </div>
        <div className='flex items-center'>
          <button type='button'>
            <FaThumbsDown />
          </button>
          <span className='ml-1'>{getTotalVote(downVotesBy)}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
