import React, { useState } from "react";
import Typography from "../Typography";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { addToTabs } from "../../store/Actions/recentActions";
import useExtension from "../../hooks/useExtension";

type OwnProps = {
    name: string,
    path: string,
    onFileSelected: (path: string) => void,
}


const fileCss = {
    color: '#f00 !important',
    textAlign: 'start',
    marginLeft: '8px',
} 

const FileContainer = styled.div<any> `
    display: flex; 
    align-items: center;
    gap: 4px;
    padding: 3px 0;
    background: ${props => props.$hover ? '#424242' : 'inherit'}
`

const File: React.FC<OwnProps> = ({ name, path, onFileSelected }) => {
    
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    const IconComponent = useExtension(name)

    const openFileAction = async () => {
        await dispatch(addToTabs(name, path))
        onFileSelected(path)
    }

    return <FileContainer onClick={openFileAction} $hover={hover} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {IconComponent()}
        <Typography styles={fileCss}>{name}</Typography>
    </FileContainer>
}

export default File