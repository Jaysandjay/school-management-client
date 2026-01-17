import PageTitle from '../../components/ui/PageTitle';
import StudentList from '../../components/students/StudentList';

export default function StudentsRecords() {
  return (
    <div className="flex flex-col h-full">
      <PageTitle title="Student Records" />

      <StudentList />
    </div>
  );
}
