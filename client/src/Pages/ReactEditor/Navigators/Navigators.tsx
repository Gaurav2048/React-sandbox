import React, { useEffect, useMemo, useState } from "react";
import Construct from "../../../Components/Construct";
import { useDispatch, useSelector } from "react-redux";
import { getConstruct, getProject } from "../../../store/Actions/fileActions";
import Dependencies from "./Dependencies";
import AppCollapse from "../../../Components/AppCollapse";

type OwnProps = {
    onFileSelected: (path: string) => void;
}

const Navigators: React.FC<OwnProps> = ({ onFileSelected }) => {
  const dispatch = useDispatch<any>()
  const { project, construct } = useSelector((store: ReduxStore) => store.files)
  console.log(project);
  
  
  useEffect(() => {
   fetchProject()
  }, [])

  const fetchProject = async () => {
    await dispatch(getProject("b9dd4ad5-5723-4bf0-bc42-944a5494348f"))
    await dispatch(getConstruct())
  }

    return <div>
        <AppCollapse title="SANDBOX" defaultOpen>
            <Construct construct={construct} onFileSelected={onFileSelected} />
        </AppCollapse>
        <AppCollapse title="DEPENDENCIES">
            <Dependencies />
        </AppCollapse>
    </div>
}

export default Navigators;
