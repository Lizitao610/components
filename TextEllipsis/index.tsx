import React, { useRef, useState, useEffect } from 'react';

interface IProp {
  value: string;
}

const TextEllipsis = ({ value }: IProp) => {
  const parentEle = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const adjustValue = (text: string) => {
      const { clientHeight, scrollHeight } = (parentEle.current || {}) as HTMLDivElement;

      if (clientHeight < scrollHeight) {
        const textSlice = text.slice(0, text.length - 1);
        setText(textSlice);
        setTimeout(() => {
          adjustValue(textSlice);
        }, 0);
      }
    };

    adjustValue(text);
  }, [value]);

  const Style: any = {
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
  };

  const isExceed = value.length > text.length;

  return (
    <div ref={parentEle} style={Style}>
      {text}
      {isExceed && '...'}
    </div>
  );
};

export default TextEllipsis;