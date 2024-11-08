import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface MyEditorProps {
  value: string;
  onChange: (content: string) => void;
  reset?: boolean; // Thiết lập reset là tùy chọn
}

const MyEditor: React.FC<MyEditorProps> = ({
  value,
  onChange,
  reset = false,
}) => {
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
      ],
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

  // Reset nội dung khi `reset` được bật
  useEffect(() => {
    if (reset) {
      onChange("");
    }
  }, [reset, onChange]);

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
