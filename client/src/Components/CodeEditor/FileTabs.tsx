import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { IoIosClose } from "react-icons/io";
import Typography from '../Typography';
import useExtension from '../../hooks/useExtension';

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
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none !important;
    }
`

type OwnProps = {
    onFileSelected: (path: string) => void;
    currentFile: string
}


const FileTabs: React.FC<OwnProps> = ({ onFileSelected, currentFile }) => {
    const { tabs } = useSelector((store: ReduxStore) => store.recent)
    
    return <Tabs>
        {tabs.map(tab => <TabComponent currentFile={currentFile} onFileSelected={onFileSelected} tab={tab} key={tab.path} />)}
    </Tabs>
}

type TabProps = {
    tab: {name: string, path: string};
} & OwnProps

const TabComponent: React.FC<TabProps> = ({ tab, currentFile, onFileSelected }) => {
    const { name, path } = tab
    const IconComponent = useExtension(name)
    const [ hover, setHover ] = useState<boolean>(false)


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
            {(currentFile || hover) === path ? <IoIosClose /> : null}
        </div>
</Tab>
}

export default FileTabs;
