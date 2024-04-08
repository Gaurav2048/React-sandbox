import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Tab, Tabs } from "../CodeEditor/FileTabs";
import { IoIosClose } from "react-icons/io";

const IframeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe: React.FC = () => {
  const { refreshCount } = useSelector((store: ReduxStore) => store.files);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!iframeRef?.current) return;
    if (!iframeRef?.current?.contentDocument) return;

    iframeRef?.current?.contentDocument?.location?.reload();
  }, [refreshCount]);

  return (
    <IframeContainer>
      <WindowTabs />
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        key={refreshCount}
        style={{ background: "white" }}
        src={`http://localhost:3000/v1/file/project/b9dd4ad5-5723-4bf0-bc42-944a5494348f/build`}
      ></iframe>
    </IframeContainer>
  );
};

export default Iframe;

const WindowTabs: React.FC = () => {
  return (
    <Tabs>
      <Tab>
        Preview
        <div className="close">
          <IoIosClose />
        </div>
      </Tab>
    </Tabs>
  );
};
