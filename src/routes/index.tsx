import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCards } from "@/components/dashboard/StatCards";
import { ExamResultsChart } from "@/components/dashboard/ExamResultsChart";
import { StudentsDonut } from "@/components/dashboard/StudentsDonut";
import { StarStudents } from "@/components/dashboard/StarStudents";
import { ActivityList } from "@/components/dashboard/ActivityList";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spik Admin Dashboard - School Management Overview" },
      {
        name: "description",
        content:
          "Spik school admin dashboard with student, teacher and parent stats, exam result charts, star students and activity updates.",
      },
      { property: "og:title", content: "Spik Admin Dashboard - School Management Overview" },
      {
        property: "og:description",
        content:
          "Track students, teachers, earnings and exam results in one clean school management dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page-gradient p-0 lg:p-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] overflow-hidden bg-card lg:min-h-[calc(100vh-4rem)] lg:rounded-3xl lg:shadow-shell">
        <div className="hidden border-r border-border/70 lg:block">
          <Sidebar />
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              aria-label="Close menu overlay"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-foreground/40"
            />
            <div className="absolute inset-y-0 left-0 shadow-shell">
              <Sidebar onClose={() => setMenuOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenu={() => setMenuOpen(true)} />

          <main className="flex-1 space-y-5 overflow-y-auto bg-background p-4 sm:p-6 lg:p-7">
            <StatCards />

            <div className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <ExamResultsChart />
              <StudentsDonut />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <StarStudents />
              <ActivityList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
