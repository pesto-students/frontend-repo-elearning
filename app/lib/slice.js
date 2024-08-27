import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginModal: false,
    roomsData: [],
    liveClassFormData: {},
    roomsCodeData: {},
    scheduleLiveClassModal: false,
    activeEditLiveClassData: {},
    addStudentModalState: { show: false },
    addTeacherModalState: { show: false },
    addClassModalState: { show: false },
    addParentModalState: { show: false },
    userData: {},
    notificationBarState: { show: false, title: 'success', description: '', isError: null },
    isLoading: false
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
        },
        setAddStudentModalState(state, action) {
            state.addStudentModalState = { ...state.addStudentModalState, ...action.payload }
        },
        setAddTeacherModalState(state, action) {
            state.addTeacherModalState = { ...state.addTeacherModalState, ...action.payload }
        },
        setAddClassModalState(state, action) {
            state.addClassModalState = { ...state.addClassModalState, ...action.payload }
        },
        setAddParentModalState(state, action) {
            state.addParentModalState = { ...state.addParentModalState, ...action.payload }
        },
        setUserData(state, action) {
            state.userData = { ...state.userData, ...action.payload }
        },
        setNotificationBarState(state, action) {
            state.notificationBarState = { ...state.notificationBarState, ...action.payload }
        },
        showLoader: (state) => {
            state.isLoading = true;
        },
        hideLoader: (state) => {
            state.isLoading = false;
        },
    },
})

export const { setLoginModal, setRoomsData, setLiveClassFormData, setRoomsCodeData, setScheduleLiveClassModal, setActiveLiveClassFormData, resetActiveLiveClassFormData,
    setAddStudentModalState, setAddTeacherModalState, setAddClassModalState, setAddParentModalState, setUserData, setNotificationBarState, showLoader, hideLoader } = storeSlice.actions
export default storeSlice.reducer


