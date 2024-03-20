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
        const user = users.filter((user: userType)=>{
            return user.email == email && user.senha == senha
        })
        return (user)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const userLogado = conferirLogin();
        if(userLogado.length === 1){
            router.push('paginaInicial', userLogado)
        }else{
            alert("Dados incorretos")
        }
        
    }
    return(
        <div className="h-[80vh] flex items-center justify-center">
            <form action="" className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Input label="Login" type="text" placeHolder="Digite seu email" onChange={setEmail}/>
                    <Input label="Senha" type="password" placeHolder="Digite sua senha" onChange={setSenha} /> 
                </div>
                <Button onClick={handleClick} texto="Enviar"/>
            </form>
        </div>
    )
}