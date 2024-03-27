'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useEffect, useState } from 'react'

function JogoForca() {
    const [palavra, setPalavra] = useState("")
    const [isPalavra, setIsPalavra] = useState(false)
    if (isPalavra) return <Jogo palavra={palavra} />
    return <Menu palavra={palavra} setPalavra={setPalavra} setIsPalavra={setIsPalavra} />
}
type menuType = {
    palavra: string,
    setPalavra: React.Dispatch<React.SetStateAction<string>>,
    setIsPalavra: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({ palavra, setPalavra, setIsPalavra }: menuType) => {
    const handleClick = () => {
        if (palavra === "") {
            alert("Erro, digite uma palavra válida");
        } else {
            setIsPalavra(true);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center h-[72vh]'>
            <h1 className='font-font2 text-2xl mb-4'>Bem vindo ao Jogo da Forca</h1>
            <div className='w-[20%] max-w-[20%]'>
                <Input label={'Palavra: ' + palavra} placeHolder='Palavra' onChange={setPalavra} type={"text"} />
                <div className='h-8 mt-2'>
                    <Button texto='Enviar' onClick={handleClick} />
                </div>
            </div>
        </div>
    )
}


//Componente jogo para a logica da funcionalidade do jogo
type jogoType = {
    palavra: string
}
const letras = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const Jogo = ({ palavra }: jogoType) => {
    const palavraArray = palavra.split('');
    const palavraInicial: string[] = palavraArray.map((char) => {
        return char !== " " ? "_" : '\u00A0';
    })

    const [linhasPalavra, setLinhaPalavras] = useState(palavraInicial);
    const [vidas, setVidas] = useState(6);
    const [usadas, setUsadas] = useState([""]);

    useEffect(()=>{
        verificaVitoria()
    },[linhasPalavra])

    const renderPalavra = () =>{
        return(
            <div className='flex flex-row gap-2 items-center justify-center'>
                {
                    linhasPalavra.map((char, i)=>(
                        <p className='text-3xl font-bold' key={i}>{char}</p>
                    ))
                }
            </div>
        )
    }

    const verificaVitoria = () =>{
        if(linhasPalavra.join("") === palavra.toUpperCase()){
            alert("Sim")
        }
    }

    const adicionarUsadas = (letra: string) =>{
        setUsadas([...usadas, letra])
    }
    const verificarVidas = (verificadora: string) =>{ 
        if(verificadora == linhasPalavra.join("")){
            setVidas(vidas - 1);
        }
    }
    const estaVivo = () =>{
        return vidas === 0;
    }

    const handleClick = (letra: string) => { 
        let novaPalavra: string[] = [...linhasPalavra]
        palavraArray.forEach((char, i)=>{
            if(letra.toUpperCase() == char.toUpperCase()){
                novaPalavra[i] = char.toUpperCase();
            }
        })
        verificarVidas(novaPalavra.join(""));
        setLinhaPalavras(novaPalavra)
        adicionarUsadas(letra);

    
    }
    const renderBotoes = () => {
        return letras.map((letra, i) => (
            <button disabled={estaVivo() || usadas.includes(letra)} onClick={()=>handleClick(letra)} key={i} className={`w-14 h-14 border border-black ${usadas.includes(letra)? "bg-slate-400" : "bg-sky-200"} rounded-md flex justify-center items-center shadow-lg shadow-gray-900/20 active:opacity-[0.85] active:shadow-none`}>
                <p className='font-font2 select-none'>{letra}</p>
            </button>
        ))
    }
    return (
        <div>
            <div className='flex items-center justify-center'>
                <p className='font-font1 text-xl'>Letras usadas: {usadas.join(" ")}</p>
            </div>
            <div className='mt-4'>
                {renderPalavra()}
            </div>
            <div className='flex flex-row flex-wrap gap-4 w-[80%] m-auto justify-center mt-11'>
                {renderBotoes()}
            </div>
        </div>
    )
}

export default JogoForca