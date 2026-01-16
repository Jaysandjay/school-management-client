import {Link} from "react-router-dom"
import DropdownFolder from "../ui/DropdownFolder"

export default function Sidebar() {
  return (
    <aside className="w-70 h-screen text-white bg-linear-to-b from-blue-600 to-blue-100">
        <div className="w-full h-10 flex justify-center items-center mb-3 border-b-black border-b">
            <h1 className="text-xl font-bold">School App</h1>
        </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link to="/">Dashboard</Link>
        <DropdownFolder 
        title="Students"
        links={[
          {name: "Records", href: "/students"}, 
          {name: "Add", href: "/students/add"} 
        ]}
        />
        <DropdownFolder 
        title="Teachers"
        links={[
          {name: "Records", href: "/teachers"},
          {name: "Add", href: "/teachers/add"} 
         ]}
        />
        <DropdownFolder 
        title="Classes"
        links={[{
          name: "Records", href: "/classes"},
          {name: "Add", href: "/classes/add"}  
        ]}
        />
        <DropdownFolder 
        title="Guardians"
        links={[
          {name: "Records", href: "/guardians"},
          {name: "Add", href: "/guardians/add"}  
        ]}
        />
      </nav>
    </aside>
  )
}
