import Header from "@editorjs/header";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import CheckList from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";

export const TOOLS = {
   embed: Embed,
   table: Table,
   marker: Marker,
   list: List,
   warning: Warning,
   code: Code,
   linkTool: Link,
   image: Image,
   raw: Raw,
   header: Header,
   quote: Quote,
   checklist: CheckList,
   delimiter: Delimiter,
   inlineCode: InlineCode,
   simpleImage: SimpleImage,
};

export  const toolbarOptions = [
   ["bold", "italic", "underline", "strike"], // toggled buttons
   ["blockquote", "code-block"],
   ["link", "image", "video", "formula"],

   [{ header: 1 }, { header: 2 }], // custom button values
   [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
   [{ script: "sub" }, { script: "super" }], // superscript/subscript
   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
   [{ direction: "rtl" }], // text direction

   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
   [{ header: [1, 2, 3, 4, 5, 6, false] }],

   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
   [{ font: [] }],
   [{ align: [] }],

   ["clean"],
];
