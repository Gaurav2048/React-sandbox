import React, { useState } from "react";
import Typography from "../Typography";
import { BsFiletypeJsx } from "react-icons/bs";
import { AiFillHtml5 } from "react-icons/ai";
import { BsFiletypeCss } from "react-icons/bs";
import { BsFiletypeScss } from "react-icons/bs";
import { PiFileTsx } from "react-icons/pi";
import { FaJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { styled } from "styled-components";

type OwnProps = {
    name: string,
    path: string,
    onFileSelected: (path: string) => void,
}

const extenstionIconMapping: any = {
    jsx: () => <BsFiletypeJsx color="#6456fc" />,
    html: () => <AiFillHtml5 color="#fc5956" />,
    css: () => <BsFiletypeCss color="#fc5956" />,
    tsx:  () => <PiFileTsx color="#6456fc" />,
    scss: () => <BsFiletypeScss color="#fc5956" />,
    js: () => <FaJs color="#6456fc" />,
    ts: () => <SiTypescript color="#6456fc" />
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
    background: ${props => props.hover ? '#424242' : 'inherit'}
`

const File: React.FC<OwnProps> = ({ name, path, onFileSelected }) => {
    const extension = name.split(".")[1]
    const IconComponent = extenstionIconMapping[extension]
    const [hover, setHover] = useState(false)

    const openFileAction = () => {
        onFileSelected(path)
    }

    return <FileContainer onClick={openFileAction} hover={hover} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {IconComponent()}
        <Typography styles={fileCss}>{name}</Typography>
    </FileContainer>
}

export default File