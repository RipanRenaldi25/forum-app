import { FaRegCommentDots, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cutText, getTotalVote, parseDate, removeTags } from '../utils/utils';
import { asyncUpVoteThread } from '../state/threads/Action';

function ThreadItem({
  title,
  body,
  category,
  createdAt,
  id,
  totalComments,
  upVotesBy,
  downVotesBy,
  owner,
  ownerAvatar,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const isUpVoted = user && upVotesBy.includes(user.id);
  console.log({ isUpVoted });

  const handleUpVote = (e) => {
    if (!user){
      return;
    }
    dispatch(asyncUpVoteThread(id, user.id));
  };

  return (
    <section className='group w-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.1]'>
      <div className='mb-3 flex items-center justify-between gap-3'>
        <div className='inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200'>
          #{category}
        </div>
        <span className='text-xs text-slate-400'>{parseDate(createdAt)}</span>
      </div>

      <Link to={`/detail/${id}`} className='block group-hover:no-underline'>
        <h1 className='text-lg font-semibold text-white group-hover:text-cyan-100'>{title}</h1>
        <p className='mt-2 mb-4 leading-6 text-slate-300'>{cutText(removeTags(body))}</p>
      </Link>

      <div className='flex flex-wrap items-center gap-4 text-slate-300'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center'>
            <button
              type='button'
              className={'cursor-pointer text-slate-400 hover:text-cyan-400 transition-colors'}
              onClick={handleUpVote}
            >
              <FaThumbsUp className={`text-cyan-400 ${isUpVoted ? 'text-cyan-400' : ''}`}/>
            </button>
            <span className='ml-1'>{getTotalVote(upVotesBy)}</span>
          </div>
          <div className='flex items-center'>
            <button type='button' className='cursor-pointer text-slate-400 hover:text-rose-400 transition-colors'>
              <FaThumbsDown />
            </button>
            <span className='ml-1'>{getTotalVote(downVotesBy)}</span>
          </div>
          <Link to={`/detail/${id}`} className='flex items-center text-slate-300 hover:text-white'>
            <FaRegCommentDots />
            <span className='ml-1'>{totalComments}</span>
          </Link>
        </div>

        <div className='ml-auto flex items-center gap-2'>
          {ownerAvatar ? (
            <img src={ownerAvatar} alt={owner || 'Owner avatar'} className='h-6 w-6 rounded-full object-cover' />
          ) : (
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/40 text-[10px]'>
              {(owner && owner[0]) || '?'}
            </div>
          )}
          <p className='text-xs text-slate-300'>
            Dibuat oleh <span className='font-medium text-white'>{owner}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ThreadItem;