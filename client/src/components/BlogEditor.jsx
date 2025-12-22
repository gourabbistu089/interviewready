import { Editor } from "primereact/editor";
import axios from "axios";
import { useRef } from "react";
import { API_URL } from "../constants";

const BlogEditor = ({ formData, setFormData }) => {
  const editorRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

       const res = await axios.put(`${API_URL}/blogs/editor/image`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });

      const quill = editorRef.current.getQuill();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", res.data.url);
    };
  };

 const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
    //   [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
    ],
    handlers: {
      image: imageHandler
    }
  }
};


  return (
    <Editor
      ref={editorRef}
      value={formData.content}
      onTextChange={(e) =>
        setFormData({ ...formData, content: e.htmlValue })
      }
      modules={modules}
          showHeader={false}   // ✅ FIX the uppper header
      style={{ height: "450px" }}
    />
  );
};

export default BlogEditor;
