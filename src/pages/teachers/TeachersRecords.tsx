
import PageTitle from '../../components/ui/PageTitle';
import TeacherList from '../../components/teachers/TeacherList';

export default function TeachersRecords() {

  return (
    <div className="flex flex-col h-full">
      <PageTitle title="Teacher Records" />
     <TeacherList />
    </div>
  );
}
