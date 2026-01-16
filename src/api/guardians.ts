import type { Address } from "../types/Address";
import type { Guardian } from "../types/Guardian";

const API_URL = import.meta.env.VITE_API_URL;


export async function fetchGuardians() {
    console.log("Fetching guardians....")
    const res = await(fetch(`${API_URL}/guardians`))
    if (!res.ok) throw new Error("Failed to fetch students")
    const guardians = await res.json()

    console.log(guardians)
    return guardians
}

export async function getGuardian(guardianId: number){
    console.log("Getting Guardian....")
    const res = await fetch(`${API_URL}/guardians/${guardianId}`)
    if(!res.ok) throw new Error("Error getting guardian")
        const guardian = await res.json()    
    console.log("Guardian:", guardian)
    return guardian
}

export async function updateGuardian(guardianId: number, updatedGuardian: Guardian){
    console.log("Updating Guardian....")
    const res = await fetch(`${API_URL}/guardiand/${guardianId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updateGuardian)
    })
    if(!res.ok) throw new Error("Error updating guardian")
    console.log(`Guardian ${guardianId} updated:`, updateGuardian)
}

export async function addGuardian(guardian: Guardian) {
    console.log("Adding Guardian....")
    const res = await fetch(`${API_URL}/guardians`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(guardian)
    })
    if(!res.ok) throw new Error("Error adding guardian")
    console.log("Guardian Added", guardian)
}

export async function getGuardianAddress(guardianId: number){
    console.log("Getting Guardian Address....")
    const res = await fetch(`${API_URL}/guardians/${guardianId}/address`)
    if(!res.ok) throw new Error("Error getting guardian address")
    const address = await res.json()
    return address
}

export async function updateGuardianAddress(guardianId: number, address: Address){
    console.log("Updating Guardian Address....")
    const res = await fetch(`${API_URL}/guardians/${guardianId}/address`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(address)
    })
    if(!res.ok) throw new Error("Error updating address")
    console.log('Address Updated', address)
}
export async function addGuardianAddress(guardianId: number, address: Address){
    console.log("Adding Guardian Address....")
    const res = await fetch(`${API_URL}/guardians/${guardianId}/address`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(address)
    })
    if(!res.ok) throw new Error("Error adding address")
    console.log("Address added", address)
}

export async function getGuardianStudents(guardianId: number) {
    console.log(`Getting students for Guardian ${guardianId}...`)
    const res = await fetch(`${API_URL}/guardians/${guardianId}/student`)
    if(!res.ok) throw new Error("Error adding guardian")
    const data = await res.json()
    const students = data.map((student: any) => ({
        ...student,
        dateOfBirth: student.dateOfBirth ?
        new Date(student.dateOfBirth).toISOString().slice(0, 10)
        :null
    }))
    console.log("Guardian's students", students)
    return students
}

export async function getAvailableGuardianStudents(guardianId: number) {
    console.log(`Getting available students for Guardian ${guardianId}...`)
    const res = await fetch(`${API_URL}/guardians/${guardianId}/student/available`)
    if(!res.ok) throw new Error("Error adding guardian")
    const data = await res.json()
    const students = data.map((student: any) => ({
        ...student,
        dateOfBirth: student.dateOfBirth ?
        new Date(student.dateOfBirth).toISOString().slice(0, 10)
        :null
    }))
    console.log("Guardian's assignable students", students)
    return students
}

export async function deleteGuardian(id: number){
    console.log("Deleting guardian...")
    const res = await fetch(`${API_URL}/guardians/${id}`, {
        method: "DELETE",
    })
    if(!res.ok) throw new Error("Error deleting guardian")
    console.log("Guardian deleted")
    
}