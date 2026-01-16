export interface Guardian {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    addressId?: number
}
export interface GuardianRecord extends Guardian {
    guardianId: number
}