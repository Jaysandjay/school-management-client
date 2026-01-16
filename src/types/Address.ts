export interface Address {
    street: string,
    city: string,
    province: string,
    postalCode: string
}

export interface AddressRecord extends Address {
    addressId: number
}