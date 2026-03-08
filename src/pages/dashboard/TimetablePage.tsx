import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, MapPin, BookOpen } from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface TimetableEntry {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  venue: string | null;
  course: { code: string; title: string } | null;
}

export default function TimetablePage() {
  const { user, role } = useAuth();
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  useEffect(() => {
    fetchTimetable();
  }, [user, role]);

  const fetchTimetable = async () => {
    if (!user) return;
    setLoading(true);

    let courseIds: string[] = [];

    if (role === "student") {
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("course_id")
        .eq("student_id", user.id);
      courseIds = enrollments?.map((e) => e.course_id) || [];
    } else if (role === "lecturer") {
      const { data: courses } = await supabase
        .from("courses")
        .select("id")
        .eq("lecturer_id", user.id);
      courseIds = courses?.map((c) => c.id) || [];
    } else {
      // admin sees all
      const { data } = await supabase
        .from("timetable")
        .select("id, day_of_week, start_time, end_time, venue, course:courses(code, title)");
      setEntries((data as any) || []);
      setLoading(false);
      return;
    }

    if (courseIds.length === 0) {
      setEntries([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("timetable")
      .select("id, day_of_week, start_time, end_time, venue, course:courses(code, title)")
      .in("course_id", courseIds);

    setEntries((data as any) || []);
    setLoading(false);
  };

  const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour > 12 ? hour - 12 : hour || 12}:${m} ${ampm}`;
  };

  const dayEntries = entries
    .filter((e) => e.day_of_week === selectedDay)
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  const colors = [
    "border-l-primary bg-primary/5",
    "border-l-secondary bg-secondary/5",
    "border-l-accent bg-accent/5",
    "border-l-success bg-success/5",
    "border-l-destructive bg-destructive/5",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Timetable</h1>
        <p className="text-sm text-muted-foreground mt-1">Your weekly class schedule</p>
      </div>

      {/* Day selector */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl overflow-x-auto">
        {DAYS.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(i)}
            className={`flex-1 min-w-[48px] py-2.5 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              selectedDay === i
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{SHORT_DAYS[i]}</span>
          </button>
        ))}
      </div>

      {/* Schedule */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : dayEntries.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">No classes on {DAYS[selectedDay]}</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Enjoy your free time!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dayEntries.map((entry, idx) => (
            <div
              key={entry.id}
              className={`border-l-4 rounded-xl p-5 ${colors[idx % colors.length]} border border-border`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">
                    {entry.course?.code} — {entry.course?.title}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTime(entry.start_time)} – {formatTime(entry.end_time)}
                    </span>
                    {entry.venue && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {entry.venue}
                      </span>
                    )}
                  </div>
                </div>
                <BookOpen className="h-5 w-5 text-muted-foreground/30" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
