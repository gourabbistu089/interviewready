'use client';

import React, { useRef } from 'react';
import { Editor } from 'primereact/editor';
import axios from 'axios';
import { API_URL } from '@/constants';

// TODO: type PrimeReact Editor ref properly when types are available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EditorRef = any;

interface BlogEditorProps {
  formData: { content: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function BlogEditor({ formData, setFormData }: BlogEditorProps) {
  const editorRef = useRef<EditorRef>(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      if (!input.files?.[0]) return;
      const file = input.files[0];
      const fd = new FormData();
      fd.append('image', file);

      try {
        const res = await axios.put(`${API_URL}/blogs/editor/image`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const quill = editorRef.current?.getQuill?.();
        const range = quill?.getSelection?.();
        if (quill && range) {
          quill.insertEmbed(range.index, 'image', res.data.url);
        }
      } catch (err) {
        console.error('Image upload failed', err);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: imageHandler },
    },
  };

  return (
    <Editor
      ref={editorRef}
      value={formData.content}
      onTextChange={(e) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, content: e.htmlValue ?? '' }))
      }
      modules={modules}
      style={{ height: '450px' }}
    />
  );
}
