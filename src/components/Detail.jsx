import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddCommentToThread } from '../state/usersThread/Action';
import { getTotalVote, parseDate, removeTags } from '../utils/utils';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

function Detail({ detail }) {
  const [commentValue, onChangeCommentValue, onClear] = useInput();
  const dispatch = useDispatch();
  const { user } = useSelector((states) => states);

  if (detail.id === undefined) {
    return (
      <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-slate-400'>
        Memuat detail thread...
      </div>
    );
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      asyncAddCommentToThread({ threadId: detail.id, content: commentValue }),
    );
    onClear();
  };

  return (
    <div>
      <div className='inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200'>
        #{detail.category}
      </div>
      <h1 className='mt-5 mb-4 text-3xl font-bold tracking-tight text-white'>{detail.title}</h1>
      <p className='thread-body mb-5 w-full max-w-3xl leading-7 text-slate-300'>
        {removeTags(detail.body)}
      </p>
      <div className='flex flex-wrap items-center gap-4 text-sm text-slate-300'>
        <div className='flex items-center'>
          <button type='button'>
            <FaThumbsUp />
          </button>
          <span className='ml-1'>{getTotalVote(detail.upVotesBy)}</span>
        </div>
        <div className='flex items-center'>
          <button type='button'>
            <FaThumbsDown />
          </button>
          <span className='ml-1'>{getTotalVote(detail.downVotesBy)}</span>
        </div>
        <div>{parseDate(detail.createdAt)}</div>
        <div className='flex items-center'>
          <img
            src={detail.owner.avatar}
            alt='avatar'
            className='mr-2 h-7 w-7 rounded-full object-cover'
          />
          <p>
            Dibuat oleh <span className='font-medium text-white'>{detail.owner.name}</span>
          </p>
        </div>
      </div>
      {user ? (
        <CommentInput
          commentValue={commentValue}
          onChangeCommentValue={onChangeCommentValue}
          onSubmitHandler={onSubmitHandler}
        />
      ) : (
        <div className='mt-6 rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100'>
          <Link to='/login' className='font-semibold underline'>
            Login
          </Link>{' '}
          untuk mengirim komentar.
        </div>
      )}
      <div className='total-comment mt-8'>
        <h1 className='mb-3 text-lg font-semibold'>Komentar ({getTotalVote(detail.comments)})</h1>
        <CommentList comments={detail.comments} />
      </div>
    </div>
  );
}

export default Detail;
