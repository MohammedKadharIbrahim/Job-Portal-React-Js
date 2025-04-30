
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JobState {
  appliedJobs: number[];
}


const initialState: JobState = {
  appliedJobs: [],
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState, 
  reducers: {
    markJobAsApplied: (state, action: PayloadAction<number>) => {
      const jobId = action.payload;
      if (!state.appliedJobs.includes(jobId)) {
        state.appliedJobs.push(jobId);
      }
    },
  },
});

export const { markJobAsApplied } = jobSlice.actions;
export default jobSlice.reducer;
