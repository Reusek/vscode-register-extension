import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegistersState {
  eax: string,
  ebx: string,
  ecx: string,
  edx: string,
  esp: string,
  ebp: string,
  esi: string,
  edi: string,
  eip: string,
  eflags: string,
}

const initialState: RegistersState = {
  eax: "0x0",
  ebx: "0x0",
  ecx: "0x0",
  edx: "0x0",
  esp: "0x0",
  ebp: "0x0",
  esi: "0x0",
  edi: "0x0",
  eip: "0x0",
  eflags: "0x0",
}

export const registersSlice = createSlice({
  name: 'registers',
  initialState,
  reducers: {
    updateRegisters: (state, action: PayloadAction<any>) => {
      console.info("action", action.payload);
      
      state = {...state, [action.payload.name]: action.payload.value};
    },
    updateEAX: (state, action: PayloadAction<string>) => {
      state.eax = action.payload;
    },
    updateEBX: (state, action: PayloadAction<string>) => {
      state.ebx = action.payload;
    },
    updateECX: (state, action: PayloadAction<string>) => {
      state.ecx = action.payload;
    },
    updateEDX: (state, action: PayloadAction<string>) => {
      state.edx = action.payload;
    },
    updateESP: (state, action: PayloadAction<string>) => {
      state.esp = action.payload;
    },
    updateEBP: (state, action: PayloadAction<string>) => {
      state.ebp = action.payload;
    },
    updateESI: (state, action: PayloadAction<string>) => {
      state.esi = action.payload;
    },
    updateEDI: (state, action: PayloadAction<string>) => {
      state.edi = action.payload;
    },
    updateEIP: (state, action: PayloadAction<string>) => {
      state.eip = action.payload;
    },
    updateEFLAGS: (state, action: PayloadAction<string>) => {
      state.eflags = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateRegisters,
  updateEAX,
  updateEBX,
  updateECX,
  updateEDX,
  updateESP,
  updateEBP,
  updateESI,
  updateEDI,
  updateEIP,
  updateEFLAGS
} = registersSlice.actions;

export default registersSlice.reducer;