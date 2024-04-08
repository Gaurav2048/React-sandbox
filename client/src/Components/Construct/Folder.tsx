import React, { useState } from "react";
import { FILE_INDICATOR } from "./Construct";
import File from "./File";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import Typography from "../Typography";
import { styled, useTheme } from "styled-components";


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
    background: ${props => props.$hover ? '#424242' : 'inherit'}
`

export const reArrangeStructure = (construct: any) => {
    const keys = Object.keys(construct)
    const folders: any = {}
    const files:any = {}
    keys.map((key: string) => {
        if (construct[key] === FILE_INDICATOR) {
            files[key] = ""
        } else {
            folders[key] = construct[key]
        }
    })
    return {
        ...folders, ...files
    }
}

const Collapse = styled.div `
    padding-left: 10px;
    border-left: 1px dotted ${props => props.theme.colors.gray}
`

const Folder: React.FC<OwnProps> = ({ name, construct, path, onFileSelected }) => {
    const [ open, setOpen ] = useState(false)
    const transformedConstruct = reArrangeStructure(construct)
    const keys = Object.keys(transformedConstruct)

    const toogleOpen = () => setOpen(!open)
    const [hover, setHover] = useState(false)
    const theme = useTheme()

    return <div>
        <FolderNameContainer onClick={toogleOpen} $hover={hover} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {!open ? <IoChevronForward /> : <IoChevronDown />}
            <Typography color={theme.colors.text.gray}>{name}</Typography>
        </FolderNameContainer>
        {open ? <Collapse>
            {keys.map(key => {
                return construct[key] === FILE_INDICATOR ? <File name={key} path={`${path}/${key}`} key={`${path}/${key}`} onFileSelected={onFileSelected} /> : <Folder path={`${path}/${key}`} key={`${path}/${key}`} name={key} construct={construct[key]} onFileSelected={onFileSelected}  />
            })}
        </Collapse> : null}
    </div>
}

export default Folder