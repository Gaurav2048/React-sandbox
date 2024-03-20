import { styled } from 'styled-components'
import Navigators from './Navigators'
import CodeEditor from '../../Components/CodeEditor'
import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'

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

function ReactEditor() {
  const { project } = useSelector((store: ReduxStore) => store.files)
  const [currentFile, setCurrentFile] = useState<string>('')
  console.log(project);

  const code = useMemo(() => {
    return project[`/${currentFile}`]
  }, [currentFile])
  
  const handleFileSelected = (path: string) => {
    setCurrentFile(path)
  }
  
  return (
    <Container>
      <Navigator>
        <Navigators onFileSelected={handleFileSelected} />
      </Navigator>
      <CodeArea>
        <CodeEditor code={code} />
      </CodeArea>
      <PreviewArea>
        
      </PreviewArea>
    </Container>
  )
}

export default ReactEditor
