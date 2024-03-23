'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useState } from 'react'

function jogoForca() {
  const [palavra, setPalavra] = useState("")
  const [isPalavra, setIsPalavra] = useState(false)
  if(isPalavra) return <Jogo palavra={palavra} />
  return <Menu palavra={palavra} setPalavra={setPalavra} setIsPalavra={setIsPalavra}/>
}
type menuType = {
    palavra: string,
    setPalavra: React.Dispatch<React.SetStateAction<string>>,
    setIsPalavra: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({palavra, setPalavra, setIsPalavra}: menuType) =>{
    const handleClick = () =>{
        if (palavra === "" ) {
            alert("Erro, digite uma palavra válida");
        } else {
            setIsPalavra(true);
        }
    }
    return(
        <div className='flex flex-col justify-center items-center h-[72vh]'>
            <h1 className='font-font2 text-2xl mb-4'>Bem vindo ao Jogo da Forca</h1>
            <div className='w-[20%] max-w-[20%]'>
                <Input label={'Palavra: ' + palavra} placeHolder='Jogador 1' onChange={setPalavra} type={"text"} />
                <div className='h-8 mt-2'>
                    <Button texto='Enviar' onClick={handleClick} />
                </div>
            </div>
        </div>
    )
}
type jogoType = {
    palavra: string
}

const Jogo = ({palavra}: jogoType) =>{
    const palavraInicial = palavra.split('').map((char)=>{
        return char !== " " ? "_ " : '\u00A0';
    })
    const [linhasPalavra, setLinhaPalavras] = useState(palavraInicial.join(""));
    const handleClick = () =>{
    }
    return(
        <div onClick={handleClick} className="text-4xl flex items-center justify-center">{linhasPalavra}</div>
    )
}

export default jogoForca