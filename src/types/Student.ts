
export interface Student {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gradeLevel: number,
    addressId?: number
}

export interface StudentRecord extends Student {
    studentId: number
}