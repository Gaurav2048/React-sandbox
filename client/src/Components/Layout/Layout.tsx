import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "styled-components";
import Select from "react-select";
import useKeyboardShortcut from 'use-keyboard-shortcut'
import { addCurrentFile } from "../../store/Actions/recentActions";
import { FaGithub } from "react-icons/fa";
import Typography from "../Typography";

const COMMAND_KEY = 'Meta';
const KEY_F = 'f'
const KEY_p = 'P'
const KEY_ESCAPE = "Escape"
const GITHUB_LINK = "https://github.com/Gaurav2048"

const RECENT_FILES_COMMAND = [ COMMAND_KEY, KEY_p ]
const RECENT_ESCAPE_COMMAND = [ KEY_ESCAPE ]

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    .header {
        border-bottom: 1px solid ${props => props.theme.colors.gray};
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

type LayoutProps = {
    children: any
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <Container>
        <div className="header">
            <HeaderComponent />
        </div>
        {children}
    </Container>
}

export default Layout;

const TitleSection = styled.div `
    margin-left: 12px;
`

const ContributionSection = styled.div `
    margin-right: 12px;
`

const FileSection = styled.div `
    width: 40%;
`

const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch()
    const { files } = useSelector((store: ReduxStore) => store.recent)
    const [ showSelect, setShowSelect ] = useState(false)
    const { flushHeldKeys } = useKeyboardShortcut(
        RECENT_FILES_COMMAND,
        shortcutKeys => setShowSelect(true),
        { 
          overrideSystem: true,
          ignoreInputFields: false, 
          repeatOnHold: false 
        }
      );
    

    useKeyboardShortcut(
        RECENT_ESCAPE_COMMAND,
        shortcutKeys => setShowSelect(false),
        { 
          overrideSystem: true,
          ignoreInputFields: false, 
          repeatOnHold: false,
        }
      );
    
    
    const onSelect = async (item: any) => {
        await dispatch(addCurrentFile(
            item.value
        ))
        setShowSelect(false)
        flushHeldKeys()
    }

    return <>
        <TitleSection>Title</TitleSection>
        <FileSection>
            {showSelect ? <HeaderSelect items={files} onSelect={onSelect} /> : <Typography>{"project.name"}</Typography>}
        </FileSection>
        <ContributionSection>
            <FaGithub />
        </ContributionSection>
    </>
}

type SelectProps = {
    items: any[];
    onSelect: (item: any) => void
}

const HeaderSelect: React.FC<SelectProps> = ({ items, onSelect }) => {
    const theme = useTheme()
    return <Select 
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: theme.colors.gray,
                background: theme.colors.background,
            }),
            input: (baseStyles, state) => ({
                ...baseStyles,
                color: 'white !important'
            }),
            menu: (base, state) => ({
                ...base,
                borderColor: theme.colors.gray,
                background: theme.colors.background,
            }),
            option: (base, state) => ({
                ...base,
                background: state.isFocused ? theme.colors.darkGray : theme.colors.gray,
                borderColor: theme.colors.background,
                
            }),
        }}
        options={items.map((item: any ) => ({ label: `${item?.name} [${item?.path}]`, value: item?.path }))}
        menuIsOpen
        onChange={onSelect}
    />
}