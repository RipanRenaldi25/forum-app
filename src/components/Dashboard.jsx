import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import Profile from './Profile';

function Dashboard() {
  const { profile, user } = useSelector((states) => states);
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <aside className='relative z-20 w-full shrink-0 border-b border-white/10 bg-[#101826]/80 px-4 py-4 backdrop-blur-xl lg:w-72 lg:rounded-3xl lg:border lg:py-8'>
      <div className='mb-4 flex items-center justify-between lg:mb-8 lg:block'>
        <div>
          <p className='text-[11px] font-semibold tracking-[0.22em] text-cyan-300 uppercase'>
            Forum
          </p>
          <h1 className='mt-1 text-xl font-bold text-white'>Diskusi</h1>
        </div>
        <button
          type='button'
          className='rounded-xl border border-white/15 px-3 py-2 text-sm text-slate-200 lg:hidden'
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </div>
      <div className={`${menuOpen ? 'block' : 'hidden'} lg:block`}>
        <div className='flex flex-col items-center'>
          <Profile
            image={profile && profile.user.avatar}
            name={profile && profile.user.name}
          />
          <Navigation />
        </div>
      </div>
    </aside>
  );
}

export default Dashboard;
