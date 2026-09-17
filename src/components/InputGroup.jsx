function InputGroup({
  label,
  type,
  placeHolder,
  onInputChange,
  name,
  value,
  addedStyle,
}) {
  return (
    <div className='input-group mb-4 lg:mb-5'>
      <label htmlFor={name || label} className='block'>
        {label ? (
          <span className='mb-2 block text-sm font-medium text-slate-300'>{label}</span>
        ) : null}
        <input
          id={name || label}
          type={type}
          className={`block h-11 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 ${addedStyle || ''}`}
          placeholder={placeHolder}
          onChange={onInputChange}
          name={name}
          value={value}
        />
      </label>
    </div>
  );
}

export default InputGroup;
