export const APIS = {
    ROOMS: "/rooms",
    ROOM_BY_ID: "/rooms/:id",
    ACTIVE_ROOMS: "/active-rooms",
    PEERS: "/active-rooms/:roomId/peers",
    PEER_BY_ID: "/active-rooms/:roomId/peers/peerId",
    ROOMS_CODE: "/room-codes/room/:roomId",
    LIVE_CLASS: "https://elearning-class.app.100ms.live/meeting/:roomCode",
    SESSIONS_BY_ROOM_ID: "/sessions?roomId=:roomId&active=true",
    SESSION_BY_SESSION_ID: "/sessions/:sessionId"
}