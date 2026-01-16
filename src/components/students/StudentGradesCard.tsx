"use client"

import { getStudentGrades } from "../../api/students"
import BasicContainer from "../ui/BasicContainer"
import Table from "../ui/Table"
import type { StudentGrade } from "../../types/StudentGrade"
import { useQuery } from "@tanstack/react-query"

interface StudentGradesCardProps {
    studentId: number
}

export default function StudentGradesCard({studentId}: StudentGradesCardProps){

    const {data: studentGrades=[]} = useQuery<StudentGrade[]>({
        queryKey: ["student-grades", studentId],
        queryFn: () => getStudentGrades(studentId),
        enabled: !!studentId
    })

    const columns = [
        {key: "classId", label: "ID" },
        {key: "className", label: "Class" },
        {key: "grade", label: "Current Grade" },
    ] as const

    const total = studentGrades.reduce((sum, item) => sum + Number(item.grade), 0)
    const average = total / studentGrades.length
    

    return (
        <BasicContainer title="Grades" subtitle={`Average: ${average ? average : 0}%`}>
            <Table
            columns={columns}
            rows={studentGrades}
            idField={"classId"}
            maxHeight="max-h-50"
            searchBar={false}
            />

        </BasicContainer>
    )
}