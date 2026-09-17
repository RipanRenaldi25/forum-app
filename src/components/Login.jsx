import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncLoginUser } from '../state';
import InputGroup from './InputGroup';

function Login() {
  const [inputValue, setInputValue] = useState({});
  const dispatch = useDispatch();
  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(asyncLoginUser(inputValue));
  }
  const onChangeInputHandler = ({ target }) => {
    const { name, value } = target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <form
      className='relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] px-8 py-10 shadow-2xl shadow-black/30'
      onSubmit={onSubmitHandler}
    >
      <p className='mb-2 text-center text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase'>
        Welcome back
      </p>
      <h1 className='mb-6 text-center text-2xl font-bold text-white'>Login</h1>
      <InputGroup
        label='Email'
        placeHolder='Email'
        type='text'
        name='email'
        onInputChange={onChangeInputHandler}
      />
      <InputGroup
        label='Password'
        type='password'
        placeHolder='******'
        name='password'
        onInputChange={onChangeInputHandler}
      />
      <div className='mt-6'>
        <button
          type='submit'
          className='h-11 w-full cursor-pointer rounded-xl bg-white font-bold text-slate-950 transition hover:bg-cyan-100'
        >
          Log In
        </button>
      </div>
      <div className='mt-4'>
        <p className='text-sm text-slate-300'>
          Belum punya akun?{' '}
          <Link to='/signup'>
            <span className='font-semibold text-cyan-300'>Daftar sekarang</span>
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
