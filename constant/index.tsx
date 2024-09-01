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
    GET_STUDENTS: '/api/student/fetch',

    UPLOAD_DOCUMENT: 'api/gemini/upload-file',
    CREATE_QUESTIONS: 'api/gemini/create-questions',
    CHAT_BOT: 'api/gemini/chat-assistance'
}

export const SCHEMA_APIS = {
    TEACHER: "/api/schema/Teacher",
    STUDENT: "/api/schema/Student",
    ORGANIZATION: "/api/schema/Organization",
    BRANCH: "/api/schema/Branch",
    AUTH: "/api/schema/Auth",
    ONLINE_CLASS: "/api/schema/OnlineClass",
    SCHEMA_BY_SERVICE: '/api/schema/:service',
    CREATE_ORGANIZATION: "/api/organization/create",
}

export const ORGANIZATION_TYPE = [
    'School',
    'College',
    'Coaching',
    'Individual'
]

export const examplePrompt = ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quesstion title</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        h2 {
            color: #555;
        }
        .question {
            margin: 20px 0;
        }
        .answer-key {
            background-color: #eaeaea;
            padding: 10px;
            border-left: 4px solid #333;
        }
    </style>
</head>
<body>

    <h1>Question paper title</h1>

    <h2>Instructions:</h2>
    <p>Read the information about Vinayak and choose the best answer for each question.</p>

    <div class="question">
        <h2>1.Question?</h2>
        <ul>
            <li>a) Option 1</li>
            <li>b) Option 2</li>
            <li>c) Option 3</li>
            <li>d) Option 4</li>
        </ul>
    </div>


    <div class="answer-key">
        <h2>Answer Key:</h2>
        <p>1. b</p>
    </div>

</body>
</html>`

export const ROUTES = {
    DASHBOARD: '/dashboard',
    TEACHERS: '/dashboard/teachers',
    RECORDED_CLASSES: '/dashboard/recorded-classes',
    RECORDED_CLASS_BY_ROOM_ID: '/dashboard/recorded-classes/:roomId'
}
