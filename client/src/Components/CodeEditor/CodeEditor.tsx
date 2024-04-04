import Editor from "@monaco-editor/react";
import FileTabs from "./FileTabs";

type OwnProps = {
    code: string;
    onChangeCode: (code?: string) => void;
    onFileSelected: (path: string) => void;
}

const CodeEditor: React.FC<OwnProps> = ({ code, onChangeCode, onFileSelected }) => {
  
  return (
    <div>
      <FileTabs onFileSelected={onFileSelected} />
      <Editor
        height="100vh"
        width="100%"
        language="javascript"
        onChange={onChangeCode}
        theme="vs-dark"
        value={code}
        options={{
          inlineSuggest: true,
          fontSize: "16px",
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { enabled: false }
        }}
      />
    </div>
  );
}
export default CodeEditor;