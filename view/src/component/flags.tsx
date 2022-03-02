import React from "react";
import "./flags.scss";

interface IFlagProps {
    name: string,
    pos: number,
    eflags: number,
}

const Flag : React.FC<IFlagProps> = ({ name, pos, eflags }) => {
    const getFlag = () : string => {
        const mask = (1 << pos);
        if ((mask & eflags) == mask) {
            return "1";
        } else {
            return "0"
        }
    }

    return (
        <div className="grow flag">
            <div className="flag-name text-center bg-gray-800">{name}</div>
            <div className="flag-value text-center bg-gray-700 py-2">{getFlag()}</div>
        </div>
    );
}

interface IProps {
    value: number;
}

const Flags : React.FC<IProps> = ({value}) => {
    return (
        <div className="flex flex-row gap-1">
            <Flag name="CF" eflags={value} pos={0}/>
            <Flag name="PF" eflags={value} pos={2}/>
            <Flag name="AF" eflags={value} pos={4}/>
            <Flag name="ZF" eflags={value} pos={6}/>
            <Flag name="SF" eflags={value} pos={7}/>
            <Flag name="TF" eflags={value} pos={8}/>
            <Flag name="IF" eflags={value} pos={9}/>
            <Flag name="DF" eflags={value} pos={10}/>
            <Flag name="OF" eflags={value} pos={11}/>
        </div>
    );
}

export default Flags;