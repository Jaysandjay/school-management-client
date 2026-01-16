import { useState } from "react"
import BasicModalContainer from "./ui/BasicModalContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudent, removeStudentGuardian } from "../../api/students";
import PrimaryButton from "../ui/PrimaryButton";
import type { StudentRecord } from "../../types/Student";


interface RemoveStudentFromGuardianProps {
    guardianId: number,
    studentId: number,
    isOpen: boolean,
    onClose: () => void;
}

interface RemoveStudentVariables {
    studentId: number,
    guardianId: number
}

export default function RemoveStudentFromGuardianModal ({guardianId, studentId, isOpen, onClose}: RemoveStudentFromGuardianProps) {
    const [isSuccessfullyRemoved, setIsSuccessfullyRemoved] = useState(false)
    console.log(studentId)
    const queryClient = useQueryClient()

    const {data: student, isLoading, isError, error} = useQuery<StudentRecord>({
        queryKey: ["student", studentId],
        queryFn: ()=>getStudent(studentId),
        enabled: !!studentId
    })

    
    const mutation = useMutation({
    mutationFn: ({studentId, guardianId}: RemoveStudentVariables) => removeStudentGuardian(studentId, guardianId),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["guardian-students", guardianId]})
        }
    })
    
    async function removeStudent(){
        try {
            await mutation.mutateAsync({studentId: studentId, guardianId: guardianId})
            setIsSuccessfullyRemoved(true)
        }catch(err){
            console.error(err)
        }
    }
    
    if(!isOpen) return null
    return (
        <BasicModalContainer >
             {student ? (
            <>
            <h3>
                Remove {student.firstName} {student.lastName} 
            </h3>

            {isSuccessfullyRemoved ? (
                <h2>Student has been removed</h2>
            ) : (
                <h2>Are you sure you want to remove this student?</h2>
            )}

            <div>
                {isSuccessfullyRemoved ? (
                <PrimaryButton
                    title="Close"
                    color="bg-slate-500"
                    onclick={() => {
                        onClose()
                        setIsSuccessfullyRemoved(false)
                    }}
                />
                ) : (
                <>
                    <PrimaryButton
                    title="Cancel"
                    color="bg-slate-500"
                    onclick={onClose}
                
                    />
                    <PrimaryButton
                    title="Remove"
                    color="bg-red-600"
                    onclick={()=>removeStudent()}
                    />
                </>
                )}
            </div>
            </>
        ) : (
            <div>
                <h1>Error, Student not found</h1>
                <PrimaryButton title="Close" color="bg-red-600" onclick={onClose}/>
            </div>
        )}
        </BasicModalContainer>
    )
}