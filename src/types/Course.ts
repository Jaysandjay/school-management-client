
export interface Course {
    className: string,
    gradeLevel: number,
    capacity: number,
    numStudents?: number,
    teacherId?: number
}

export interface CourseRecord extends Course {
    classId: number
}