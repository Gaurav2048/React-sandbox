import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { MdVerticalSplit } from "react-icons/md";
import { BsLayoutSplit } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import Typography from '../Typography';
import useExtension from '../../hooks/useExtension';
import { removeTab } from '../../store/Actions/recentActions';

const Tab = styled.div<any> `
    display: flex;
    align-items: center;
    gap: 24px;
    height: '36px';
    padding: 0 8px;
    background: ${props => props.hover || props.isCurrent ? props.theme.colors.gray : 'inherit'};
    border-right: 1px solid ${props => props.theme.colors.gray} !important;
    cursor: pointer;
    .title {
        display: flex;
        gap: 4px;
        align-items: center;
        > svg {
            width: 16px;
            height: 16px;
        }
    }
    svg {
        width: 24px;
        height: 24px;
    }
    .close {
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-item: center;
    }
`

const Tabs = styled.div `
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    height: 36px;
    flex-grow: 1;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none !important;
    }
`

const Container = styled.div `
    display: flex;
    justify-content: space-between;
`
const FilesActionContainer = styled.div `
    display: flex;
    align-items: center;
    gap: 4px;
    .action {
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
            border-radius: 4px;
            background: ${props => props.theme.colors.gray};
        }
    }
    .border {
        height: 16px;
        width: 1px;
        background-color: #adadad;;
    }
    svg {
        width: 16px;
        height: 16px;
        color: #adadad;
    }
`

type OwnProps = {
    onFileSelected: (path: string) => void;
    currentFile: string
}


const FileTabs: React.FC<OwnProps> = ({ onFileSelected, currentFile }) => {
    const { tabs } = useSelector((store: ReduxStore) => store.recent)
    
    return <Container>
        <Tabs>
            {tabs.map(tab => <TabComponent currentFile={currentFile} onFileSelected={onFileSelected} tab={tab} key={tab.path} />)}
        </Tabs>
        <EditorActions />
    </Container>
}

type TabProps = {
    tab: {name: string, path: string};
} & OwnProps

const TabComponent: React.FC<TabProps> = ({ tab, currentFile, onFileSelected }) => {
    const { name, path } = tab
    const IconComponent = useExtension(name)
    const [ hover, setHover ] = useState<boolean>(false)
    const dispatch = useDispatch()

    const handleTabRemoved = async () => {
        await dispatch(removeTab(name, path))
        if (currentFile === path) onFileSelected('')
    }


    return <Tab onMouseEnter={() => setHover(true)}
                hover={hover} 
                isCurrent={currentFile === path}
                onMouseLeave={() => setHover(false)}
                onClick={() => onFileSelected(path)}      
            >
                    <div className='title'>
                        <IconComponent />
                        <Typography varient='h5' fontWeight={300}>{name}</Typography>
                    </div>
        <div className='close'>
            {(currentFile === path) || hover ? <IoIosClose onClick={handleTabRemoved} /> : null}
        </div>
</Tab>
}

const EditorActions: React.FC = () => {
    return <FilesActionContainer>
        <div className='action'>
            <MdVerticalSplit />
        </div>
        <div className='border' />
        <div className='action'>
            <BsLayoutSplit />
        </div>
        <div className='action'>
            <BsThreeDots />
        </div>
    </FilesActionContainer>
}

export default FileTabs;
