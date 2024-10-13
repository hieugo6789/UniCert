import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface MyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ], // Danh sách và thụt lề
      [{ align: [] }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
  ];

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Enter description"
      />
    </div>
  );
};

export default MyEditor;
