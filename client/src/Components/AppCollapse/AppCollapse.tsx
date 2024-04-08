import React, { useState } from "react";
import { styled } from "styled-components";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";


const CollapseContainer = styled.div `
    width: 100%;
    border-top: 1px solid ${props => props.theme.colors.gray};
`

const CollapseHeader = styled.div `
    width: 100% !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 0;
    border-bottom: 1px solid ${props => props.theme.colors.gray};

    .header {
        display: flex;
        align-items: center;
        font-size: 16px;
        gap: 4px;
        border: none;
    }
`

const CollapseBody = styled.div `
    min-height: 400px;
    overflow: scroll;
    padding: 4px 0 4px 12px;
`

type OwnProps = {
    title: string;
    defaultOpen?: boolean;
    actions?: () => React.ReactElement;
    children: any
}

const AppCollapse: React.FC<OwnProps> = ({ title, defaultOpen, actions, children }) => {
    const [open, setOpen] = useState(defaultOpen)

    const toogleOpen = () => setOpen(!open)

    return <CollapseContainer>
        <CollapseHeader onClick={toogleOpen}>
            <div className="header">
                {!open ? <IoChevronForward /> : <IoChevronDown />}
                {title}
            </div>
            {actions?.()}
        </CollapseHeader>
        {open ? <CollapseBody>
            {children}
        </CollapseBody> : null}
    </CollapseContainer>
}

export default AppCollapse;
