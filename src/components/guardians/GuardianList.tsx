import { useQuery } from "@tanstack/react-query"
import Table from "../ui/Table"
import { fetchGuardians } from "../../api/guardians"
import LoadingSpinner from "../ui/LoadingSpinner"
import { useState } from "react"
import type { GuardianRecord } from "../../types/Guardian"
import { getAvailableStudentGuardians } from "../../api/students"
import EmptyMessage from "../cards/EmptyMessage"
import AssignGuardianToStudentModal from "../modals/AssignGuardianToStudentModal"

interface GuradianListProps {
    studentId?: number,
}

export default function GuardianList({studentId}: GuradianListProps) {
    const [isAssigningGuardian, setIsAssigningGuardian] = useState(false)
    const [selectedGuardian, setSelectedGuardian] = useState<GuardianRecord | null>(null)
    const {data: guardians = [], isLoading, isError, error} = useQuery<GuardianRecord[]>({
        queryKey: studentId 
        ? ["student-guardians", studentId] 
        : ["guardians"],
        queryFn: () =>
            studentId
                ? getAvailableStudentGuardians(studentId)
                : fetchGuardians(),
    })

    const columns = [
            { key: "guardianId", label: "ID" },
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            ] as const


    return (
        <div>
            {isError && <p>Error..</p>}
            {isLoading ? <LoadingSpinner/>:

            guardians.length !== 0? (
                <Table
                columns={columns}
                rows={guardians}
                urls="/guardians"
                idField="guardianId"
                addButtonOnClick={(row)=>{
                        setSelectedGuardian(row)
                        setIsAssigningGuardian(true)
                        }}
                addButtonTitle="Assign"
                />

            ): (
                <EmptyMessage message="No registered Guardians"/>
            )}
            {selectedGuardian && studentId &&
                <AssignGuardianToStudentModal 
                isOpen={isAssigningGuardian} guardian={selectedGuardian} 
                studentId={studentId} 
                onClose={()=>setIsAssigningGuardian(false)}/>
            }

        </div>
    )
}