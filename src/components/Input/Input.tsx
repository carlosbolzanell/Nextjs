import { ChangeEvent } from "react"

type typeInput = {
    label:string,
    type:string,
    placeHolder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}
export default function Input({label, type, placeHolder, onChange}:typeInput){
    return(
        <div className="flex flex-col">
            <label className="font-font1 text-lg">{label}</label>
            <input onChange={onChange} type={type} placeholder={placeHolder} className='font-font1 pl-1 border border-black rounded-md h-8 focus:outline-none' />
        </div>
    )
}