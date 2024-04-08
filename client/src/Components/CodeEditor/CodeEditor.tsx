import Editor from "@monaco-editor/react";
import FileTabs from "./FileTabs";
import { styled } from "styled-components";

type OwnProps = {
  code: string;
  onChangeCode: (code?: string) => void;
  onFileSelected: (path: string) => void;
  language: string;
  currentFile: string;
};

const Container = styled.div`
  height: 100%;
`;

const CodeEditor: React.FC<OwnProps> = ({
  code,
  currentFile,
  language,
  onChangeCode,
  onFileSelected,
}) => {
  return (
    <Container>
      <FileTabs currentFile={currentFile} onFileSelected={onFileSelected} />
      <Editor
        height="100%"
        width="100%"
        language={language}
        onChange={onChangeCode}
        theme="vs-dark"
        value={code}
        options={{
          inlineSuggest: true,
          fontSize: "16px",
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { enabled: false },
        }}
      />
    </Container>
  );
};
export default CodeEditor;
