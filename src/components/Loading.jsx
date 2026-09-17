import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Loading() {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [visible, setVisible] = useState(false);

  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setVisible(true);
  }

  useEffect(() => {
    if (!visible) return;

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [visible]);

  if (!visible) {
    return <div className='sticky top-0 z-50 h-0' />;
  }

  return (
    <div className='sticky top-0 z-50 h-1 w-full overflow-hidden bg-white/10'>
      <div className='loading-bar-fill h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400' />
    </div>
  );
}

export default Loading;