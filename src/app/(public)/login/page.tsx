'use client'
import Input from "@/components/Input";
import Button from "@/components/Button"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function loginPage(){
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [senha, setSenha] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
    }
    return(
        <div className="h-[80vh] flex items-center justify-center">
            <form action="" className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Input label="Login" type="text" placeHolder="Digite seu login" onChange={setUserName}/>
                    <Input label="Senha" type="password" placeHolder="Digite sua senha" onChange={setSenha} /> 
                </div>
                <Button onClick={handleClick} texto="Enviar"/>
            </form>
        </div>
    )
}