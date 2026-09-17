function CommentInput({ commentValue, onChangeCommentValue, onSubmitHandler }) {
  return (
    <form className='comment mt-6' onSubmit={onSubmitHandler}>
      <h2 className='mb-2 text-sm font-medium text-slate-200'>Berikan komentar</h2>
      <textarea
        type='text'
        className='h-24 w-full rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20'
        value={commentValue}
        onChange={onChangeCommentValue}
        placeholder='Tulis komentar kamu...'
      />
      <button
        type='submit'
        className='mt-3 block w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 py-2.5 font-semibold text-slate-950 transition hover:opacity-90'
      >
        Kirim
      </button>
    </form>
  );
}

export default CommentInput;
