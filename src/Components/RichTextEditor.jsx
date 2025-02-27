import React, { useState, useEffect, useRef } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    try {
      const storedData = localStorage.getItem('richTextData');
      return storedData
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(storedData)))
        : EditorState.createEmpty();
    } catch (error) {
      console.error('Error loading editor state:', error);
      return EditorState.createEmpty();
    }
  });

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      try {
        const rawData = convertToRaw(editorState.getCurrentContent());
        localStorage.setItem('richTextData', JSON.stringify(rawData));
      } catch (error) {
        console.error('Error saving editor state:', error);
      }
    }
  }, [editorState]);

  const handleEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <div className="w-full max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-lg p-4 bg-white relative">
        <h1 className="text-xl font-semibold mb-4 text-center">Rich Text Editor</h1>
        <div className="border border-gray-300 rounded-md">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'history'],
              inline: { options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'] },
              blockType: { inDropdown: true, options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'] },
              fontSize: { options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96] },
              list: { inDropdown: true, options: ['unordered', 'ordered', 'indent', 'outdent'] },
              textAlign: { inDropdown: true, options: ['left', 'center', 'right', 'justify'] }
            }}
          />
        </div>
      </div>

      {/* Custom Styles to Fix Dropdown Issue */}
      <style jsx>{`
        .wrapper-class {
          min-height: 350px;
          z-index: 50;
        }
        .rdw-dropdown-wrapper {
          z-index: 9999 !important;
          position: relative;
        }
        .rdw-editor-toolbar {
          z-index: 10000 !important;
          position: relative;
          background: white;
        }
        .rdw-dropdown-optionwrapper {
          z-index: 11000 !important;
          position: absolute !important;
          background: white;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
