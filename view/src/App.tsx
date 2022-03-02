import React from 'react';
import './App.scss';
import Register from './component/register';
import { RootState } from './utils/store'
import { useSelector, useDispatch } from 'react-redux'
import { Register as Reg } from "./utils/register";
import Flags from './component/flags';

const fill = (n: string) : string => {
  return "0".repeat(8 - n.length) + n;
}

function App() {
  const registers = useSelector((state: RootState) => state.registers)
  // const dispatch = useDispatch()

  console.log("test", registers);
  console.log(fill(registers.eax.slice(2)));
  // console.log(registers.eax);

  return (
    <div className="App">
      <Flags value={parseInt(registers.eflags)}/>
      <Register name='EAX' value={fill(registers.eax.slice(2))} />
      <Register name='EBX' value={fill(registers.ebx.slice(2))} />
      <Register name='ECX' value={fill(registers.ecx.slice(2))} />
      <Register name='EDX' value={fill(registers.edx.slice(2))} />
      <Register name='ESP' value={fill(registers.esp.slice(2))} />
      <Register name='EBP' value={fill(registers.ebp.slice(2))} />
      <Register name='ESI' value={fill(registers.esi.slice(2))} />
      <Register name='EDI' value={fill(registers.edi.slice(2))} />
      <Register name='EIP' value={fill(registers.eip.slice(2))} />
      <Register name='EFLAGS' value={fill(registers.eflags.slice(2))} />
    </div>
  );
}

export default App;
