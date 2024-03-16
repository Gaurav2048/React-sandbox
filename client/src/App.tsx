import { useEffect } from 'react'
import './App.css'
import CodeEditor from './Components/CodeEditor'
import { useDispatch, useSelector } from 'react-redux'
import { getProject } from './store/Actions/fileActions'

function App() {
  const dispatch = useDispatch<any>()
  const { project } = useSelector((store: ReduxStore) => store.files)
  console.log(project);

  const code = project[Object.keys(project)[0]]
  
  useEffect(() => {
   fetchProject()
  }, [])

  const fetchProject = async () => {
    await dispatch(getProject("b9dd4ad5-5723-4bf0-bc42-944a5494348f"))
  }

  return (
    <CodeEditor code={code} />
  )
}

export default App
