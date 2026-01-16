import PageTitle from "../../components/ui/PageTitle"
import ClassList from "../../components/classes/ClassList"

export default function ClassesRecords() {

    return (
        <div className="flex flex-col h-full">
            <PageTitle title="Class Records"/>

            <ClassList/>
            
        </div>
    )
}