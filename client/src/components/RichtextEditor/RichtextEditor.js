import React, { useRef, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const RichtextEditor = (props) => {
  const editorRef = useRef();
  useEffect(() => {
    // Get underlining core object here
    // Notice that useEffect is been used because you have to make sure the editor is rendered.
  }, []);
  return (
    <div>
      <SunEditor
        ref={editorRef}
        setOptions={{
          height: props.height || 200,
          // buttonList: buttonList.complex,
        }}
        setContents={props.defaultContents}
        placeholder="Type the body here..."
        onChange={props.onChangeRichtext}
      />
    </div>
  );
};
export default RichtextEditor;
