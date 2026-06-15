import COUNTRIES_LIST from '@/constants/countriesList';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FormDataPayload {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: string;
  terms: boolean;
}

interface FormState {
  submissions: FormDataPayload[];
  countries: string[];
}

const initialState: FormState = {
  submissions: [],
  countries: COUNTRIES_LIST,
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormDataPayload>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export default formSlice.reducer;
