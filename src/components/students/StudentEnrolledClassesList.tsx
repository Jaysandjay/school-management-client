import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAvailableStudentClasses, getStudentClasses } from "../../api/students";
import type { CourseRecord } from "../../types/Course";

import LoadingSpinner from "../ui/LoadingSpinner";
import Table from "../ui/Table";
import UnenrollStudentModal from "../modals/UnenrollStudentModal";
import EnrollStudentModal from "../modals/EnrollStudentModal";


interface StudentEnrolledClassesListProps {
    studentId: number
    enrolled: boolean,
    emptyMessage: string
    checked?: boolean
}

export default function StudentEnrolledClassesList({checked, emptyMessage, studentId, enrolled}: StudentEnrolledClassesListProps){
    const [isRemovingClass, setIsRemovingClass] = useState(false)
    const [selectedClass, setSelectedClass] = useState<CourseRecord | null>(null)

    const {data: classes = [], isLoading, isError, error} = useQuery<CourseRecord[]>({
        queryKey: ["student-classes", studentId, enrolled ? "enrolled" : "available"],
        queryFn: ()=>
            enrolled ?
            getStudentClasses(studentId) 
            : getAvailableStudentClasses(studentId),
        enabled: !!studentId
    })

    if(isLoading) return <LoadingSpinner/>

    const columns = [
        { key: "classId", label: "ID" },
        { key: "className", label: "Name" },
        { key: "gradeLevel", label: "Grade Level"},
        { key: "numStudents", label: "Students Registered"},
        { key: "capacity", label: "Capacity"},
    ] as const


    

    return (
        <>
        {isError && <p>Error..</p>}
            {classes.length !== 0? (
                <Table
                columns={columns}
                rows={classes}
                urls="/classes"
                idField="classId"
                addButtonOnClick={(row) => {
                    setSelectedClass(row)
                    setIsRemovingClass(true)

                }}
                addButtonColor={enrolled? "bg-red-600": "bg-green-600"}
                addButtonTitle={enrolled? "Remove": "Enroll"}
                checked={checked}
                />          
            ):
            <div className="w-full flex justify-center h-5 items-center">
                <h3 className="text-red-600">{emptyMessage}</h3>
            </div>
        }
        {selectedClass && enrolled &&
            <UnenrollStudentModal
            isOpen={isRemovingClass}
            studentId={studentId}
            classId={selectedClass.classId}
            onClose={() => setIsRemovingClass(false)}
            type="student"
            />        
        }
        {selectedClass && !enrolled &&
            <EnrollStudentModal
            isOpen={isRemovingClass}
            studentId={studentId}
            classId={selectedClass.classId}
            onClose={() => setIsRemovingClass(false)}
            type="student"
            />        
        }
        </>


 
    )
}