'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants';

// TODO: type Toast UI Editor ref properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EditorRef = any;

interface ArticleEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function ArticleEditor({ value, onChange }: ArticleEditorProps) {
  const editorRef = useRef<EditorRef>(null);

  const handleImageUpload = async (blob: Blob, callback: (url: string, alt: string) => void) => {
    try {
      const fd = new FormData();
      fd.append('image', blob);
      const res = await axios.put(`${API_URL}/articles/editor/image`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      callback(res.data.url, 'image');
    } catch (err) {
      console.error('Image upload failed', err);
    }
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={value || ''}
      height="450px"
      initialEditType="wysiwyg"
      previewStyle="vertical"
      useCommandShortcut
      hooks={{ addImageBlobHook: handleImageUpload }}
      onChange={() => {
        const markdown = editorRef.current?.getInstance?.()?.getMarkdown?.() ?? '';
        onChange(markdown);
      }}
    />
  );
}
