
interface PrimaryButtonProps {
    title: string,
    color?: string,
    text?: string
    onclick?: (values: any) => any,
    disabled?: any
}

export default function PrimaryButton({disabled, title, color = "bg-blue-500", text="text-white", onclick}: PrimaryButtonProps){
    return (
        <button
        onClick={onclick}
        className={`${color} ${text} ${disabled ? "opacity-50 cursor-not-allowed" : ""} cursor-pointer px-4 py-1 mt-1 rounded hover:opacity-80 transition-opacity duration-200 min-w-30 text-center`}
        disabled={disabled}
        >
            {title}
        </button>
    )
}