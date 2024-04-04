import { styled } from 'styled-components'
import Navigators from './Navigators'
import CodeEditor from '../../Components/CodeEditor'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import _debounce from "lodash.debounce";
import { DEFAULT_PROJECT_ID, updateFile } from '../../store/Actions/fileActions'

const obj = {
  "public": {
      "index.html": "",
      "index.js": ""
  },
  "src": {
      "app.jsx": "",
      "components": {
          "AppButton": {
              "AppButton.jsx": "",
              "index.jsx": ""
          }
      },
      "index.jsx": ""
  }
}

const Container = styled.div `
  width: 100vw;
  hight: 100vh;
  display: flex;
  border: 1px solid #ffffff;
`
const Navigator = styled.div `
  width: 20vw;
  overflow: scroll;
  border-right: 1px solid #ffffff;
`
const CodeArea = styled.div `
  width: 40vw;
  border-right: 1px solid #ffffff;
`

const PreviewArea = styled.div `
  width: 40vw;
`

export const DELAY_IN_REQUEST_MS = 3000
export const ENTENSION_TO_LANGUAGE = {
    jsx: 'javaScript',
    html: 'html',
    css: 'css',
    tsx:  'typeScript',
    scss: 'css',
    js: 'javaScript',
    ts: 'typeScript',
    json: 'json'
}

const LANGUAGES: any = {
  "js": "javascript",
  "html": "html",
  "json": "json",
  "jsx": "javascript",
}

function ReactEditor() {
  const { project } = useSelector((store: ReduxStore) => store.files)
  const [currentFile, setCurrentFile] = useState<string>('')
  const dispatch = useDispatch()

  const code = useMemo(() => {
    return project[`/${currentFile}`]
  }, [currentFile])

  const language = useMemo(() => {
    const pathSplit = currentFile.split("/")
    const [ _, ext ] = pathSplit[pathSplit.length - 1].split(".")
    return LANGUAGES[ext]
  }, [currentFile])
  
  const handleFileSelected = (path: string) => {
    setCurrentFile(path)
  }

  const updateFileInServer = async (incomingCode: string, currentFile: string) => {
    await dispatch<any>(updateFile(DEFAULT_PROJECT_ID, incomingCode, currentFile))
}

  const debouncedUpdateServer = useCallback(_debounce(updateFileInServer, DELAY_IN_REQUEST_MS), [])

  const handleCodeChanges = (inComingCode?: string) => {
    if (!inComingCode) return
   
    debouncedUpdateServer(inComingCode, currentFile)
  }
  
  return (
    <Container>
      <Navigator>
        <Navigators onFileSelected={handleFileSelected} />
      </Navigator>
      <CodeArea>
        <CodeEditor language={language} currentFile={currentFile} code={code} onChangeCode={handleCodeChanges} onFileSelected={handleFileSelected} />
      </CodeArea>
      <PreviewArea>
        <iframe width="100%" height="100%" style={{ background: 'white' }} src={`http://localhost:3000/v1/file/project/b9dd4ad5-5723-4bf0-bc42-944a5494348f/build`} ></iframe>
      </PreviewArea>
    </Container>
  )
}

export default ReactEditor
