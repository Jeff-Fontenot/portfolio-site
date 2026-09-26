export type Skill = {
  name: string;
  icon: string;
  /** 0-100. Reserved for a future confidence-score display. */
  proficiency?: number;
  /** Project slugs/links where this skill was applied. Reserved for a future hover popover. */
  usedIn?: string[];
};
