import React, { useState } from "react";
import { FILE_INDICATOR } from "./Construct";
import File from "./File";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import Typography from "../Typography";
import { styled } from "styled-components";


type OwnProps = {
    name: string;
    construct: any;
    path: string;
    onFileSelected: (path: string) => void;
}

const FolderNameContainer = styled.div<any> `
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 0;
    padding: 0;
    cursor: pointer;
    background: ${props => props.hover ? '#424242' : 'inherit'}
`

const Folder: React.FC<OwnProps> = ({ name, construct, path, onFileSelected }) => {
    const [ open, setOpen ] = useState(false)
    const keys = Object.keys(construct)

    const toogleOpen = () => setOpen(!open)
    const [hover, setHover] = useState(false)

    return <div>
        <FolderNameContainer onClick={toogleOpen} hover={hover} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {!open ? <IoChevronForward /> : <IoChevronDown />}
            <Typography>{name}</Typography>
        </FolderNameContainer>
        {open ? <div style={{ paddingLeft: '10px' }}>
            {keys.map(key => {
                return construct[key] === FILE_INDICATOR ? <File name={key} path={`${path}/${key}`} onFileSelected={onFileSelected} /> : <Folder path={`${path}/${key}`} name={key} construct={construct[key]} onFileSelected={onFileSelected}  />
            })}
        </div> : null}
    </div>
}

export default Folder