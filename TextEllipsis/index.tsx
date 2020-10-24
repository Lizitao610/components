import React, { useRef, useState, useEffect, HTMLProps } from 'react';

interface IProp extends HTMLProps<HTMLDivElement>{
  value: string;
}
/**
 * 多行文本溢出显示省略号组件
 */
const TextEllipsis = ({ value, style:customStyle }: IProp) => {
  const parentEle = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(value);
  const [visible, setVisible] = useState(false);

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 0)
    })
  }

  const getHeightInfo = () => {
    const { clientHeight, scrollHeight } = (parentEle.current || {}) as HTMLDivElement;
    return { clientHeight, scrollHeight }
  }

  useEffect(() => {
    const adjustValue = async () => {
      if (text.length === 0) return
      const { clientHeight, scrollHeight } = getHeightInfo()
      if (clientHeight >= scrollHeight) {
        setVisible(true)
        return
      }
      let start = 0
      let end = text.length - 1
      while (start <= end) {
        const mid = Math.floor((start + end) / 2)
        const textSlice = text.slice(0, mid);
        setText(textSlice);
        await delay()  // 等待渲染完成再判断
        const { clientHeight, scrollHeight } = getHeightInfo()
        if (clientHeight < scrollHeight) {
          end = mid - 1
        } else {
          start = mid + 1
        }
      }
      setVisible(true)
    };

    adjustValue();
  }, [value]);

  const Style: any = {
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    ...customStyle,
    visibility: visible ? '' : 'hidden',
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