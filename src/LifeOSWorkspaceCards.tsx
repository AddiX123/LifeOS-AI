import type { ReactNode } from 'react';
import { ArrowUpRight, Check, Circle, Sparkles } from 'lucide-react';
import type { LifeGoal } from './lifeos-workspace';

export type QuickAction = { label: string; description: string; icon?: ReactNode; onClick: () => void };
export type ActivityItem = { title: string; meta: string; status?: string };

export function WorkspaceCard({ title, eyebrow, children, action }: { title: string; eyebrow?: string; children: ReactNode; action?: ReactNode }) {
  return <section className="workspace-card"><div className="workspace-card-head"><div>{eyebrow && <span className="eyebrow"><Sparkles size={12}/>{eyebrow}</span>}<h3>{title}</h3></div>{action}</div>{children}</section>;
}

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return <div className="quick-actions">{actions.map((action) => <button className="quick-action" key={action.label} onClick={action.onClick}>{action.icon}<span><strong>{action.label}</strong><small>{action.description}</small></span><ArrowUpRight size={15}/></button>)}</div>;
}

export function GoalList({ goals, onComplete }: { goals: LifeGoal[]; onComplete: (goal: LifeGoal) => void }) {
  return <div className="goal-list">{goals.length === 0 ? <div className="empty-state">No goals yet. Add one to give LifeOS something meaningful to optimize.</div> : goals.map((goal) => <div className={`goal-row ${goal.completed ? 'completed' : ''}`} key={goal.id}><button className="goal-check" aria-label={goal.completed ? `Completed ${goal.title}` : `Complete ${goal.title}`} onClick={() => onComplete(goal)}>{goal.completed ? <Check size={15}/> : <Circle size={15}/>}</button><span className="goal-copy"><strong>{goal.title}</strong><small>{goal.priority.toUpperCase()} PRIORITY</small></span>{goal.completed ? <span className="goal-state">Done</span> : <span className={`priority priority-${goal.priority}`}>{goal.priority}</span>}</div>)}</div>;
}

export function ActivityList({ items }: { items: ActivityItem[] }) {
  return <div className="activity-list">{items.map((item) => <div className="activity-row" key={`${item.title}-${item.meta}`}><span className="activity-dot"/><span><strong>{item.title}</strong><small>{item.meta}</small></span>{item.status && <em>{item.status}</em>}</div>)}</div>;
}
