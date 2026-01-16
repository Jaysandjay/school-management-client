"use client"
import StudentDetailsForm from "../../components/forms/StudentDetailsForm"
import FormNavButtons from "../../components/navigation/FormNavButtons"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import type {Student} from "../../types/Student"
import { addStudent } from "../../api/students"
import LoadingSpinner from "../../components/ui/LoadingSpinner"

export default function StudentAdd(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addStudent,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["students"]})},
        onError:(err)=> console.error("Error adding student", err)
    })
    return(
        <div className="flex-col flex items-center justify-center w-full">
            <FormNavButtons/>
      
            <StudentDetailsForm
            title="Add Student"
            onSubmit={async (student: Student) => {
                await mutation.mutateAsync(student)
            }}
            successMessage={(s: Student) => `${s.firstName} ${s.lastName} has been registered`}
            />
            {mutation.isPending && <LoadingSpinner/> }
            {mutation.error && "Error Adding Student"}
        </div>
    )
}