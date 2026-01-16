import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { fetchClasses } from "../../api/classes";
import { fetchStudents } from "../../api/students";
import { fetchTeachers } from "../../api/teachers";
import { fetchGuardians } from "../../api/guardians";

import PrimaryButton from "./PrimaryButton";

interface StatCardProps {
  title: string;
  type: "student" | "teacher" | "guardian" | "class";
}

export default function StatsCard({ title, type }: StatCardProps) {
  const navigate = useNavigate();

  function getQueryFn() {
    switch (type) {
      case "student":
        return fetchStudents;
      case "teacher":
        return fetchTeachers;
      case "guardian":
        return fetchGuardians;
      case "class":
        return fetchClasses;
    }
  }

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: [type === "class" ? "classes" : type + "s"],
    queryFn: getQueryFn(),
  });

  function pushRoute() {
    if (type === "class") {
      navigate("/classes");
    } else {
      navigate(`/${type}s`);
    }
  }

  function getAmountType() {
    switch (type) {
      case "student":
        return "Enrolled:";
      case "teacher":
        return "Employed:";
      case "guardian":
        return "Registered:";
      case "class":
        return "Available:";
    }
  }

  return (
    <div className="min-w-100 min-h-50 m-5 bg-blue-100 shadow-lg p-4 rounded flex flex-col items-center gap-4">
      <h2 className="text-2xl text-black font-bold">{title}</h2>
      <div className="flex items-center gap-1">
        <h2 className="text-xl">{getAmountType()}</h2>
        <p className="text-2xl text-purple-600">{data.length}</p>
      </div>
      <PrimaryButton
        onclick={() =>
          pushRoute()
        }
        title={`View ${
          type === "class"
            ? "Classes"
            : type.charAt(0).toUpperCase() + type.slice(1) + "s"
        }`}
      />
    </div>
  );
}
