import { useQuery } from "@tanstack/react-query"
import Table from "../ui/Table"
import { fetchClasses } from "../../api/classes";
import type { CourseRecord } from "../../types/Course";
import LoadingSpinner from "../ui/LoadingSpinner"
import EmptyMessage from "../cards/EmptyMessage"



export default function ClassList() {

    const {data = [], isLoading, isError, error} = useQuery<CourseRecord[]>({
        queryKey:["classes"],
        queryFn: fetchClasses
    })
    const columns = [
            { key: "classId", label: "ID" },
            { key: "className", label: "Name" },
            { key: "gradeLevel", label: "Grade Level" },
            { key: "numStudents", label: "Enrolled"},
            { key: "capacity", label: "Capacity"},
            ] as const
    if(isLoading) return <LoadingSpinner/>
    
    console.log(data.length)
    return (
        <div className="min-h-0">
            {isError && <p>Error..</p>}

            {data.length != 0 ? (
                <Table
                columns={columns}
                rows={data}
                urls="/classes"
                idField="classId"
                />
            ):(
                <div>
                    <EmptyMessage message="No Classes"/>
                </div>

            )}
        </div>
    )
}