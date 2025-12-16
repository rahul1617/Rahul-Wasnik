import React, { useState, useMemo } from 'react';
import { GamingEvent } from '../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Info, X } from 'lucide-react';
import Button from './Button';

interface ReleaseCalendarProps {
  events: GamingEvent[];
}

const ReleaseCalendar: React.FC<ReleaseCalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<GamingEvent | null>(null);

  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Helper to try and parse vague date strings from AI (e.g., "OCT 24", "2024-10-24")
  const getEventDate = (dateString: string): Date | null => {
    const currentYear = new Date().getFullYear();
    try {
        // Try standard parsing first
        let date = new Date(dateString);
        if (!isNaN(date.getTime())) return date;

        // Try "Month Day" format (e.g. "OCT 24")
        const parts = dateString.split(' ');
        if (parts.length >= 2) {
            const monthStr = parts[0] + " 1, " + currentYear;
            const monthIndex = new Date(monthStr).getMonth();
            const day = parseInt(parts[1].replace(/\D/g, '')); // Remove non-digits like 'th', 'st'
            
            if (!isNaN(monthIndex) && !isNaN(day)) {
                return new Date(currentYear, monthIndex, day);
            }
        }
        return null;
    } catch (e) {
        return null;
    }
  };

  const eventsInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Map events to specific days
    const map: Record<number, GamingEvent[]> = {};

    events.forEach(event => {
        const eventDate = getEventDate(event.date);
        
        // If we parsed a valid date and it matches current view
        if (eventDate && eventDate.getMonth() === month && eventDate.getFullYear() === year) {
            const day = eventDate.getDate();
            if (!map[day]) map[day] = [];
            map[day].push(event);
        }
    });

    return map;
  }, [events, currentDate]);

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-[#0a0a15]/50 border-r border-b border-white/10"></div>);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = eventsInMonth[day] || [];
      const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

      days.push(
        <div 
            key={day} 
            className={`relative h-24 md:h-32 border-r border-b border-white/10 p-2 transition-all hover:bg-white/5 group ${isToday ? 'bg-white/10' : ''}`}
        >
          <span className={`text-sm font-bold font-mono ${isToday ? 'text-white' : 'text-slate-500'}`}>{day < 10 ? `0${day}` : day}</span>
          
          <div className="mt-1 flex flex-col gap-1 overflow-y-auto max-h-[calc(100%-24px)] scrollbar-hide">
            {dayEvents.map(event => (
                <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`text-[9px] md:text-[10px] text-left px-1.5 py-0.5 w-full truncate font-bold uppercase tracking-wide border-l-2
                        ${event.type === 'tournament' ? 'border-[#38BDF8] text-[#38BDF8] bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20' : ''}
                        ${event.type === 'release' ? 'border-white text-white bg-white/10 hover:bg-white/20' : ''}
                        ${event.type === 'update' ? 'border-slate-400 text-slate-300 bg-slate-500/10 hover:bg-slate-500/20' : ''}
                        ${event.type === 'convention' ? 'border-purple-500 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20' : ''}
                    `}
                >
                    {event.name}
                </button>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
            <h2 className="text-4xl font-display font-black text-white mb-2 tracking-tighter uppercase">Operations <span className="text-slate-400">Calendar</span></h2>
            <p className="text-slate-500 font-mono text-xs tracking-widest">SYNCED TO REGIONAL SERVERS</p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#0a0a15] p-1 border border-white/20">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-48 text-center font-bold text-xl text-white font-display tracking-widest">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mb-6 text-[10px] font-bold uppercase tracking-widest font-mono">
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white"></span> Releases
          </div>
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#38BDF8]"></span> Tournaments
          </div>
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-500"></span> Updates
          </div>
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400"></span> Conventions
          </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#050510]/80 border-t border-l border-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="py-3 text-center text-xs font-bold text-white font-mono tracking-widest">
                    {day}
                </div>
            ))}
        </div>
        {/* Days Grid */}
        <div className="grid grid-cols-7">
            {renderCalendarDays()}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#050510] border border-white w-full max-w-md shadow-[0_0_50px_rgba(255,255,255,0.1)] relative"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)' }}
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-transparent"></div>
                
                <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border font-mono
                            ${selectedEvent.type === 'tournament' ? 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/50' : ''}
                            ${selectedEvent.type === 'release' ? 'bg-white/10 text-white border-white/50' : ''}
                            ${selectedEvent.type === 'update' ? 'bg-slate-500/10 text-slate-300 border-slate-500/50' : ''}
                            ${selectedEvent.type === 'convention' ? 'bg-purple-500/10 text-purple-400 border-purple-500/50' : ''}
                        `}>
                            {selectedEvent.type}
                        </span>
                        <span className="text-slate-400 text-xs font-mono">{selectedEvent.date}</span>
                    </div>

                    <h3 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tight">{selectedEvent.name}</h3>
                    
                    <p className="text-slate-300 leading-relaxed mb-8 text-sm border-l-2 border-white/20 pl-4">
                        {selectedEvent.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-white mb-8 font-mono bg-white/5 p-3 border border-white/10">
                        <MapPin className="w-4 h-4" />
                        LOCATION_DATA: {selectedEvent.location || 'ONLINE_SERVER'}
                    </div>

                    <div className="flex gap-3">
                        <Button className="w-full" onClick={() => setSelectedEvent(null)}>Close Data Log</Button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ReleaseCalendar;