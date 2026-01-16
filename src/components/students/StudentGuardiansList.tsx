import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getStudentGuardians } from "../../api/students";
import type { StudentGuardianView } from "../../types/StudentGuardianView";

import LoadingSpinner from "../ui/LoadingSpinner";
import Table from "../ui/Table";
import EmptyMessage from "../cards/EmptyMessage";
import RemoveGuardianFromStudentModal from "../modals/RemoveGuardianFromStudentModal";


interface StudentGuardianListProps {
    id: number
}

export default function StudentGuardiansList({id}: StudentGuardianListProps){
    const [isRemovingGuardian, setIsRemovingGuardian] = useState(false)
    const [selectedGuardian, setSelectedGuardian] = useState<StudentGuardianView | null>(null)


    const {data: studentGuardians = [], isLoading, isError, error} = useQuery<StudentGuardianView[]>({
        queryKey: ["student-guardians", id],
        queryFn: ()=>getStudentGuardians(Number(id)),
        enabled: !!id
    })

    if(isLoading) return <LoadingSpinner/>

       const studentGuardianscolumns = [
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "relationship", label: "Relationship"},
        ] as const

    

    return (
        <>
        {isError && <p>Error..</p>}
            {studentGuardians.length !== 0? (
                <Table
                columns={studentGuardianscolumns}
                rows={studentGuardians}
                urls="/guardians"
                idField="guardianId"
                addButtonOnClick={(row) => {
                    setSelectedGuardian(row)
                    setIsRemovingGuardian(true)

                }}
                addButtonColor="bg-red-600"
                addButtonTitle="Remove"
                checked={true}
                searchBar={false}
                />          
            ):
            <EmptyMessage message="No guardians assigned"/>
    
        }
        {selectedGuardian && 
            <RemoveGuardianFromStudentModal
            isOpen={isRemovingGuardian}
            guardianRelation={selectedGuardian}
            onClose={() => setIsRemovingGuardian(false)}
            />        
        }
        </>


 
    )
}