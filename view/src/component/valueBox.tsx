import React, { useState } from "react";
import "./valueBox.scss";

enum ERedix {
    HEX,
    BIN,
    DEC,
}

const toRedix = (n: number, r: ERedix) : string => {
    switch (r) {
        case ERedix.HEX:
            return "0x" + n.toString(16);
        case ERedix.BIN:
            return "0b" + n.toString(2);
        case ERedix.DEC:
            return "" + n.toString(10);
    }
}

interface IProps {
    n: number
}

const ValueBox : React.FC<IProps> = ({ n }) => {
    const [show, setShow] = useState(false);
    const [redix, setRedix] = useState(ERedix.BIN);


    const classOpened = show ? "opened" : "";
    const classClosed= show ? "" : "closed";

    const onSelectRepr = (type: ERedix) => {
        setShow(false);
        setRedix(type);
        console.log("");
    }

    return (
            <div className="value-box">
                <div onClick={() => {setShow(!show)}} className={`value ${classOpened}`}>{ toRedix(n, redix) }</div>
                <div className={`select ${classClosed}`}>
                    <div onClick={() => {onSelectRepr(ERedix.BIN)}} className="repr">Bin</div>
                    <div onClick={() => {onSelectRepr(ERedix.HEX)}} className="repr">Hex</div>
                    <div onClick={() => {onSelectRepr(ERedix.DEC)}} className="repr">Dec</div>
                </div>
            </div>
    );
};

export default ValueBox;
