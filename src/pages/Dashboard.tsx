import React from "react";
import StatsCard from "../components/ui/StatsCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <main className="min-h-0 overflow-y-auto flex flex-1 flex-col items-center gap-5">
        <h1 className="text-3xl font-bold">School Management System</h1>

        {/* Stats Cards */}
        <div className="flex flex-wrap justify-between w-full mb-2 items-center">
          <StatsCard title="Students" type="student" />
          <StatsCard title="Guardians" type="guardian" />
          <StatsCard title="Teachers" type="teacher" />
          <StatsCard title="Classes" type="class" />
        </div>
      </main>
    </div>
  );
}
