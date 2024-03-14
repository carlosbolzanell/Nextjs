import React, { ChangeEvent, Dispatch }  from "react"

type typeInput = {
    label:string,
    type:string,
    placeHolder?: string,
    value?: string,
    maxLength?: number,
    onChange: Dispatch<React.SetStateAction<string>>,
}
export default function Input({label, type, placeHolder, value, maxLength, onChange}:typeInput){
    return(
        <div className="flex flex-col">
            <label className="font-font1 text-lg">{label}</label>
            <input onChange={(e)=>onChange(e?.target.value)} maxLength={maxLength} value={value} type={type} placeholder={placeHolder} className='font-font1 pl-1 border border-black rounded-md h-8 focus:outline-none' />
        </div>
    )
}