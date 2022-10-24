import { HasId } from '.';
import { ImageFileType, SocialLinks } from './Common';
import { MediaItem } from './Media';
import { Model3D } from './Model3D';
import { QuizOption } from './ThematicUniverse';
// import { MarkerMedia } from './MarkerMedia';

export interface RouteMarker extends HasId {
    name?: string;
    description?: string;
    lat?: number;
    lon?: number;
    address?: string;
    city?: string;
    isVisited?: boolean;
    isPhysicalVisited?: boolean;
    isQuizSolved?: boolean;
    quizReply?: string
    isRewardReceived?: boolean;
    country?: string;
    categoryTypeId?: string;
    categoryType?: { id: number, name: string, key?: number, i18nKey?: string }
    region?: string;
    postalCode?: string;
    number?: string;
    tags?: string;
    status?: string;
    order?: number;
    media?: MediaItem[];
    youtubeUrl?: string;
    // physicalVisited?: boolean;
    // rewardReceived?: boolean;
    markerAction?: {order: number, action: MarkerAction}[] | MarkerAction;
    rewardToEarn?: MarkerReward;
    rewardToEarnId?: string;
    dynamicOrderBranch?: number;
    dynamicOrderStep?: number;
    nextMarkerDynamicOrderBranch?: number;
    testReply?: PersonalityTestReply,
    userOpinionReply?: UserOpinionReply;
    socialLinks?: SocialLinks;
    isActiveMarketplace?: boolean;
    gameScore?: number;
    // model3dIds?:string[];
}

export interface MarkerVisit {
    isVisited?: boolean,
    isPhysicalVisited?: boolean,
    isQuizSolved?: boolean,
    gameScore?: number,
    quizReply?: string;
    isRewardReceived?: boolean;
    testReply?: PersonalityTestReply;
    userOpinionReply?: UserOpinionReply;
    // gameScore?: number;
}

export interface MarkerReward {
    id: string;
    maxUnits?: number;
    unitsPerRound?: number;
    comment?: string;
    name: string;
    // rewardType: RewardType;
    imageContentType?: ImageFileType;
    imageUrl?: string;
    safeUrl?: any;
    data?: RewardData;
    youtubeUrl?: string;
    backgroundColor?: string;
    backgroundImgUrl?:string;
    model3Ds?: Model3D[]
}

export interface RewardData {
    text?: RewardTextDataTranslated | RewardTextData;
    name?: string
}

export interface RewardTextDataTranslated {
    es?: RewardTextData;
    cat?: RewardTextData;
    en?: RewardTextData;
}

export interface RewardTextData {
    name: string,
    description: string;
    attributes: RewardTextDataAtrribute[]
}

export interface RewardTextDataAtrribute {
    title: string,
    icon: string;
    text: string;
}

/* export interface RewardType {
    id: number;
    name: 'no-challenge' | 'after-quiz' | 'after-survey' | 'after-game',
    afterQuiz: boolean,
    afterGame: boolean,
    afterSurvey: boolean
} */

export interface MarkerRewardRequest {
    maxUnits: number;
    unitsPerRound: number;
    comment?: string;
    name: string;
}

// TODO check is testReply also restart
export interface RestartRouteRequest {
    isVisited?: boolean;
    isPhysicalVisited?: boolean;
    isQuizSolved?: boolean;
    quizReply: null;
    isRewardReceived?: boolean;
    resetTestReplyId?: boolean;
}

export interface MarkerAction {
    quiz?: MarkerActionQuiz;
    personalityTest?: MarkerPersonalityTest,
    userOpinion?: UserOpinionSurvey,
    game?: MarkerGame,
    reward?: MarkerReward
}

export interface MarkerGame {
    // order: number | null
    type: MarkerGameType,
    quizzes?: MarkerActionQuiz[],
    isQuizSolved?:boolean,
    introText?: string
}

export type MarkerGameType = 'hitting-game' | 'time-quiz' | 'time-image-uploader' | 'audio-recorder-game'

export interface UserOpinionSurvey {
    // order: number | null
    openQuestion?: string
}

export interface UserOpinionReply {
    // order: number | null
    textReply?: string;
}

export interface MarkerActionQuiz {
    // order: number | null
    question: string;
    options: QuizOption[],
    isSingleIntent?: boolean,
    imgUrl?: string,
    customReplySuccess?: string,
    replySuccessYoutubeUrl?: string,
    isQuizSolved?: boolean;
    score?: number;
}

export interface QuizReply {
    isQuizSolved: boolean,
    quizReply: string
}

export interface MarkerPersonalityTest {
    openQuestion?: string;
    multipleChoice: MultipleChoice;
}

export interface MultipleChoice {
    multipleChoiceQuestion: string;
    options: MultipleChoiceOption[];
}

export interface MultipleChoiceOption {
    reply: string;
    replyId: number;
    nextMarkerBranch: number;
}

export interface PersonalityTestReply {
    textReply?: string;
    replyId: number;
    nextMarkerBranch?: number;
}

// {"quiz":{"question": "where are you from", "options": [{"reply": "from hamburg", "isSolution": false}, {"reply": "from Munich", "isSolution": true}]}}
// export type MarkerActionType = 'quiz' 


export interface MarkerVisitedRequest {
    isVisited?: boolean;
    isPhysicalVisited?: boolean;
    isQuizSolved?: boolean;
    quizReply?: string;
    isRewardReceived?: boolean;
    testReply?: PersonalityTestReply;
    userOpinionReplyString?: string;
    gameScore?: number;
}

export type MarkerModalAction = 'edit' | 'create';


export const markerSocialLinksOptionNames = [
    'website', 
    'instagram', 
    'twitter',
    'facebook',
    // 'spotify',
    'meetup',
    'linkedin',
    'youtubeVideo', 
    'youtubeChannel',
    // 'tinder'
]
