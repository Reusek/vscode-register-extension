import React from "react";
import ValueBox from "./valueBox";
import "./register.scss";

interface IProps {
    name?: string
}

const Register : React.FC<IProps> = () => {
    return (
        <div className="reg">
            <h1>Test</h1>
            <ValueBox n={100} />
            <ValueBox n={200} />
        </div>
    );
};

export default Register;
