import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Detail from '../components/Detail';
import { asyncFetchDetailUserThread } from '../state';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    users: { userDetail },
  } = useSelector((states) => states);
  useEffect(() => {
    dispatch(asyncFetchDetailUserThread(id));
  }, [id, dispatch]);
  return (
    <div className='w-full px-5 py-8 md:px-8'>
      <Link to='/' className='mb-6 inline-block text-sm text-cyan-300 hover:underline'>
        ← Kembali ke threads
      </Link>
      <Detail detail={userDetail} />
    </div>
  );
}

export default DetailPage;
