import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TOOLS, toolbarOptions } from "./tool";

export default function RichTextEditor({ data, setData }) {
   return (
      <ReactQuill
         theme='snow'
         value={data}
         onChange={setData}
         modules={{
            toolbar: toolbarOptions,
         }}
         style={{ height: "300px" }}
      />
   );
}
