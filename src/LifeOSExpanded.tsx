import { useEffect, useState } from 'react';
import { api, auth } from '@appdeploy/client';
import { Home, CalendarDays, MessageCircle, Target, HeartPulse, Search, Library, ShieldCheck, Settings, Menu, Sun, Moon, Sparkles, ChevronRight, CircleUserRound, Plus, X, Bot, WandSparkles } from 'lucide-react';
import AskLifeOSV2 from './AskLifeOSV2';
import DayMastery from './DayMastery';
import ResearchV23 from './ResearchV23';
import LibraryV23 from './LibraryV23';
import PrivacyV23 from './PrivacyV23';
import SettingsV23 from './SettingsV23';
import CreateStudio from './CreateStudio';
import { AgentsWorkspace, GoalsWorkspace, HealthCareWorkspace, TodayWorkspace, starterGoals } from './LifeOSWorkspaces';
import type { LifeGoal } from './lifeos-workspace';
import './aurora.css';
import './v23.css';

type Section = 'today' | 'day' | 'ask' | 'goals' | 'health' | 'research' | 'library' | 'agents' | 'create' | 'privacy' | 'settings';
const nav = [
  ['today', 'Today', Home], ['day', 'Day Plan', CalendarDays], ['ask', 'Ask LifeOS', MessageCircle], ['goals', 'Life Goals', Target],
  ['health', 'Health & Care', HeartPulse], ['research', 'Research', Search], ['library', 'Library', Library], ['agents', 'Agents', Bot],
  ['create', 'Create Studio', WandSparkles], ['privacy', 'Privacy', ShieldCheck], ['settings', 'Settings', Settings],
] as const;

export default function LifeOSExpanded() {
  const [section, setSection] = useState<Section>('today');
  const [dark, setDark] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [toast, setToast] = useState('');
  const [goals, setGoals] = useState<LifeGoal[]>(starterGoals);

  useEffect(() => { void auth.getUser().then(setUser); }, []);
  const go = (s: Section) => { setSection(s); setMobile(false); };
  const ask = async (q: string, attachments = files, mode = 'auto') => {
    if (!q.trim()) return;
    const next = [...messages, { role: 'user', content: q, files: attachments.map((f) => f.name) }];
    setMessages(next); setInput('');
    try {
      const media: any[] = [];
      for (const f of attachments) if (f.type.startsWith('image/') || f.type.startsWith('audio/')) {
        const data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1] || ''); reader.onerror = reject; reader.readAsDataURL(f); });
        media.push({ data, mimeType: f.type, name: f.name, kind: f.type.startsWith('image/') ? 'image' : 'audio' });
      }
      const response = await api.post('/api/ai/chat', { message: q, history: next.slice(-12), media, memoryOn: true, mode });
      setMessages([...next, { role: 'assistant', content: response.data?.text || 'No answer returned.' }]);
      return response.data?.text || '';
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed.';
      setMessages([...next, { role: 'assistant', content: `I couldn't process that request. ${message}` }]);
      return '';
    }
  };

  const completeGoal = (goal: LifeGoal) => setGoals((current) => current.map((item) => item.id === goal.id ? { ...item, completed: true } : item));
  const currentLabel = nav.find((item) => item[0] === section)?.[1] || 'Today';

  return <div className={dark ? 'app dark' : 'app'}>
    <aside className={mobile ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="brand-mark"><Sparkles size={18}/></div><div><strong>LifeOS</strong><span>HUMAN INTELLIGENCE & CARE OS</span></div></div>
      <button className="close-mobile" onClick={() => setMobile(false)} aria-label="Close navigation"><X/></button>
      <div className="workspace-label">YOUR LIFE</div>
      <nav>{nav.map(([id, label, Icon]) => <button key={id} className={section === id ? 'nav-item active' : 'nav-item'} onClick={() => go(id)}><Icon size={17}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom"><button className="new-chat-side" onClick={() => go('ask')}><Plus size={15}/> New Chat</button><div className="sidebar-status"><span className="status-dot"/> LifeOS online</div></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu/></button><div className="breadcrumb"><span>LifeOS</span><ChevronRight size={14}/><b>{currentLabel}</b></div><div className="top-actions"><button className="icon-button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">{dark ? <Sun size={17}/> : <Moon size={17}/>}</button>{user ? <div className="profile"><div className="avatar">{user.picture ? <img src={user.picture} alt=""/> : <CircleUserRound size={19}/>}</div><span>{user.name?.split(' ')[0] || 'You'}</span></div> : <span className="profile">Guest</span>}</div></header>
      <div className="content">
        {section === 'today' && <TodayWorkspace goals={goals} onNavigate={(target) => go(target as Section)} onComplete={completeGoal}/>} 
        {section === 'day' && <DayMastery tracker={[]} setTracker={() => {}} metrics={[]} setMetrics={() => {}} toast={setToast}/>} 
        {section === 'ask' && <AskLifeOSV2 messages={messages} input={input} setInput={setInput} files={files} setFiles={setFiles} ask={ask} newChat={() => { setMessages([]); setInput(''); }}/>} 
        {section === 'goals' && <GoalsWorkspace goals={goals} setGoals={setGoals}/>} 
        {section === 'health' && <HealthCareWorkspace/>}
        {section === 'research' && <ResearchV23 onAsk={(q) => { go('ask'); setInput(q); }}/>} 
        {section === 'library' && <LibraryV23 onOpenChat={() => go('ask')}/>} 
        {section === 'agents' && <AgentsWorkspace/>}
        {section === 'create' && <div className="workspace-page"><div className="page-head"><div><span className="eyebrow"><WandSparkles size={13}/> CREATE STUDIO</span><h1>Make ideas tangible.</h1><p>Generate visual work without leaving the LifeOS workspace.</p></div></div><CreateStudio/></div>}
        {section === 'privacy' && <PrivacyV23/>}
        {section === 'settings' && <SettingsV23 user={user} signIn={() => auth.signIn({ scope: 'openid email profile offline_access' }).then((result) => setUser(result.user))} signOut={() => auth.signOut().then(() => setUser(null))} onToast={setToast}/>} 
      </div>
      {toast && <button className="toast" onClick={() => setToast('')} role="status">{toast}</button>}
    </main>
  </div>;
}
