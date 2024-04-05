import React from "react";
import { styled } from "styled-components";

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    .header {
        border-bottom: 1px solid ${props => props.theme.colors.gray};
        height: 48px;
    }
`

type LayoutProps = {
    children: any
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <Container>
        <div className="header"></div>
        {children}
    </Container>
}

export default Layout;
