import React, { useState } from "react";
import "./valueBox.scss";

import { Register, RegisterTypes } from "../utils/register";

enum ERedix {
    HEX,
    BIN,
    INT,
    UINT,
    FLOAT,
}

const toRedix = (n: string, r: ERedix, bits: number) : string => {
    switch (r) {
        case ERedix.HEX:
            return "0x" + new Register(n, bits).getDecoded(RegisterTypes.HEX);
        case ERedix.BIN:
            return "0b" + new Register(n, bits).getDecoded(RegisterTypes.BITS);
        case ERedix.INT:
            return new Register(n, bits).getDecoded(RegisterTypes.I32);
        case ERedix.UINT:
            return new Register(n, bits).getDecoded(RegisterTypes.U32);
        case ERedix.FLOAT:
            return new Register(n, bits).getDecoded(RegisterTypes.F32);
        default:
            return "";
    }
}

interface IProps {
    n: string,
    bits: number,
}

const ValueBox : React.FC<IProps> = ({ n, bits }) => {
    const [show, setShow] = useState(false);
    const [redix, setRedix] = useState(ERedix.HEX);


    const classOpened = show ? "opened" : "";
    const classClosed= show ? "" : "closed";

    const onSelectRepr = (type: ERedix) => {
        setShow(false);
        setRedix(type);
        console.log("");
    }

    return (
            <div className="value-box">
                <div onClick={() => {setShow(!show)}} className={`value ${classOpened}`}>{ toRedix(n, redix, bits) }</div>
                <div className={`select ${classClosed}`}>
                    <div onClick={() => {onSelectRepr(ERedix.BIN)}} className="repr">Bin (0b0)</div>
                    <div onClick={() => {onSelectRepr(ERedix.HEX)}} className="repr">Hex (0x0)</div>
                    <div onClick={() => {onSelectRepr(ERedix.INT)}} className="repr">int32</div>
                    <div onClick={() => {onSelectRepr(ERedix.UINT)}} className="repr">uint32</div>
                    <div onClick={() => {onSelectRepr(ERedix.UINT)}} className="repr">float32</div>
                </div>
                {/* <div className="value"></div> */}
            </div>
    );
};

export default ValueBox;
