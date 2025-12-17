
import React, { useState, useMemo } from 'react';
import { GamingEvent } from '../types';
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import Button from './Button';

interface ReleaseCalendarProps {
  events: GamingEvent[];
}

const ReleaseCalendar: React.FC<ReleaseCalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<GamingEvent | null>(null);

  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y: number, m: number) => new Date(y, m, 1).getDay();

  const eventsInMonth = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    const map: Record<number, GamingEvent[]> = {};
    events.forEach(e => {
        const d = new Date(e.date);
        if (d.getMonth() === m && d.getFullYear() === y) {
            const day = d.getDate();
            if (!map[day]) map[day] = [];
            map[day].push(e);
        }
    });
    return map;
  }, [events, currentDate]);

  const renderDays = () => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    const totalDays = getDaysInMonth(y, m);
    const offset = getFirstDay(y, m);
    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(<div key={`e-${i}`} className="h-24 bg-white/[0.01] border-r border-b border-white/[0.03]"></div>);
    for (let d = 1; d <= totalDays; d++) {
      const dayEvents = eventsInMonth[d] || [];
      cells.push(
        <div key={d} className="h-24 border-r border-b border-white/[0.03] p-2 transition-all hover:bg-white/5 relative">
          <span className="text-[10px] font-mono font-bold text-slate-700">{d < 10 ? `0${d}` : d}</span>
          <div className="mt-1.5 space-y-1">
            {dayEvents.map(e => (
                <button key={e.id} onClick={() => setSelectedEvent(e)} className="w-full text-[8px] text-left px-1.5 py-0.5 truncate bg-white/5 text-slate-300 border-l border-white/30 font-bold uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all">
                    {e.name}
                </button>
            ))}
          </div>
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 border-b border-white/5 pb-8">
        <div>
            <h2 className="text-3xl font-display font-black text-white mb-2 uppercase tracking-tight">Deployment <span className="text-[#70CFFF]">Ops</span></h2>
            <p className="text-slate-500 font-mono text-[9px] tracking-[0.4em] uppercase">Tactical Time Schedule</p>
        </div>
        <div className="flex items-center gap-4 bg-white/[0.02] p-1 border border-white/5 rounded-xl">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 text-slate-500 hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <div className="w-36 text-center font-bold text-[10px] text-white font-mono tracking-[0.2em]">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 text-slate-500 hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="bg-[#04040a] border border-white/5 grid grid-cols-7 rounded-2xl overflow-hidden shadow-xl">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => <div key={day} className="py-2.5 text-center text-[9px] font-mono font-bold text-slate-600 bg-white/[0.02] border-b border-white/5">{day}</div>)}
        {renderDays()}
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#08080c] border border-white/10 p-8 rounded-3xl w-full max-w-sm relative shadow-2xl">
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                <h3 className="text-xl font-display font-bold text-white mb-4 tracking-tight uppercase">{selectedEvent.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">{selectedEvent.description}</p>
                <div className="text-[10px] text-[#70CFFF] font-mono flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    DEEP_LOC: {selectedEvent.location || 'GLOBAL_SERVER'}
                </div>
                <Button className="w-full mt-8 h-12 rounded-xl" variant="outline" onClick={() => setSelectedEvent(null)}>Dismiss Intel</Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ReleaseCalendar;
