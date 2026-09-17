import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncRegistUser } from '../state';
import InputGroup from './InputGroup';

function Register() {
  const [inputValue, setInputValue] = useState({});
  const dispatch = useDispatch();

  const onChangeInputHandler = ({ target }) => {
    const { value, name } = target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(asyncRegistUser(inputValue));
    setInputValue({});
  }
  return (
    <form
      className='mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] px-8 py-10 shadow-2xl shadow-black/30'
      onSubmit={onSubmitHandler}
    >
      <p className='mb-2 text-center text-xs font-semibold tracking-[0.2em] text-indigo-300 uppercase'>
        Join the forum
      </p>
      <h1 className='mb-6 text-center text-2xl font-bold text-white'>Register</h1>
      <InputGroup
        name='name'
        label='Name'
        placeHolder='John Doe'
        type='text'
        onInputChange={onChangeInputHandler}
        value={inputValue.name || ''}
      />
      <InputGroup
        name='email'
        label='Email'
        placeHolder='Email'
        type='text'
        onInputChange={onChangeInputHandler}
        value={inputValue.email || ''}
      />
      <InputGroup
        name='password'
        label='Password'
        type='password'
        placeHolder='******'
        onInputChange={onChangeInputHandler}
        value={inputValue.password || ''}
      />
      <div className='mt-2'>
        <button
          type='submit'
          className='h-11 w-full cursor-pointer rounded-xl bg-white font-bold text-slate-950 transition hover:bg-indigo-100'
        >
          Register
        </button>
      </div>
      <div className='mt-4'>
        <p className='text-sm text-slate-300'>
          Sudah punya akun?{' '}
          <Link to='/login'>
            <span className='font-semibold text-cyan-300'>Login</span>
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
