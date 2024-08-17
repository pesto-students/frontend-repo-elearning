import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginModal: false,
    roomsData: [],
    liveClassFormData: {},
    roomsCodeData: {},
    scheduleLiveClassModal: false,
    activeEditLiveClassData: {}
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setLoginModal(state, action) {
            state.loginModal = action.payload
        },
        setRoomsData(state, action) {
            state.roomsData = action.payload
        },
        setLiveClassFormData(state, action) {
            state.liveClassFormData[action.payload.id] = { ...state.liveClassFormData[action.payload.id], ...action.payload.data }
        },
        setRoomsCodeData(state, action) {
            state.roomsCodeData[action.payload.id] = action.payload.data
        },
        setScheduleLiveClassModal(state, action) {
            state.scheduleLiveClassModal = action.payload
        },
        resetLiveClassFormData(state) {
            state.liveClassFormData = {}
        },
        setActiveLiveClassFormData(state, action) {
            state.activeEditLiveClassData = action.payload
        },
        resetActiveLiveClassFormData(state) {
            state.activeEditLiveClassData = {}
        }
    },
})

export const { setLoginModal, setRoomsData, setLiveClassFormData, setRoomsCodeData, setScheduleLiveClassModal, setActiveLiveClassFormData, resetActiveLiveClassFormData } = storeSlice.actions
export default storeSlice.reducer


