import Editor from "@monaco-editor/react";

type OwnProps = {
    code: string
}

const CodeEditor: React.FC<OwnProps> = ({ code }) => {
  
  return (
    <Editor
      height="100vh"
      width="100%"
      language="javascript"
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
  );
}
export default CodeEditor;