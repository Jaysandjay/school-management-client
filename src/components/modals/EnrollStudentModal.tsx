import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { enrollStudent, getStudent } from "../../api/students";
import { getClass } from "../../api/classes";

import type { CourseRecord } from "../../types/Course";
import type { StudentRecord } from "../../types/Student";

import BasicModalContainer from "./ui/BasicModalContainer";
import PrimaryButton from "../ui/PrimaryButton";


interface EnrollStudentModalProps {
    classId: number,
    studentId: number,
    isOpen: boolean,
    onClose: () => void;
    type: "student" | "class"
}

interface EnrollVariables {
    studentId: number,
    classId: number
}

export default function EnrollStudentModal ({type, classId, studentId, isOpen, onClose}: EnrollStudentModalProps) {
    const [isSuccessfullyRemoved, setIsSuccessfullyRemoved] = useState(false)
    const queryClient = useQueryClient()

     function getQueryKey(){
            switch(type){
                case "student": {
                    queryClient.invalidateQueries({queryKey: ["student-classes", studentId, "enrolled"]}),
                    queryClient.invalidateQueries({queryKey: ["student-classes", studentId, "available"]})
                    queryClient.invalidateQueries({queryKey: ["student-grades", studentId]})                    
                }
                break
                case "class": {
                    queryClient.invalidateQueries({queryKey: ["class-students", classId, "enrolled"]}),
                    queryClient.invalidateQueries({queryKey: ["class-students", classId, "available"]})
                    queryClient.invalidateQueries({queryKey: ["class-grades", classId]})
                }
                break
            }
    }

    const {data: course} = useQuery<CourseRecord>({
        queryKey: ["class", classId],
        queryFn: ()=>getClass(classId),
        enabled: !!classId
    })

    const {data: student} = useQuery<StudentRecord>({
        queryKey: ["student", classId],
        queryFn: ()=>getStudent(studentId),
        enabled: !!studentId
    })

    
    const mutation = useMutation({
    mutationFn: ({studentId, classId}: EnrollVariables) => enrollStudent(studentId, classId),
    onSuccess: () => getQueryKey()
    })
    
    async function enroll(){
        try {
            await mutation.mutateAsync({studentId: studentId, classId: classId})
            setIsSuccessfullyRemoved(true)
        }catch(err){
            console.error(err)
        }
    }
    
    if(!isOpen) return null

    return (
        <BasicModalContainer >
             {course ? (
            <>

            {isSuccessfullyRemoved ? (
                <h2>Successfully enrolled!</h2>
            ) : (
                <h2>Are you sure you want to enroll {student?.firstName} {student?.lastName} in {course.className} ?</h2>
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
                    title="Enroll"
                    color="bg-green-600"
                    onclick={enroll}
                    />
                </>
                )}
            </div>
            </>
        ) : (
            <div>
                <h1>Error, not found</h1>
                <PrimaryButton
                    title="Cancel"
                    color="bg-slate-500"
                    onclick={onClose}
                    />

            </div>
        )}
        </BasicModalContainer>
    )
}