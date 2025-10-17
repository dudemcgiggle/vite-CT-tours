import { useState, useEffect, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, getDay, addMonths, subMonths } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Users, Clock, MapPin, AlertCircle, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Types for calendar data
type RawMonth = { 
  month: string; 
  events: RawEvent[] 
};

type RawEvent = {
  date_human: string;
  date_iso: string;     // e.g., "2025-08-20"
  time_24h: string;     // "09:00" or "10:15"
  time_label: string;   // "9:00 AM"
  tour_name: string;
  duration_hours: number;
  status: "Available" | "Sold Out";
  spots_left: number | null;
  waitlist: boolean;
};

type TourEvent = {
  id: string;           // stable key
  dateISO: string;      // "2025-08-20"
  startTime24h: string; // "09:00"
  start: Date;          // combined Date in local tz
  tour: string;
  durationHours: number;
  status: "AVAILABLE" | "SOLD_OUT";
  spotsLeft: number | null; // null = unknown
  waitlistOpen: boolean;
};

type CalendarDay = {
  date: Date;
  dateISO: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: TourEvent[];
};

// Utility function to create a slug from tour name
function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Fetch calendar data from JSON file
async function fetchCalendarData(): Promise<any> {
  try {
    const response = await fetch('/api/calendar-data');
    if (!response.ok) throw new Error('Failed to fetch calendar data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return null;
  }
}

// Normalize raw events into TourEvent format
function normalizeEvents(rawJson: any): TourEvent[] {
  if (!rawJson || !rawJson.months) return [];
  
  const events: TourEvent[] = [];
  
  for (const month of rawJson.months) {
    if (!month.events) continue;
    
    for (const rawEvent of month.events) {
      // Build stable ID
      const id = `${slugify(rawEvent.tour_name)}|${rawEvent.date_iso}|${rawEvent.time_24h}`;
      
      // Parse date and time
      const dateTimeStr = `${rawEvent.date_iso}T${rawEvent.time_24h}:00`;
      const start = new Date(dateTimeStr);
      
      // Normalize status
      const status = rawEvent.status === "Sold Out" ? "SOLD_OUT" : "AVAILABLE";
      
      // Clamp spots_left to prevent negative numbers
      let spotsLeft = rawEvent.spots_left;
      if (typeof spotsLeft === 'number' && spotsLeft < 0) {
        spotsLeft = 0;
      }
      
      events.push({
        id,
        dateISO: rawEvent.date_iso,
        startTime24h: rawEvent.time_24h,
        start,
        tour: rawEvent.tour_name,
        durationHours: rawEvent.duration_hours || 0,
        status,
        spotsLeft,
        waitlistOpen: rawEvent.waitlist || false
      });
    }
  }
  
  return events;
}

// Merge duplicate events (same tour, date, time)
function mergeDuplicates(events: TourEvent[]): TourEvent[] {
  const merged = new Map<string, TourEvent>();
  
  for (const event of events) {
    const key = event.id;
    
    if (!merged.has(key)) {
      merged.set(key, { ...event });
    } else {
      const existing = merged.get(key)!;
      
      // Merge logic: SOLD_OUT takes precedence
      if (event.status === "SOLD_OUT") {
        existing.status = "SOLD_OUT";
      }
      
      // Waitlist: true if any duplicate has it
      if (event.waitlistOpen) {
        existing.waitlistOpen = true;
      }
      
      // Spots left: prefer maximum non-null value
      if (event.spotsLeft !== null) {
        if (existing.spotsLeft === null || event.spotsLeft > existing.spotsLeft) {
          existing.spotsLeft = event.spotsLeft;
        }
      }
    }
  }
  
  return Array.from(merged.values());
}

// Group events by date
function groupByDate(events: TourEvent[]): Map<string, TourEvent[]> {
  const grouped = new Map<string, TourEvent[]>();
  
  for (const event of events) {
    if (!grouped.has(event.dateISO)) {
      grouped.set(event.dateISO, []);
    }
    grouped.get(event.dateISO)!.push(event);
  }
  
  // Sort events within each day by start time
  for (const [date, dayEvents] of Array.from(grouped.entries())) {
    dayEvents.sort((a: TourEvent, b: TourEvent) => a.startTime24h.localeCompare(b.startTime24h));
  }
  
  return grouped;
}

// Get calendar days for a month
function getDaysForMonth(monthDate: Date): CalendarDay[] {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const days = eachDayOfInterval({ start, end });
  
  // Add padding days from previous month
  const startDayOfWeek = getDay(start);
  const paddingDays: Date[] = [];
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    paddingDays.push(new Date(start.getFullYear(), start.getMonth(), -i));
  }
  
  // Add padding days from next month
  const endDayOfWeek = getDay(end);
  const trailingDays: Date[] = [];
  for (let i = 1; i <= (6 - endDayOfWeek); i++) {
    trailingDays.push(new Date(end.getFullYear(), end.getMonth() + 1, i));
  }
  
  const allDays = [...paddingDays, ...days, ...trailingDays];
  
  return allDays.map(date => ({
    date,
    dateISO: format(date, 'yyyy-MM-dd'),
    isCurrentMonth: isSameMonth(date, monthDate),
    isToday: isToday(date),
    events: []
  }));
}

