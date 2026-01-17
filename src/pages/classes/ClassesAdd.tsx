import { addclass } from '../../api/classes';
import type { Course } from '../../types/Course';

import ClassDetailsForm from '../../components/forms/ClassDetailsForm';
import FormNavButtons from '../../components/navigation/FormNavButtons';

export default function ClassesAdd() {
  return (
    <div className="flex-col flex items-center">
      <FormNavButtons />

      <ClassDetailsForm
        title="Add Class"
        onSubmit={addclass}
        successMessage={(c: Course) => `${c.className} created`}
      />
    </div>
  );
}
