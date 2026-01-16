import { useQuery } from "@tanstack/react-query"
import Table from "../ui/Table"
import type { StudentRecord } from "../../types/Student"
import LoadingSpinner from "../ui/LoadingSpinner"
import { getGuardianStudents } from "../../api/guardians"
import EmptyMessage from "../cards/EmptyMessage"
import { useState } from "react"

interface GuardianAssignedStudentsProps {
    id: number
}

export default function GuardianAssignedStudentsList({id}: GuardianAssignedStudentsProps) {

    const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null)
    const [isRemovingStudent, setIsRemovingStudent] = useState(false)
    const {data: students=[], isLoading, isError, error} = useQuery<StudentRecord[]>({
        queryKey: ["student-guardians", id],
        queryFn: ()=>getGuardianStudents(id),
        enabled: !!id
    })
     if(isLoading) return <LoadingSpinner/>

    const columns = [
        {key: "studentId", label: "ID"},
        {key: "firstName", label: "First Name"},
        {key: "lastName", label: "Last Name"},
    ] as const

    return (
        <>
            {students.length !== 0 ? (
                <Table
                    columns={columns}
                    rows={students}
                    idField={"studentId"}
                    searchBar={false}
                    urls="/students"
                    checked={true}
                    addButtonColor="bg-red-600"
                    addButtonTitle="Remove"
                    addButtonOnClick={(row) => {
                    setSelectedStudent(row)
                    setIsRemovingStudent(true)

                }}
                />

            ):(
                <EmptyMessage message="No students assigned"/>
            )}

        </>
    )
}