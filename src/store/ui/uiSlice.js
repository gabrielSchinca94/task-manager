import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isTaskModalOpen: false,
        task:null,
    },
    reducers: {
        onOpenTaskModal: ( state, {payload} ) => {
            state.isTaskModalOpen = true;
            state.task = payload;
        },
        onCloseTaskModal: ( state ) => {
            state.isTaskModalOpen = false;
            state.task = null;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onOpenTaskModal, onCloseTaskModal } = uiSlice.actions;