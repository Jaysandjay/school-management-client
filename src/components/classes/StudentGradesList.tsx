import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getClassGrades } from '../../api/classes';
import { updateStudentGrade } from '../../api/students';
import type { StudentGrade } from '../../types/StudentGrade';

import BasicContainer from '../ui/BasicContainer';
import EmptyMessage from '../cards/EmptyMessage';
import PrimaryButton from '../ui/PrimaryButton';

interface StudentsGradesListProps {
  id: number;
}

export default function StudentsGradesList({ id }: StudentsGradesListProps) {
  const [editedGrades, setEditedGrades] = useState<Record<number, number>>({});
  const [gradeErrors, setGradeErrors] = useState<Record<number, string>>({});
  const [isEditing, setIsEdiiting] = useState(false);
  const queryClient = useQueryClient();

  const {
    data = []
  } = useQuery<StudentGrade[]>({
    queryKey: ['class-grades', id],
    queryFn: () => getClassGrades(id),
    enabled: !!id,
  });
  const saveGradesMutation = useMutation({
    mutationFn: (updates: { studentId: number; grade: number }[]) =>
      Promise.all(
        updates.map((u) => updateStudentGrade(u.studentId, id, u.grade)),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-grades', id] });
      setIsEdiiting(false);
    },
  });

  useEffect(() => {
    if (data.length === 0) return;
    if (Object.keys(editedGrades).length === 0) {
      const initial: Record<number, number> = {};
      data.forEach((s) => {
        initial[s.studentId] = s.grade;
      });
      setEditedGrades(initial);
    }
  }, [data]);

  const columns = ['First Name', 'Last Name', 'Grade'];

  const classAverage = useMemo(() => {
    if (!data.length) return 0;

    const grades = data
      .map((s) => {
        const raw = isEditing
          ? (editedGrades[s.studentId] ?? s.grade)
          : s.grade;

        return Number(raw);
      })
      .filter((g) => !isNaN(g));

    if (grades.length === 0) return 0;

    const total = grades.reduce((sum, g) => sum + g, 0);
    return Math.round((total / grades.length) * 100) / 100;
  }, [data, editedGrades, isEditing]);

  async function handleSave() {
    if (!data) return;
    if (Object.keys(gradeErrors).length > 0) {
      alert('Please fix invalid grades before saving.');
      return;
    }
    const updates = data
      .filter((s) => editedGrades[s.studentId] !== s.grade)
      .map((s) => ({
        studentId: s.studentId,
        grade: editedGrades[s.studentId],
      }));

    if (updates.length === 0) {
      setIsEdiiting(false);
      return;
    }
    try {
      await saveGradesMutation.mutateAsync(updates);
    } catch (err) {
      console.error('Error updating grades', err);
    }
  }

  function handleCancel() {
    setIsEdiiting(false);
    setEditedGrades(
      Object.fromEntries(data.map((s) => [s.studentId, s.grade])),
    );
  }

  function handleChangedgrade(
    e: ChangeEvent<HTMLInputElement>,
    student: StudentGrade,
  ) {
    const raw = e.target.value;
    if (raw === '') {
      setEditedGrades((prev) => ({
        ...prev,
        [student.studentId]: NaN,
      }));
      setGradeErrors((prev) => ({
        ...prev,
        [student.studentId]: 'Grade is required',
      }));
      return;
    }
    const value = Number(raw);

    setEditedGrades((prev) => ({
      ...prev,
      [student.studentId]: value,
    }));

    if (isNaN(value) || value < 0 || value > 100) {
      setGradeErrors((prev) => ({
        ...prev,
        [student.studentId]: 'Grade must be 0–100',
      }));
    } else {
      setGradeErrors((prev) => {
        const copy = { ...prev };
        delete copy[student.studentId];
        return copy;
      });
    }
  }

  return (
    <BasicContainer title="Student Grades" width="w-full" height="h-full">
      {data ? (
        <div className="min-h-0 flex flex-col h-full flex-1">
          <h2 className="mb-3">Class Average: {classAverage}</h2>
          <div
            className={`max-h-110 min-h-0 flex-1 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-sm`}
          >
            <table className="min-w-full h-full border-collapse">
              <thead className="bg-slate-100 sticky top-0 z-1">
                <tr>
                  {columns.map((col) => (
                    <th
                      className="px-4 py-3 text-left text-sm font-semibold text-slate-700"
                      key={String(col.length)}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {data.map((student) => (
                  <tr key={student.studentId} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {student.firstName}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {student.lastName}
                    </td>
                    {isEditing ? (
                      <td>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step={1}
                          value={
                            editedGrades[student.studentId] ?? student.grade
                          }
                          onChange={(e) => handleChangedgrade(e, student)}
                          className={`border-2 p-1 w-16 rounded ${
                            gradeErrors[student.studentId]
                              ? 'border-red-500'
                              : 'border-slate-300'
                          }`}
                        />
                        {gradeErrors[student.studentId] && (
                          <p className="text-xs text-red-600 mt-1">
                            {gradeErrors[student.studentId]}
                          </p>
                        )}
                      </td>
                    ) : (
                      <td className="px-4 py-3 text-sm text-slate-800">
                        {student.grade}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex justify-end">
            <div className="self-end flex gap-1">
              {isEditing ? (
                <>
                  <PrimaryButton
                    title={saveGradesMutation.isPending ? 'Saving...' : 'Save'}
                    onclick={() => handleSave()}
                    disabled={
                      saveGradesMutation.isPending ||
                      Object.keys(gradeErrors).length > 0
                    }
                  />
                  <PrimaryButton
                    title="cancel"
                    color="bg-red-600"
                    onclick={() => handleCancel()}
                  />
                </>
              ) : (
                <PrimaryButton
                  title="Edit"
                  onclick={() => setIsEdiiting(true)}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <EmptyMessage message="No Students" />
        </div>
      )}
    </BasicContainer>
  );
}
