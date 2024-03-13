import React from "react"

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({onClick}: ButtonProps){
    return(
        <button onClick={onClick} type="submit" className="border border-black rounded-md font-font1 bg-blue-100">Submit</button>
    )
}