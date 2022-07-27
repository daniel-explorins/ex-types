export interface OnboardingItem {
    backgroundColor: 'dark-blue' | 'dark-yellow',
    sections: OnboardingItemSection[]
  };
  
export interface OnboardingItemSection {
    imgUrl?: string,
    animationUrl?: string,
    title?: string,
    subtitle?: string,
    text?: string
  }