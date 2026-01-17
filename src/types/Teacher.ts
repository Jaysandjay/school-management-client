export interface Teacher {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressId?: number;
}

export interface TeacherRecord extends Teacher {
  teacherId: number;
}
