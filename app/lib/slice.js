import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginModalState: { show: false },
    roomsData: [],
    liveClassFormData: {},
    roomsCodeData: {},
    scheduleOnlineClassModalState: { show: false, onlineClassData: null },
    activeEditLiveClassData: {},
    addStudentModalState: { show: false },
    addTeacherModalState: { show: false, teacherData: null },
    addClassModalState: { show: false },
    addParentModalState: { show: false },
    userData: {},
    notificationBarState: { show: false, title: 'success', description: '', isError: null },
    isLoading: false,
    confirmationModal: {
        isOpen: false,
        title: '',
        description: '',
        onConfirm: null,
    },
    selectedRecordings: []
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setLoginModal(state, action) {
            state.loginModalState = { ...state.loginModalState, ...action.payload }
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
        setScheduleOnlineClassModal(state, action) {
            state.scheduleOnlineClassModalState = { ...state.scheduleOnlineClassModalState, ...action.payload }
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
        showConfirmationModal: (state, action) => {
            state.confirmationModal = {
                isOpen: true,
                ...action.payload,
            };
        },
        hideConfirmationModal: (state) => {
            state.confirmationModal = {
                isOpen: false,
                title: '',
                description: '',
                onConfirm: null,
            };
        },
        setSelectedRecordings: (state, action) => {
            state.selectedRecordings = action.payload
        }
    },
})

export const { setLoginModal, setRoomsData, setLiveClassFormData, setRoomsCodeData, setScheduleOnlineClassModal, setActiveLiveClassFormData, resetActiveLiveClassFormData,
    setAddStudentModalState, setAddTeacherModalState, setAddClassModalState, setAddParentModalState, setUserData, setNotificationBarState, showLoader, hideLoader, showConfirmationModal,
    hideConfirmationModal, setSelectedRecordings } = storeSlice.actions
export default storeSlice.reducer


