export interface SubscriberProgress {
  userId: string;
  name: string;
  cadreTitle: string;
  cadreType: string;
  completedTasks: number;
  totalTasks: number;
  profileImage: string;
  percentageCompleted: string;
  level: string;
  badge: string;
}
export type SubscriberProgressList = SubscriberProgress[];

interface Progress {
  action: string;
  current: number;
  target: number;
  isComplete: boolean;
}

interface BadgeProgress {
  badge_name: string;
  badgeId: string;
  progress: Progress[];
}

interface LevelProgress {
  level: string;
  levelId: string;
  tasksProgress: BadgeProgress[];
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export type SubscriberTaskProgress = LevelProgress[];
export interface AllSubscriberProgress {
  userId: string;
  name: string;
  cadreTitle: string;
  profileImage: string | null; // Nullable
  cadreType: string;
  completedTasks: number;
  totalTasks: number;
  percentageCompleted: string; // Represented as a string
  level: string;
  badge: string;
}

export interface AllSubscriberListResponse {
  list: AllSubscriberProgress[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export type TopThreeUserType = {
  userId: string;
  name: string;
  cadreTitle: string;
  profileImage: string | null;
  cadreType: string;
  completedTasks: number;
  totalTasks: number;
  percentageCompleted: string;
  level: string;
  badge: string;
}[];
