'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants';
import toast from 'react-hot-toast';
import { PlayCircle, X, Plus } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EditorRef = any;

interface ArticleEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const YOUTUBE_REGEX =
  /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/shorts\/))([^&\n?#]+)/;

function extractYouTubeId(url: string): string | null {
  return url.match(YOUTUBE_REGEX)?.[1] ?? null;
}

export default function ArticleEditor({ value, onChange }: ArticleEditorProps) {
  const editorRef = useRef<EditorRef>(null);
  const [ytUrl, setYtUrl]           = useState('');
  const [showYtPanel, setShowYtPanel] = useState(false);

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
    } catch {
      toast.error('Image upload failed');
    }
  };

  const insertYouTube = () => {
    const id = extractYouTubeId(ytUrl.trim());
    if (!id) {
      toast.error('Invalid YouTube URL');
      return;
    }
    const embedHtml = `\n\n<iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" width="100%" height="400" frameborder="0" allowfullscreen></iframe>\n\n`;
    const current = editorRef.current?.getInstance?.()?.getMarkdown?.() ?? '';
    const updated = current + embedHtml;
    editorRef.current?.getInstance?.()?.setMarkdown(updated);
    onChange(updated);
    setYtUrl('');
    setShowYtPanel(false);
    toast.success('YouTube video inserted');
  };

  return (
    <div>
      {/* YouTube embed toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          background: 'var(--bg-elevated)',
          borderBottom: '0.5px solid var(--border)',
        }}
      >
        {!showYtPanel ? (
          <button
            type="button"
            onClick={() => setShowYtPanel(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              border: '0.5px solid var(--accent-border)',
              cursor: 'pointer',
            }}
          >
            <PlayCircle size={13} />
            Embed YouTube
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <PlayCircle size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <input
              autoFocus
              type="text"
              value={ytUrl}
              onChange={(e) => setYtUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && insertYouTube()}
              placeholder="Paste YouTube URL (e.g. https://youtu.be/abc123)"
              style={{
                flex: 1,
                fontSize: '0.8rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                background: 'var(--bg-base)',
                color: 'var(--text-primary)',
                border: '0.5px solid var(--border)',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={insertYouTube}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                background: 'var(--accent)',
                color: '#080808',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Plus size={12} />
              Insert
            </button>
            <button
              type="button"
              onClick={() => { setShowYtPanel(false); setYtUrl(''); }}
              style={{
                display: 'inline-flex',
                padding: '0.3rem',
                borderRadius: '6px',
                background: 'transparent',
                color: 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

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
    </div>
  );
}
