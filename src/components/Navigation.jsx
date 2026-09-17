import { FaPlus, FaRocketchat, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { unsetProfile } from '../state/userProfile/Action';
import { asyncUnsetAuthUser } from '../state/users/Action';

function Navigation() {
  const dispatch = useDispatch();
  const { user } = useSelector((states) => states);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    dispatch(unsetProfile());
  };

  const linkClass = ({ isActive }) =>
    `flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500/25 to-indigo-500/40 text-white shadow-[inset_0_0_0_1px_rgba(103,232,249,0.35)]'
        : 'text-slate-300 hover:bg-white/5'
    }`;

  return (
    <nav className='mt-8 w-full max-w-xs space-y-2'>
      <NavLink to='/' end className={linkClass}>
        <FaRocketchat className='text-lg text-cyan-200' />
        <span>Threads</span>
      </NavLink>
      <NavLink to='/leaderboard' className={linkClass}>
        <HiChartBar className='text-lg text-indigo-200' />
        <span>Leaderboard</span>
      </NavLink>
      {user ? (
        <>
          <NavLink to='/newthread' className={linkClass}>
            <FaPlus className='text-lg text-emerald-200' />
            <span>Buat Thread</span>
          </NavLink>
          <button
            type='button'
            onClick={onLogout}
            className='flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm text-slate-300 hover:bg-rose-500/15 hover:text-rose-200'
          >
            <FaSignOutAlt className='text-lg' />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <NavLink to='/login' className={linkClass}>
          <FaUser className='text-lg text-amber-200' />
          <span>Login</span>
        </NavLink>
      )}
    </nav>
  );
}

export default Navigation;
