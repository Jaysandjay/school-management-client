import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; 
import { getClass } from "../../api/classes";
import type { CourseRecord } from "../../types/Course";

import PageTitle from "../../components/ui/PageTitle";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BasicInfoCard from "../../components/cards/BasicInfoCard";
import AssignTeacherCard from "../../components/classes/AssignTeacherCard";
import ClassTeacherCard from "../../components/classes/ClassTeacherCard";
import EnrollStudentsToClassCard from "../../components/classes/EnrollStudentToClassCard";
import StudentsGradesList from "../../components/classes/StudentGradesList";
import RemoveButton from "../../components/RemoveButton";


export default function ClassPage(){
    const params = useParams()
    const id = Number(params?.id)
    
    const {data: course, isLoading, isError, error} = useQuery<CourseRecord>({
        queryKey: ["class", id],
        queryFn: ()=>getClass(id),
        enabled: !!id
    })

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!course) return <p>No student found</p>

    return(
        <div className="flex flex-col h-full">
            <div className="flex justify-between w-full mb-2 items-center">
                <PageTitle title={`Class: ${course.className}`}/>
                <RemoveButton id={id} type="class"/>
            </div>
        
            <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
                <div className="w-full flex justify-around gap-1">
                    <BasicInfoCard id={id} type="class"/>
                    <ClassTeacherCard id={id}/>
                </div>
                <div className="w-full flex gap-4">
                    <div className="flex-2 min-w-0 h-full">
                        <StudentsGradesList id={id}/>
                    </div>
                <EnrollStudentsToClassCard id={id}/>
                </div>
                <AssignTeacherCard id={id}/>



            </main>
        </div>
    )

}

