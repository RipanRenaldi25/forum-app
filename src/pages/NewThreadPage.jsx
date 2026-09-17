import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputGroup from '../components/InputGroup';
import useInput from '../hooks/useInput';
import { asyncCreateThread } from '../state';

function NewThreadPage() {
  const [title, onTitleChange] = useInput();
  const [category, onCategoryChange] = useInput();
  const [body, onBodyChange] = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(asyncCreateThread({ title, body, category }));
    navigate('/');
  };
  return (
    <div className='w-full px-5 py-8 md:px-10'>
      <p className='text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase'>Compose</p>
      <h1 className='mt-1 mb-6 text-2xl font-bold text-white'>Create a Discussion</h1>
      <form
        onSubmit={onSubmitHandler}
        className='max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6'
      >
        <InputGroup
          placeHolder='Title'
          name='title'
          label='Judul'
          onInputChange={onTitleChange}
          value={title}
        />
        <InputGroup
          placeHolder='Category'
          name='category'
          label='Kategori (opsional)'
          onInputChange={onCategoryChange}
          value={category}
        />
        <label htmlFor='body' className='mb-2 block text-sm font-medium text-slate-300'>
          Isi thread
        </label>
        <textarea
          id='body'
          type='text'
          className='h-36 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20'
          name='body'
          onChange={onBodyChange}
          value={body}
          placeholder='Tulis isi diskusi...'
        />
        <button
          type='submit'
          className='mt-4 block w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 font-semibold text-slate-950'
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default NewThreadPage;
