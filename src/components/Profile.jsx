function Avatar({ image, name, addedStyle }) {
  return (
    <div className='flex flex-col items-center text-center'>
      <div
        className={`avatar h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 p-0.5 ${addedStyle || ''}`}
      >
        {image ? (
          <img src={image} alt='avatar' className='h-full w-full rounded-full object-cover' />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-full bg-[#101826] text-lg font-semibold text-cyan-200'>
            {(name && name[0]) || 'G'}
          </div>
        )}
      </div>
      <h2 className='mt-3 text-sm font-semibold text-white'>{name || 'Tamu'}</h2>
      <p className='mt-1 text-xs text-slate-400'>{name ? 'Anggota forum' : 'Silakan login'}</p>
    </div>
  );
}

export default Avatar;
