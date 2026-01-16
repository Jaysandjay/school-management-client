import BasicContainer from "../ui/BasicContainer"
import { useState } from "react"
import PrimaryButton from "../ui/PrimaryButton"
import StudentList from "../students/StudentList"
import GuardianStudentList from "./GuardianStudentList"

interface AssignedStudentsToGuardianCardProps {
    id: number
}

export default function AssignedStudentsToGuardianCard({id}: AssignedStudentsToGuardianCardProps){
    const [isViewingAssignableStudents, setIsViewingAssignableStudents] = useState(false)
   
    return (
        <div>
        <BasicContainer title="Assigned Students" width="w-full">
            {isViewingAssignableStudents ? 
            <StudentList id={id} context="guardian" emptyMessage="No assignable Students"/>
            : 
            <GuardianStudentList id={id}/>
            }

            <div className="mt-5 w-full flex justify-end">
                {isViewingAssignableStudents ? (
                    <PrimaryButton title="Cancel" color="bg-red-600" onclick={() => setIsViewingAssignableStudents(!isViewingAssignableStudents)}/>
                ):(
                    <PrimaryButton title="Assign Student" onclick={ ()=> setIsViewingAssignableStudents(!isViewingAssignableStudents)}/>
                )}
            </div>
        </BasicContainer>
        </div>
    )
}