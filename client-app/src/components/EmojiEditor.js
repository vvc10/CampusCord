import React, { useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiEditor = ({ onEmojiClick, closeEditor }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        console.log(editorRef.current); // Check if it's correctly assigned
    
        const handleClickOutside = (event) => {
            if (editorRef.current && !editorRef.current.contains(event.target)) {
                closeEditor();
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeEditor]);
    
    return (
        <div 
    ref={editorRef} 
    className='emojiscreenmd absolute bottom-[60px] left-[24vw]'
>
    <EmojiPicker onEmojiClick={onEmojiClick} />
</div>

    );
};

export default EmojiEditor;
