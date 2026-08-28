import { describe, expect, it } from 'vitest';
import { completeGoal, createGoal, pickNextBestAction, type LifeGoal } from './lifeos-workspace';

describe('LifeOS workspace helpers', () => {
  it('creates a goal with a stable local id and incomplete state', () => {
    const goal = createGoal('Finish portfolio', 'high');
    expect(goal.title).toBe('Finish portfolio');
    expect(goal.priority).toBe('high');
    expect(goal.completed).toBe(false);
    expect(goal.id).toMatch(/^goal-/);
  });

  it('marks a goal complete without mutating the original', () => {
    const original: LifeGoal = { id: 'goal-1', title: 'Study', priority: 'medium', completed: false };
    const completed = completeGoal(original);
    expect(completed.completed).toBe(true);
    expect(original.completed).toBe(false);
  });

  it('selects the highest-priority incomplete goal as the next best action', () => {
    const goals: LifeGoal[] = [
      { id: '1', title: 'Low', priority: 'low', completed: false },
      { id: '2', title: 'High', priority: 'high', completed: false },
      { id: '3', title: 'Done', priority: 'urgent', completed: true },
    ];
    expect(pickNextBestAction(goals)?.title).toBe('High');
  });
});
