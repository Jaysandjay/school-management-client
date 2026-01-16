"use client"

import BasicContainer from "../ui/BasicContainer"
import { useState } from "react"
import PrimaryButton from "../ui/PrimaryButton"
import StudentList from "../students/StudentList"

interface EnrollStudentsToClassCardProps {
    id: number
}

export default function EnrollStudentsToClassCard({id}: EnrollStudentsToClassCardProps){
    const [isViewingAssignableStudents, setIsViewingAssignableStudents] = useState(false)
   
    return (
        <div>
        <BasicContainer title="Enrolled Students" width="w-full">
            {isViewingAssignableStudents ? 
            <StudentList id={id} context="enrollment-assignable" emptyMessage="No assignable Students"/>
            : 
            <StudentList id={id} context="enrollment-assigned" emptyMessage="No assigned Students" buttonColor="bg-red-600" buttonTitle="Remove"/>
            }

            <div className="mt-5 w-full flex justify-end">
                {isViewingAssignableStudents ? (
                    <PrimaryButton title="Cancel" color="bg-red-600" onclick={() => setIsViewingAssignableStudents(!isViewingAssignableStudents)}/>
                ):(
                    <PrimaryButton title="Enroll Student" onclick={ ()=> setIsViewingAssignableStudents(!isViewingAssignableStudents)}/>
                )}
            </div>
        </BasicContainer>
        </div>
    )
}