import React from "react";
import Folder from "./Folder";
import File from "./File";

type OwnProps = {
  construct: any;
  onFileSelected: (path: string) => void;
};

export const FILE_INDICATOR = "";

const Construct: React.FC<OwnProps> = ({ construct, onFileSelected }) => {
  const keys = Object.keys(construct);
  return keys.map((key) => {
    return construct[key] === FILE_INDICATOR ? (
      <File name={key} key={key} path={key} onFileSelected={onFileSelected} />
    ) : (
      <Folder
        path={key}
        key={key}
        name={key}
        construct={construct[key]}
        onFileSelected={onFileSelected}
      />
    );
  });
};

export default Construct;
