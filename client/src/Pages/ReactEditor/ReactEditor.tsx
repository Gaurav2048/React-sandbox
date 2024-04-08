import { styled } from "styled-components";
import Navigators from "./Navigators";
import CodeEditor from "../../Components/CodeEditor";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import _debounce from "lodash.debounce";
import {
  DEFAULT_PROJECT_ID,
  updateFile,
} from "../../store/Actions/fileActions";
import Iframe from "../../Components/Iframe";
import * as prettier from "prettier";
import * as babel from "prettier/parser-babel";
import * as esTree from "prettier/plugins/estree";
import Layout from "../../Components/Layout";
import Draggable from "../../Draggable";
import { addCurrentFile } from "../../store/Actions/recentActions";

const Container = styled.div`
  width: 100vw;
  hight: 100vh;
  display: flex;
`;
const Navigator = styled.div`
  width: 20vw;
  overflow: scroll;
  border-right: 1px solid ${(props) => props.theme.colors.gray};
`;
const CodeArea = styled.div`
  width: 40vw;
  height: calc(100vh - 84px);
  border-right: 1px solid ${(props) => props.theme.colors.gray};
`;

const PreviewArea = styled.div`
  width: 40vw;
  height: calc(100vh - 84px);
`;

export const DELAY_IN_REQUEST_MS = 3000;
export const ENTENSION_TO_LANGUAGE = {
  jsx: "javaScript",
  html: "html",
  css: "css",
  tsx: "typeScript",
  scss: "css",
  js: "javaScript",
  ts: "typeScript",
  json: "json",
};

const LANGUAGES: any = {
  js: "javascript",
  html: "html",
  json: "json",
  jsx: "javascript",
};

function ReactEditor() {
  const { files } = useSelector((store: ReduxStore) => store);
  const currentFile = useSelector(
    (store: ReduxStore) => store.recent.currentFile
  );
  const dispatch = useDispatch();
  const { project } = files;
  const code = useMemo(() => {
    return project[`/${currentFile}`];
  }, [currentFile, files, project]);

  const language = useMemo(() => {
    const pathSplit = currentFile.split("/");
    const [_, ext] = pathSplit[pathSplit.length - 1].split(".");
    return LANGUAGES[ext];
  }, [currentFile]);

  const handleFileSelected = async (path: string) => {
    await dispatch(addCurrentFile(path));
  };

  const updateFileInServer = async (
    incomingCode: string,
    currentFile: string
  ) => {
    try {
      const formattedIncomingCode = await prettier.format(incomingCode, {
        semi: false,
        tabWidth: 2,
        parser: "babel",
        plugins: [babel, esTree],
      });
      await dispatch<any>(
        updateFile(DEFAULT_PROJECT_ID, formattedIncomingCode, currentFile)
      );
    } catch (e: any) {
      alert(e.message);
    }
  };

  const debouncedUpdateServer = useCallback(
    _debounce(updateFileInServer, DELAY_IN_REQUEST_MS),
    []
  );

  const handleCodeChanges = (inComingCode?: string) => {
    if (!inComingCode) return;

    debouncedUpdateServer(inComingCode, currentFile);
  };

  return (
    <Layout>
      <Container>
        <Navigator>
          <Navigators onFileSelected={handleFileSelected} />
        </Navigator>
        <Draggable>
          <CodeArea>
            <CodeEditor
              language={language}
              currentFile={currentFile}
              code={code}
              onChangeCode={handleCodeChanges}
              onFileSelected={handleFileSelected}
            />
          </CodeArea>
        </Draggable>
        <Draggable>
          <PreviewArea>
            <Iframe />
          </PreviewArea>
        </Draggable>
      </Container>
    </Layout>
  );
}

export default ReactEditor;
