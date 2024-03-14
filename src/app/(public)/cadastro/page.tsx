'use client'
import Button from '@/components/Button';
import Input from '@/components/Input'
import React, { useEffect, useState } from 'react'

const loadList = () =>{
    const itens = localStorage.getItem('listUsers');
    return JSON.parse(itens? itens : '[]');
}

const page = () => {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [users, setUsers] = useState(loadList || []);

    useEffect(() => {
        formatarCPF(cpf);
    }, [cpf]);

    useEffect(()=>{
        saveList();
    }, [users])

    const formatarCPF = (input: string): void => {
        let cpfFormatado: string = input;
        cpfFormatado = cpfFormatado.replace(/\D/g, ''); // Remove caracteres não numéricos
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
        setCpf(cpfFormatado);
    };

    const criarUser = (): object =>{
        if(name == ""|| cpf.length < 14 || email == "" || senha == "") return {};
        const usuario = {
            'nome': name,
            'cpf': cpf,
            'email': email,
            'senha': senha
        }
        return usuario;
    }

    const saveList = () =>{
        const newList = [...users];
        localStorage.setItem('listUsers', JSON.stringify(newList));
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user = criarUser();
        const newUsers = users.push(user)
        setUsers(newUsers);
    }

    return (
        <div className='flex flex-col justify-center items-center h-[89vh]'>
            <h1 className='font-font2 text-3xl'>Cadastro</h1>
            <div className='w-[25%]'>
                <Input label='Nome Completo' type='text' placeHolder='Digite seu nome' onChange={setName} />
            </div>
            <div className='flex flex-row gap-[2%] max-w-[25%]'>
                <div className='w-[49%]'>
                    <Input type='text' label='CPF' placeHolder='Digite seu CPF' onChange={setCpf} value={cpf} maxLength={14} />
                </div>
                <div className='w-[49%]'>
                    <Input label='E-mail' type='email' placeHolder='exemplo@email.com' onChange={setEmail} />
                </div>
            </div>
            <div className='w-[25%]'>
                <Input label='Senha' type='password' placeHolder='Sua senha' onChange={setSenha} />
            </div>
            <div className='w-[15%] h-8 mt-3'>
                <Button texto='Cadastrar' onClick={handleClick} />
            </div>
        </div>
    )
}

export default page