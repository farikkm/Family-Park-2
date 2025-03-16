import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
    className?: string
}

const IconButton = ({ children, className = "", ...props }: Props) => {
    return (
        <button className={`bg-[#2C2D58] w-12 h-12 flex justify-center items-center rounded-4xl ${className}`} {...props}>
            {children}
        </button>
    )
}

export default IconButton
