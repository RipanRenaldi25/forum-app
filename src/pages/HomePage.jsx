import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { asyncFetchAllUsers, asyncGetThread } from '../state';

function HomePage() {
  const dispatch = useDispatch();
  const {
    threads: { threads },
    users: { users },
    user,
  } = useSelector((states) => states);
  useEffect(() => {
    dispatch(asyncGetThread());
    dispatch(asyncFetchAllUsers());
  }, [dispatch]);
  return (
    <div className='relative w-full px-5 py-8 md:px-8'>
      <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase'>Feed</p>
          <h1 className='mt-1 text-2xl font-bold text-white'>Active Threads</h1>
        </div>
        {user ? (
          <Link
            to='/newthread'
            className='rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90'
          >
            Add Discussion
          </Link>
        ) : (
          <Link
            to='/login'
            className='rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10'
          >
            Login untuk menulis
          </Link>
        )}
      </div>
      <ThreadList threads={threads} users={users} />
    </div>
  );
}

export default HomePage;
