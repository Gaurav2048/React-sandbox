import React from "react";
import { styled } from "styled-components";

type OwnProps = {
    children: any;
    varient?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    styles?: any
}

const H1 = styled.h1``
const H2 = styled.h2``
const H3 = styled.h3``
const H4 = styled.h4``
const H5 = styled.h5``

const Typography: React.FC<OwnProps> = ({ varient, children, styles }) => {
    if (varient === 'h1') {
        return <H1 style={styles}>{children}</H1>
    }
    if (varient === 'h2') {
        return <H2 style={styles}>{children}</H2>
    }
    if (varient === 'h3') {
        return <H3 style={styles}>{children}</H3>
    }
    if (varient === 'h4') {
        return <H4 style={styles}>{children}</H4>
    }
    if (varient === 'h5') {
        return <H5 style={styles}>{children}</H5>
    }
    return <div style={styles}>{children}</div>
}

export default Typography;
