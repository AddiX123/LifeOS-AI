export type GoalPriority = 'low' | 'medium' | 'high' | 'urgent';

export type LifeGoal = {
  id: string;
  title: string;
  priority: GoalPriority;
  completed: boolean;
};

const priorityRank: Record<GoalPriority, number> = { low: 1, medium: 2, high: 3, urgent: 4 };

export function createGoal(title: string, priority: GoalPriority = 'medium'): LifeGoal {
  return { id: `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title: title.trim(), priority, completed: false };
}

export function completeGoal(goal: LifeGoal): LifeGoal {
  return { ...goal, completed: true };
}

export function pickNextBestAction(goals: LifeGoal[]): LifeGoal | undefined {
  return goals.filter((goal) => !goal.completed).sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority])[0];
}
