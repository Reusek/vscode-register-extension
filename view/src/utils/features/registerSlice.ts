import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegistersState {
  eax: number,
  ebx: number,
  ecx: number,
  edx: number,
  eflags: number,
}

const initialState: RegistersState = {
  eax: 0,
  ebx: 0,
  ecx: 0,
  edx: 0,
  eflags: 0,
}

export const registersSlice = createSlice({
  name: 'registers',
  initialState,
  reducers: {
    updateRegisters: (state, action: PayloadAction<Partial<RegistersState>>) => {
      state = {...state,  ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateRegisters } = registersSlice.actions;

export default registersSlice.reducer;