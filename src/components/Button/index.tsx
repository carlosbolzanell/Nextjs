import React from "react"

interface ButtonProps {
    texto: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({texto, onClick}: ButtonProps){
    return(
        <button onClick={onClick} type="submit" className="border border-black rounded-md font-font1 bg-blue-100 w-full h-full">{texto}</button>
    )
}