import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const IframeContainer = styled.div `
    width: 100%;
    height: 100%;
`

const Iframe: React.FC = () => {
    const { refreshCount } = useSelector((store: ReduxStore) => store.files) 
    const iframeRef = useRef<HTMLIFrameElement | null>(null)
    console.log("refreshCount ", refreshCount);
    
    useEffect(() => {
        console.log(iframeRef.current?.contentDocument);
        
        if (!iframeRef?.current) return
        if (!iframeRef?.current?.contentDocument) return
        console.log("reload started");
        
        iframeRef?.current?.contentDocument?.location?.reload()
    }, [refreshCount])

    return <IframeContainer>
        <iframe 
            ref={iframeRef}
            width="100%" 
            height="100%"
            key={refreshCount} 
            style={{ background: 'white' }} 
            src={`http://localhost:3000/v1/file/project/b9dd4ad5-5723-4bf0-bc42-944a5494348f/build`} 
            ></iframe>
    </IframeContainer>
}

export default Iframe;
