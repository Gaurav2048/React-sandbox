import React, { useState } from "react";
import { Resizable } from "react-resizable";

const Draggable: React.FC<{ children: any }> = ({ children }) => {
    const [sizes, setSizes] = useState({
        height: screen.height - 84,
        width: screen.width * .4
    })

    const onResize = (event: any, {node, size, handle}: any) => {
        setSizes({ ...sizes, width: size.width });
    };

    return <Resizable width={sizes.width} onResize={onResize} axis='y' height={sizes.height}
    handle={<MyHandle />}
    
    >
        {children}
    </Resizable>
}

const MyHandle = React.forwardRef<any, any>((props, ref) => {
    const {handleAxis, ...restProps} = props;
    return <div ref={ref} style={{ background: 'red', width: '20px', height: '20px', zIndex: 2147483647 }} className={`foo handle-${handleAxis}`} {...restProps} >h</div>;
  });
  

export default Draggable;
