import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Ball from './components/Ball';
import Dashboard from './components/Dashboard';
import Loading from './components/Loading';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import LoginPage from './pages/LoginPage';
import NewThreadPage from './pages/NewThreadPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import { asyncPreloadProcess } from './state/userProfile/Action';

function App() {
  const { user } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <>
      <Loading />
      <div className='relative min-h-screen overflow-hidden bg-[#070b14] text-slate-100'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_28%)]' />
        <Ball addedStyle='w-24 h-24 bg-cyan-400/30 blur-2xl right-[18%] top-16' />
        <Ball addedStyle='w-36 h-36 bg-indigo-500/25 blur-3xl left-[-2%] bottom-10' />
        <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row lg:gap-6 lg:px-6 lg:py-6'>
          <Dashboard />
          <main className='min-h-[70vh] flex-1 overflow-hidden border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:rounded-3xl'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/detail/:id' element={<DetailPage />} />
              <Route
                path='/newthread'
                element={user ? <NewThreadPage /> : <Navigate to='/login' replace />}
              />
              <Route path='/leaderboard' element={<LeaderBoardPage />} />
              <Route
                path='/login'
                element={user ? <Navigate to='/' replace /> : <LoginPage />}
              />
              <Route
                path='/signup'
                element={user ? <Navigate to='/' replace /> : <RegisterPage />}
              />
              <Route path='/*' element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
