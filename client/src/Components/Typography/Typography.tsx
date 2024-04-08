import React from "react";
import { styled } from "styled-components";

type OwnProps = {
    children: any;
    varient?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    styles?: any;
    fontWeight?: any;
    color?: string;
}

const H1 = styled.h1`
    padding: 0;
    margin: 0;
    color: ${props => props.color};
`
const H2 = styled.h2`
    color: ${props => props.color};
`
const H3 = styled.h3`
    color: ${props => props.color};
`
const H4 = styled.h4`
    color: ${props => props.color};
`
const H5 = styled.h5`
    padding: 0;
    margin: 0;
    color: ${props => props.color};
`

const Typography: React.FC<OwnProps> = ({ color, varient, children, styles, fontWeight }) => {
    const appliedStyles = {
        ...styles,
        fontWeight,
        fontFamily: 'Roboto'
    }
    if (varient === 'h1') {
        return <H1 color={color} style={appliedStyles}>{children}</H1>
    }
    if (varient === 'h2') {
        return <H2 color={color} style={appliedStyles}>{children}</H2>
    }
    if (varient === 'h3') {
        return <H3 color={color} style={appliedStyles}>{children}</H3>
    }
    if (varient === 'h4') {
        return <H4 color={color} style={appliedStyles}>{children}</H4>
    }
    if (varient === 'h5') {
        return <H5 color={color} style={appliedStyles}>{children}</H5>
    }
    return <div style={{
        ...appliedStyles,
        color
    }}>{children}</div>
}

export default Typography;
