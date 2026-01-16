import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; 
import { getTeacher } from "../../api/teachers";

import PageTitle from "../../components/ui/PageTitle";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import AddressCard from "../../components/cards/AddressCard";
import BasicInfoCard from "../../components/cards/BasicInfoCard";
import TeacherClassesCard from "../../components/teachers/TeacherClassesCard";
import RemoveButton from "../../components/RemoveButton";



export default function TeacherDetails(){

    const params = useParams()
    const id = Number(params?.id)
    const {data: teacher, isLoading, isError, error} = useQuery({
        queryKey: ["teacher", id],
        queryFn: () => getTeacher(Number(id)),
        enabled: !!id
    })
 
    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!teacher) return <p>No student found</p>


    return (
        <div className="flex-col flex h-full">
            <div className="flex justify-between w-full mb-2 items-center">
                <PageTitle title={`Teacher: ${teacher.firstName} ${teacher.lastName}`}/>
                <RemoveButton id={id} type="teacher"/>
            </div>
            <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
                <div className="w-full flex justify-around gap-1">
                    <BasicInfoCard id={id} type="teacher"/>
                    <AddressCard id={id} personType="teacher"/>
                </div>
                <TeacherClassesCard id={id}/>
                             
           
            </main>
        </div>
    )
}