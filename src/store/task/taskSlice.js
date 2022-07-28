import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks:[
        {
            uid:1,
            status:'New',
            description:'some task description'
        },
        {
            uid:2,
            status:'In Progress',
            description:'do something kasjdklasdklas nmdasln dklsamd klas'
        }
    ],
    active:null,
}

export const taskSlice = createSlice({
 name: 'task',
 initialState,
 reducers: {
    setActiveTask: (state, {payload} ) => {
        state.active = payload; 
    },
    addNewTask: (state, {payload} ) => {

        const newTask = {
            ...payload,
            uid:new Date().getTime(),
        };

        state.tasks = [
            newTask,
            ...state.tasks,
        ]; 

        state.active = state.tasks[0];
    },
    editTask:(state, {payload}) => {
        state.tasks = state.tasks.map( task => {
            if ( task.uid === payload.uid ) {
                return payload;
            }

            return task;
        });
    },
    deleteTask:(state, {payload}) => {
        state.tasks = state.tasks.filter(t => t.uid !== payload.uid)
    }
 }
});

// Action creators are generated for each case reducer function
export const { setActiveTask, addNewTask, editTask, deleteTask  } = taskSlice.actions;