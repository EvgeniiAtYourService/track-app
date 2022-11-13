import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TrackState {
    value: number
}

const initialState: TrackState = {
    value: 0,
}

export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        decrement: (state) => {
            state.value -= 1
        },
    },
})

export const { decrement } = trackSlice.actions

export default trackSlice.reducer