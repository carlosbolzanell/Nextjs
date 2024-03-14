'use client'
import Input from "@/components/Input";
import Button from "@/components/Button"
import { useRouter } from "next/navigation";
import { useState } from "react";

const loadList = () =>{
    const itens = localStorage.getItem('listUsers');
    return JSON.parse(itens || "[]");
}

type userType = {
    email: string,
    senha: string
}

export default function loginPage(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const conferirLogin = () =>{
        const users = loadList();
        const user = users.map((user: userType)=>{
            if(user.email == email && user.senha == senha){
                return user;
            }
        })
        return (user? user : {})
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const userLogado = conferirLogin(); 
        if(Object.keys(userLogado).length === 0){
            alert("Informações erradas")
            return
        }
        router.push('clientes')
    }
    return(
        <div className="h-[80vh] flex items-center justify-center">
            <form action="" className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Input label="Login" type="text" placeHolder="Digite seu login" onChange={setEmail}/>
                    <Input label="Senha" type="password" placeHolder="Digite sua senha" onChange={setSenha} /> 
                </div>
                <Button onClick={handleClick} texto="Enviar"/>
            </form>
        </div>
    )
}