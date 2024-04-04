import React from "react";
import { styled } from "styled-components";

type OwnProps = {
    children: any;
    varient?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    styles?: any;
    fontWeight?: any;
}

const H1 = styled.h1`
    padding: 0;
    margin: 0;
`
const H2 = styled.h2``
const H3 = styled.h3``
const H4 = styled.h4``
const H5 = styled.h5`
    padding: 0;
    margin: 0;
`

const Typography: React.FC<OwnProps> = ({ varient, children, styles, fontWeight }) => {
    const appliedStyles = {
        ...styles,
        fontWeight
    }
    if (varient === 'h1') {
        return <H1 style={appliedStyles}>{children}</H1>
    }
    if (varient === 'h2') {
        return <H2 style={appliedStyles}>{children}</H2>
    }
    if (varient === 'h3') {
        return <H3 style={appliedStyles}>{children}</H3>
    }
    if (varient === 'h4') {
        return <H4 style={appliedStyles}>{children}</H4>
    }
    if (varient === 'h5') {
        return <H5 style={appliedStyles}>{children}</H5>
    }
    return <div style={appliedStyles}>{children}</div>
}

export default Typography;
