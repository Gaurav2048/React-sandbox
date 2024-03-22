import { styled } from 'styled-components'
import Navigators from './Navigators'
import CodeEditor from '../../Components/CodeEditor'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo, useState } from 'react'
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

function ReactEditor() {
  const { project } = useSelector((store: ReduxStore) => store.files)
  const [currentFile, setCurrentFile] = useState<string>('')
  const dispatch = useDispatch()

  const code = useMemo(() => {
    return project[`/${currentFile}`]
  }, [currentFile])
  
  const handleFileSelected = (path: string) => {
    setCurrentFile(path)
  }

  const updateFileInServer = async (incomingCode: string) => {
    await dispatch<any>(updateFile(DEFAULT_PROJECT_ID, incomingCode, currentFile))
}

  const debouncedUpdateServer = useCallback(_debounce(updateFileInServer, DELAY_IN_REQUEST_MS), [])

  const handleCodeChanges = (inComingCode?: string) => {
    if (!inComingCode) return
   
    debouncedUpdateServer(inComingCode)
  }
  
  return (
    <Container>
      <Navigator>
        <Navigators onFileSelected={handleFileSelected} />
      </Navigator>
      <CodeArea>
        <CodeEditor code={code} onChangeCode={handleCodeChanges} />
      </CodeArea>
      <PreviewArea>
        
      </PreviewArea>
    </Container>
  )
}

export default ReactEditor
