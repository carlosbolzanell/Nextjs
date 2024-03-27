'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function JogoVelha() {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [hasNomes, setHasNomes] = useState(false)
    if(hasNomes) return <Jogo player1={player1} player2={player2}/>
    return <Menu setHasNomes={setHasNomes} setPlayer1={setPlayer1} setPlayer2={setPlayer2} player1={player1} player2={player2}/>;
}
type TypeMenu = {
    setHasNomes: React.Dispatch<React.SetStateAction<boolean>>,
    setPlayer1: React.Dispatch<React.SetStateAction<string>>,
    setPlayer2: React.Dispatch<React.SetStateAction<string>>,
    player1: string,
    player2: string,
}

const Menu = ({ setHasNomes, setPlayer1, setPlayer2, player1, player2 }: TypeMenu) => {
    const handleClick = () => {
        if (player1 === "" || player2 === "") {
            alert("Erro, digite um nome válido");
        } else {
            alert(player1 + " x " + player2);
            setHasNomes(true);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center h-[72vh]'>
            <h1 className='font-font2 text-2xl mb-4'>Bem vindo ao Jogo da Velha</h1>
            <div className='w-[20%] max-w-[20%]'>
                <Input label={'Jogador 1: ' + player1} placeHolder='Jogador 1' onChange={setPlayer1} type={"text"} />
                <Input label={'Jogador 2: ' + player2} placeHolder='Jogador 2' onChange={setPlayer2} type={"text"} />
                <div className='h-8 mt-2'>
                    <Button texto='Enviar' onClick={handleClick} />
                </div>
            </div>
        </div>
    )
}

type JogoType = {
    player1: string,
    player2: string,
}

const tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

const Jogo = ({ player1, player2 }: JogoType) => {
    const [tabuleiroJogo, setTabuleiroJogo] = useState([[...tabuleiro[0]],[...tabuleiro[1]],[...tabuleiro[2]]]);
    const [playerVez, setPlayerVez] = useState(player1)
    const [empate, setEmpate] = useState(false);
    const [vencedor, setVencedor] = useState(false);

    useEffect(()=>{
        conferirVitoria();
    }, [playerVez])

    const handleClick = (valueColuna:string, linha:number, coluna:number) => {
        if(valueColuna != "") return;
        let newTabuleiro = [[...tabuleiroJogo[0]],[...tabuleiroJogo[1]],[...tabuleiroJogo[2]]];
        newTabuleiro[linha][coluna] = jogadaPorPlayer();
        setTabuleiroJogo(newTabuleiro);
        setPlayerVez(playerVez == player1 ? player2 : player1)
    }
    const jogadaPorPlayer = () =>{
        return (playerVez == player1? "X" : "O");
    }

    const conferirVitoria = () =>{
        //Verificar Coluna
        let vencedorTemporario = false;
        for(let i=0; i<3; i++){
            if(tabuleiroJogo[0][i] == tabuleiroJogo[1][i] && tabuleiroJogo[1][i] == tabuleiroJogo[2][i] && tabuleiroJogo[2][i] != ""){
                vencedorTemporario = true;
            }
        }
        //Verificar Linha
        for(let i=0; i<3; i++){
            if(tabuleiroJogo[i][0] == tabuleiroJogo[i][1] && tabuleiroJogo[i][1] == tabuleiroJogo[i][2] 
                && tabuleiroJogo[i][2] != ""){
                vencedorTemporario = true;
            }
        }
        //verifica primeira diagonal
        if(tabuleiroJogo[0][0] == tabuleiroJogo[1][1] && tabuleiroJogo[1][1] == tabuleiroJogo[2][2] 
            && tabuleiroJogo[2][2] != ""){
            vencedorTemporario = true;
        }
        //verifica segunda diagonal
        if(tabuleiroJogo[0][2] == tabuleiroJogo[1][1] && tabuleiroJogo[1][1] == tabuleiroJogo[2][0] 
            && tabuleiroJogo[0][2] != ""){
            vencedorTemporario = true;
        }
        setVencedor(vencedorTemporario)

        //verifica empate
        let contEmpate = 0;
        tabuleiroJogo.forEach((casa)=>{
            casa.forEach((valor)=>{
                if(valor != ""){
                    contEmpate++
                }
            })
        })
        if(contEmpate == 9 && !vencedorTemporario){
            setEmpate(true);
        }

    }

    const renderTabuleiro = () =>{
        return (
            <div className='flex flex-col gap-2'>
            {tabuleiroJogo.map((linha, i) => (
                <div key={i} className='flex flex-row gap-2'>
                    {
                        linha.map((coluna, j) => (
                            <div key={j} className= {`w-24 h-24 border border-black rounded-md flex items-center justify-center shadow-lg shadow-gray-900/20 active:opacity-[0.85] active:shadow-none ${(coluna != "" ? (coluna == "X" ? "bg-red-200" :"bg-sky-300"): "bg-white")}`} onClick={()=>{
                                if(!vencedor){
                                    handleClick(coluna, i, j)
                                }
                            }}><p className='text-4xl font-font2 bg'>{coluna}</p></div>
                        ))
                    }
                </div>
                )
            )}
            </div>
        )
    }

    const mensagem = () =>{
        if(!vencedor){
            if(empate){
                return ("Deu velha!")
            }
            return("Vez de " + playerVez)
        }else{
            return((playerVez == player1? player2 : player1)+ " Venceu!")
        }
    }
    const zerarGame = () =>{
        setTabuleiroJogo(tabuleiro)
        setPlayerVez(playerVez)
        setVencedor(false)
        setEmpate(false)
    }
    return (
        <div className={`flex flex-col justify-center items-center h-[89vh] duration-100 ${(vencedor ? (playerVez == player1 ? "bg-sky-300":"bg-red-200"): "bg-white")}`}>
            <p className='font-font2 text-2xl mb-3'>{mensagem()}</p>
            {renderTabuleiro()}
            {(vencedor || empate) &&(
                <button className={`absolute bottom-10 align-middle font-font1 font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg ${(vencedor ? (playerVez == player1 ? "bg-red-200 text-black": "bg-sky-300 text-black"): "bg-gray-500 text-white")} shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none`} onClick={()=>zerarGame()}>Reiniciar</button>
            )} 
        </div>
    )
}