// Find next available tour
function findNextAvailable(events: TourEvent[], tourName: string, fromDateISO: string): TourEvent | null {
  const futureEvents = events
    .filter(e => e.tour === tourName && e.dateISO > fromDateISO && e.status === "AVAILABLE")
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  
  return futureEvents[0] || null;
}

// Main Calendar Component
export default function TourCalendar() {
  const [visibleMonth, setVisibleMonth] = useState(new Date(2025, 7, 1)); // August 2025
  const [allEvents, setAllEvents] = useState<TourEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TourEvent | null>(null);
  const [filters, setFilters] = useState({
    tourNames: [] as string[],
    showOnlyWithSeats: false
  });
  
  // Load calendar data
  useEffect(() => {
    fetchCalendarData().then(data => {
      if (data) {
        const normalized = normalizeEvents(data);
        const merged = mergeDuplicates(normalized);
        setAllEvents(merged);
      }
    });
  }, []);
  
  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    let events = [...allEvents];
    
    if (filters.tourNames.length > 0) {
      events = events.filter(e => filters.tourNames.includes(e.tour));
    }
    
    if (filters.showOnlyWithSeats) {
      events = events.filter(e => e.status === "AVAILABLE" && e.spotsLeft !== 0);
    }
    
    return events;
  }, [allEvents, filters]);
  
  // Group filtered events by date
  const eventsByDate = useMemo(() => {
    return groupByDate(filteredEvents);
  }, [filteredEvents]);
  
  // Get unique tour names for filter
  const uniqueTourNames = useMemo(() => {
    return Array.from(new Set(allEvents.map(e => e.tour))).sort();
  }, [allEvents]);
  
  // Get calendar days with events
  const calendarDays = useMemo(() => {
    const days = getDaysForMonth(visibleMonth);
    
    // Attach events to each day
    for (const day of days) {
      day.events = eventsByDate.get(day.dateISO) || [];
    }
    
    return days;
  }, [visibleMonth, eventsByDate]);
  
  // Get rollup for a specific day
  function getDayRollup(dateISO: string) {
    const events = eventsByDate.get(dateISO) || [];
    return {
      total: events.length,
      available: events.filter(e => e.status === "AVAILABLE").length,
      soldOut: events.filter(e => e.status === "SOLD_OUT").length,
      waitlistOpen: events.some(e => e.waitlistOpen)
    };
  }
  
  // Handle day click
  function handleDayClick(dateISO: string) {
    const events = eventsByDate.get(dateISO);
    if (events && events.length > 0) {
      setSelectedDay(dateISO);
      setSelectedEvent(null);
    }
  }
  
  // Handle month navigation
  function navigateMonth(direction: 'prev' | 'next') {
    setVisibleMonth(current => 
      direction === 'next' ? addMonths(current, 1) : subMonths(current, 1)
    );
  }
  
  // Toggle tour name filter
  function toggleTourFilter(tourName: string) {
    setFilters(prev => ({
      ...prev,
      tourNames: prev.tourNames.includes(tourName)
        ? prev.tourNames.filter(t => t !== tourName)
        : [...prev.tourNames, tourName]
    }));
  }
  
  const selectedDayEvents = selectedDay ? (eventsByDate.get(selectedDay) || []) : [];

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tour Calendar
            </CardTitle>
            
            {/* Month Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="min-w-[140px] text-center font-semibold">
                {format(visibleMonth, 'MMMM yyyy')}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {uniqueTourNames.map(tourName => (
                <Label key={tourName} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.tourNames.includes(tourName)}
                    onCheckedChange={() => toggleTourFilter(tourName)}
                  />
                  <span className="text-sm">{tourName}</span>
                </Label>
              ))}
            </div>
            
            <Label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.showOnlyWithSeats}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, showOnlyWithSeats: !!checked }))
                }
              />
              <span className="text-sm">Show only dates with available seats</span>
            </Label>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, idx) => {
              const rollup = getDayRollup(day.dateISO);
              const hasEvents = rollup.total > 0;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleDayClick(day.dateISO)}
                  disabled={!hasEvents}
                  className={cn(
                    "relative min-h-[60px] p-1 border rounded-md transition-colors",
                    "hover:bg-gray-50 dark:hover:bg-gray-800",
                    !day.isCurrentMonth && "opacity-40",
                    day.isToday && "ring-2 ring-teal-500",
                    !hasEvents && "cursor-default",
                    hasEvents && "cursor-pointer"
                  )}
                  aria-label={`${format(day.date, 'EEEE, MMMM d, yyyy')}. ${rollup.total} tours. ${rollup.available} available.`}
                >
                  <div className="text-sm">{format(day.date, 'd')}</div>
                  
                  {/* Event indicators */}
                  {hasEvents && (
                    <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-1">
                      {rollup.available > 0 && (
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                      {rollup.soldOut > 0 && (
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                      {rollup.waitlistOpen && (
                        <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Sold Out</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              <span>Waitlist</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Day Details Modal */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Tours on {selectedDay && format(new Date(selectedDay), 'EEEE, MMMM d, yyyy')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedDayEvents.map(event => (
              <Card 
                key={event.id} 
                className={cn(
                  "cursor-pointer transition-colors",
                  "hover:bg-gray-50 dark:hover:bg-gray-800",
                  selectedEvent?.id === event.id && "ring-2 ring-teal-500"
                )}
                onClick={() => setSelectedEvent(event)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{event.tour}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(event.start, 'h:mm a')}
                        </span>
                        <span>{event.durationHours} hours</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {event.status === "SOLD_OUT" ? (
                        <Badge variant="destructive">Sold Out</Badge>
                      ) : event.spotsLeft !== null && event.spotsLeft <= 5 ? (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          {event.spotsLeft} spots left
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Available
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded details when selected */}
                  {selectedEvent?.id === event.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="text-sm space-y-2">
                        {event.spotsLeft !== null ? (
                          <p>{event.spotsLeft} spots remaining</p>
                        ) : (
                          <p>Availability updated frequently</p>
                        )}
                        
                        {event.waitlistOpen && (
                          <p className="text-amber-600">Waitlist available</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {event.status === "SOLD_OUT" ? (
                          <>
                            {event.waitlistOpen && (
                              <Button variant="default" size="sm">
                                Join Waitlist
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                const next = findNextAvailable(allEvents, event.tour, event.dateISO);
                                if (next) {
                                  setSelectedDay(next.dateISO);
                                  setSelectedEvent(next);
                                }
                              }}
                            >
                              See Next Date
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="default" size="sm" className="text-navy-900">
                              Book Now
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                const next = findNextAvailable(allEvents, event.tour, event.dateISO);
                                if (next) {
                                  setSelectedDay(next.dateISO);
                                  setSelectedEvent(next);
                                }
                              }}
                            >
                              See Next Date
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {selectedDayEvents.length === 0 && (
              <p className="text-center text-gray-500">No tours scheduled for this day.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}