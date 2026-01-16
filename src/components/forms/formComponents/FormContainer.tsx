import type { ReactNode } from "react"
import BasicContainer from "../../ui/BasicContainer"

interface FormContainerProps{
    title: string,
    children: ReactNode,
    submit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function FormContainer({title, children, submit}: FormContainerProps){
    return (
      <BasicContainer title={title}>

      <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            {children}
          </div>
          <button
          type="submit"
          className="mt-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium"
          >
          Submit
        </button>
        </form>
        </BasicContainer>
        
    )
}