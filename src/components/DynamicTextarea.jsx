import React, { useRef, useEffect } from 'react';

const DynamicTextarea = ({ question: value, setQuestion: setValue, ...props }) => {
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset height to auto to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
  };

  const handleBlur = () => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset to initial height
      setValue(value.trim())
  };

  useEffect(() => {
    adjustHeight(); // Adjust height on initial render
  }, []);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{
        height: 'auto',
        maxHeight: '220px',
        scrollbarWidth: 'thin',
        overflow: 'hidden', // Ensure no scrollbar appears
        resize: 'none' // Prevent manual resizing
      }}
      required
      autoComplete='true'
    />
  );
};

export default DynamicTextarea;
