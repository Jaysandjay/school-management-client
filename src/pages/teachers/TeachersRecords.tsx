import { useQuery } from "@tanstack/react-query";
import { fetchTeachers } from "../../api/teachers";
import PageTitle from "../../components/ui/PageTitle";
import TeacherList from "../../components/teachers/TeacherList";


export default function TeachersRecords() {

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["teachers"],
        queryFn: fetchTeachers
    })
    const columns = [
            { key: "teacherId", label: "ID" },
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            ]
        

    return (
        <div className="flex flex-col h-full">
            <PageTitle title="Teacher Records"/>
            {isError && <p>Error..</p>}
            {isLoading ? <p>Loading...</p>:

            <TeacherList/>
            }
        </div>
    )
}