import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchAllLeaderBoard } from '../state';

function LeaderBoardPage() {
  const dispatch = useDispatch();
  const { leaderBoard } = useSelector((states) => states);
  useEffect(() => {
    dispatch(asyncFetchAllLeaderBoard());
  }, [dispatch]);

  if (!leaderBoard) {
    return null;
  }

  return (
    <div className='w-full px-5 py-8 md:px-8'>
      <p className='text-xs font-semibold tracking-[0.18em] text-indigo-300 uppercase'>Ranking</p>
      <h1 className='mt-1 text-2xl font-bold text-white'>Leaderboard</h1>
      <div className='mt-6 overflow-hidden rounded-3xl border border-white/10'>
        <table className='w-full table-auto text-left'>
          <thead className='bg-white/5 text-xs tracking-wide text-slate-400 uppercase'>
            <tr>
              <th className='px-4 py-3'>Name</th>
              <th className='px-4 py-3 text-right'>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map(({ user, score }, index) => (
              <tr key={user.id} className='border-t border-white/10'>
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-3'>
                    <span className='w-6 text-xs text-slate-500'>{index + 1}</span>
                    <img src={user.avatar} alt={user.name} className='h-8 w-8 rounded-full' />
                    <span className='font-medium text-white'>{user.name}</span>
                  </div>
                </td>
                <td className='px-4 py-3 text-right font-semibold text-cyan-300'>{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoardPage;
