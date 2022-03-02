import React, { useState } from "react";
import ValueBox from "./valueBox";
import "./register.scss";

interface IProps {
    name?: string,
    value: string,
}

const Register : React.FC<IProps> = ({ name, value }) => {
    const [open, setOpen] = useState(false);

    const handleMore = () => {
        setOpen((state) => !state);
    }

    return (
        <div className="reg">
            <div className="flex flex-center pb-1">
                <h1 className="flex-1 text-xl">{name}</h1>
                <div className="more" onClick={ handleMore }>more</div>
            </div>
            <div className="item flex">
                <div className="grow">
                    <ValueBox n={value} bits={32}/>
                </div>
            </div>

            {open ?
                <>
                <div className="item flex">
                    <div className="flex-1">
                        <h1 className="text-center text-lg">{name?.slice(1)}</h1>
                        <ValueBox n={value.slice(4)} bits={16}/>
                    </div>
                </div>
                <div className="item flex">
                    <div className="flex-1 max-w-1/2">
                        <h1 className="text-center text-lg">{name?.slice(1,2)}H</h1>
                        <ValueBox n={value.slice(4, 6)} bits={8}/>
                    </div>
                    <div className="flex-1 max-w-1/2">
                        <h1 className="text-center text-lg">{name?.slice(1,2)}L</h1>
                        <ValueBox n={value.slice(6, 8)} bits={8}/>
                    </div>
                </div>
                </>
            : ""}
        </div>
    );
};

export default Register;
