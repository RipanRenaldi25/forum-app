import { useState } from 'react';

function useInput() {
  const [inputField, setInputField] = useState('');
  const onInputChange = ({ target }) => {
    setInputField(target.value);
  };

  const onClear = () => {
    setInputField('');
  };

  return [inputField, onInputChange, onClear];
}

export default useInput;
