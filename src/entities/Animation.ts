

export interface IntroAnimation {
    scenes: AnimationScene[]
}

export interface LottieAnimation {
    lottieUrl: string,
    defaultAnimationSpeed?: number,
    animationSpeed?: number,
    isLoop?: boolean,
    isAutoplay?: boolean,
    isAnimationPlaying?: boolean,
  }

export interface AnimationScene {
    animations: LottieAnimation[],
    title?: string,
    text?: any,
    textBoxTitle?: string,
    backgroundImgUrl?:string,
}