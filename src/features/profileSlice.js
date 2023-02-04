import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        name: 'Default User'
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const { setName } = profileSlice.actions;

export const getName = (state) => state.profile.name;

export default profileSlice.reducer;