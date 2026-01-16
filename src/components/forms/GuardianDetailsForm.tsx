"use client"
import FormContainer from "./formComponents/FormContainer"
import FormInput from "./formComponents/FormInput"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import SuccessModal from "../modals/ui/SuccessModal"
import LoadingSpinner from "../ui/LoadingSpinner"
import { addGuardian } from "../../api/guardians"
import type { Guardian } from "../../types/Guardian"

interface GuardianDetailsFormProps{
    title: string
    onSubmit:(guardian: Guardian) => Promise<void>
    successMessage:(guardian: Guardian) => string
    currentGuardian?: Guardian
    toggle?: (values: any) => any
}

export default function GuardianDetailsForm({title, onSubmit, successMessage, currentGuardian, toggle}: GuardianDetailsFormProps){
    const [firstName, setFirstName] = useState(currentGuardian ? currentGuardian.firstName : "")
    const [lastName, setLastName] = useState(currentGuardian ? currentGuardian.lastName : "")
    const [phone, setPhone] = useState(currentGuardian ? currentGuardian.phone : "")
    const [email, setEmail] = useState(currentGuardian ? currentGuardian.email : "")
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addGuardian,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["guardians"]})},
        onError:(err)=> console.error(err)
    })

    function clearInputs(){
        setFirstName("")
        setLastName("")
        setPhone("")
        setEmail("")
    }

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const guardian: Guardian = {
            firstName,
            lastName,
            phone,
            email
        }
        try {
            await onSubmit(guardian)
            setIsSuccessModalOpen(true)
        }catch(err){
            console.error(err)
        }
    }

  return (
    
    <FormContainer title="Add Guardian" submit={submit}>
        <FormInput
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
        label="Phone"
        name="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />
        <FormInput
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
       
        {mutation.isPending && <LoadingSpinner/> }
       {mutation.error && "Error Adding Guardian"}
       <SuccessModal
       title="Guardian Added"
       message={`${firstName} ${lastName} has been registered`}
       isOpen={isSuccessModalOpen}
       onClose={()=>{
        setIsSuccessModalOpen(false)
        clearInputs()
        }}
       />
    </FormContainer>

    )
}