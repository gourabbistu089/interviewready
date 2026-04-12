import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { API_URL } from "../constants";
// import { uploadEditorImage } from "../api/article.api";
import axios from "axios";

const ArticleEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  const handleImageUpload = async (blob, callback) => {
    try {
      const formData = new FormData();
      formData.append("image", blob);

    const res = await axios.put(`${API_URL}/articles/editor/image`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
      callback(res.data.url, "image");
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={value || ""}
      height="450px"
      initialEditType="wysiwyg"
      previewStyle="vertical"
      useCommandShortcut
      hooks={{
        addImageBlobHook: handleImageUpload,
      }}
      onChange={() => {
        const markdown =
          editorRef.current.getInstance().getMarkdown();
        onChange(markdown);
      }}
    />
  );
};

export default ArticleEditor;
