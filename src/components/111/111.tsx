import { useEffect, useState } from 'react';
import './111.scss';

export const Aaa: React.FC = () => {
  const [text, setText] = useState('');
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const repl = text.replaceAll(`"`, `'`);

    const spl = repl.slice(0, 8) + `width='100%' height='100%'` + repl.slice(32)

    setNewText(spl);

    if (text === '') {
      setNewText('');
    }
  }, [text]);

  const copyIt = () => {
    navigator.clipboard.writeText(newText);
    setText('');
    setNewText('');
  };

  return (
    <div className="pureComponent">
     
     <textarea
      name="text"
      id=""
      className="pureComponent__text"
      value={text}
      onChange={(e) => setText(e.target.value)}
     ></textarea>

     <textarea
      name="text"
      id=""
      className="pureComponent__text"
      value={newText}
      onClick={copyIt}
     ></textarea>
    </div>
  );
}
