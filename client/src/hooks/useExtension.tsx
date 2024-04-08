import { BsFiletypeJsx } from "react-icons/bs";
import { AiFillHtml5 } from "react-icons/ai";
import { BsFiletypeCss } from "react-icons/bs";
import { BsFiletypeScss } from "react-icons/bs";
import { PiFileTsx } from "react-icons/pi";
import { FaJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const extenstionIconMapping: any = {
  jsx: () => <BsFiletypeJsx color="#6456fc" />,
  html: () => <AiFillHtml5 color="#fc5956" />,
  css: () => <BsFiletypeCss color="#fc5956" />,
  tsx: () => <PiFileTsx color="#6456fc" />,
  scss: () => <BsFiletypeScss color="#fc5956" />,
  js: () => <FaJs color="#6456fc" />,
  ts: () => <SiTypescript color="#6456fc" />,
};

const useExtension = (name: string) => {
  const extension = name.split(".")[1];
  const IconComponent = extenstionIconMapping[extension];
  return IconComponent;
};

export default useExtension;
