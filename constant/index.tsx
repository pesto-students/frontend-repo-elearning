export const APIS = {
    ROOMS: "/rooms",
    ROOM_BY_ID: "/rooms/:id",
    ACTIVE_ROOMS: "/active-rooms",
    PEERS: "/active-rooms/:roomId/peers",
    PEER_BY_ID: "/active-rooms/:roomId/peers/peerId",
    ROOMS_CODE: "/room-codes/room/:roomId",
    LIVE_CLASS: "https://elearning-class.app.100ms.live/meeting/:roomCode",
    SESSIONS_BY_ROOM_ID: "/sessions?roomId=:roomId&active=true",
    SESSION_BY_SESSION_ID: "/sessions/:sessionId",
    CREATE_ORGANIZATION: "/api/organization/create",
    USER_LOGIN: "/api/auth/login",

    CREATE_STUDENT: "/api/student/create",
    LIST_STUDENT: "/api/student",
    EDIT_STUDENT: "/api/student/:id",

    CREATE_TEACHER: '/api/teacher/create',

    GET_CLASS: '/api/class/fetch',
    CREATE_CLASS: '/api/class/create',
    GET_TEACHERS: '/api/teacher/fetch',

    CREATE_ONLINE_CLASS: '/api/onlineClass/create',
    FETCH_ONLINE_CLASS: '/api/onlineClass/fetch',
    FETCH_RECORDINGS: '/api/recordedClass/fetch',

    GET_RECORDINGS_BY_ROOM_ID: '/recordings?room_id=:roomId',
    FETCH_RECORDINGS_BY_ROOM_ID: '/api/onlineClass/recordings',

    GET_STUDENTS: '/api/student/fetch'
}

export const SCHEMA_APIS = {
    TEACHER: "/api/schema/Teacher",
    STUDENT: "/api/schema/Student",
    ORGANIZATION: "/api/schema/Organization",
    BRANCH: "/api/schema/Branch",
    AUTH: "/api/schema/Auth",
    ONLINE_CLASS: "/api/schema/OnlineClass",
}

export const ORGANIZATION_TYPE = [
    'School',
    'College',
    'Coaching',
    'Individual'
]

export const ROUTES = {
    DASHBOARD: '/dashboard',
    TEACHERS: '/dashboard/teachers',
    RECORDED_CLASSES: '/dashboard/recorded-classes',
    RECORDED_CLASS_BY_ROOM_ID: '/dashboard/recorded-classes/:roomId'
}