

export const routeGamesRules: RouteGameRules[] = [
    {
        name: 'Just for Fun',
        id: 1,
        isPhysicalVisited: false,
        isQuizSolved: false,
        gameScore: null,
        userOpinionReply: false,
    },
    {
        name: 'Challenge',
        id: 2,
        isPhysicalVisited: false,
        isQuizSolved: false,
        gameScore: 0,
        userOpinionReply: false,
    },
    {
        name: 'Escape Room',
        id: 3,
        isPhysicalVisited: true,
        isQuizSolved: true,
        gameScore: 0,
        userOpinionReply: false,
    }
]

export interface RouteGameRules {
    name: string,
    id: number
    isPhysicalVisited: boolean,
    isQuizSolved: boolean,
    gameScore: number | null,
    userOpinionReply: false,
}

