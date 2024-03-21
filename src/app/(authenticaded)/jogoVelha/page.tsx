'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function jogoVelha() {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [hasNomes, setHasNomes] = useState(false)
    if(hasNomes) return <Jogo player1={player1} player2={player2}/>
    return <Menu setHasNomes={setHasNomes} setPlayer1={setPlayer1} setPlayer2={setPlayer2} player1={player1} player2={player2}/>;
    //return <Jogo player1={player1} player2={player2} />
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
    const [tabuleiroJogo, setTabuleiroJogo] = useState(tabuleiro);
    const [playerVez, setPlayerVez] = useState(player1)
    const [vencedor, setVencedor] = useState(false);

    useEffect(()=>{
        conferirVitoria();
    }, [playerVez])

    const handleClick = (valueColuna:string, linha:number, coluna:number) => {
        if(valueColuna != "") return;
        let newTabuleiro = [...tabuleiroJogo];
        newTabuleiro[linha][coluna] = jogadaPorPlayer();
        setTabuleiroJogo(newTabuleiro);
        setPlayerVez(playerVez == player1 ? player2 : player1)
    }
    const jogadaPorPlayer = () =>{
        return (playerVez == player1? "X" : "O");
    }

    const conferirVitoria = () =>{
        //Verificar Coluna
        for(let i=0; i<3; i++){
            if(tabuleiroJogo[0][i] == tabuleiroJogo[1][i] && tabuleiroJogo[1][i] == tabuleiroJogo[2][i] && tabuleiroJogo[2][i] != ""){
                setVencedor(true);
            }
        }
        //Verificar Linha
        for(let i=0; i<3; i++){
            if(tabuleiroJogo[i][0] == tabuleiroJogo[i][1] && tabuleiroJogo[i][1] == tabuleiroJogo[i][2] 
                && tabuleiroJogo[i][2] != ""){
                setVencedor(true)
            }
        }
        //verifica primeira diagonal
        if(tabuleiroJogo[0][0] == tabuleiroJogo[1][1] && tabuleiroJogo[1][1] == tabuleiroJogo[2][2] 
            && tabuleiroJogo[2][2] != ""){
            setVencedor(true);
        }
        //verifica segunda diagonal
        if(tabuleiroJogo[0][2] == tabuleiroJogo[1][1] && tabuleiroJogo[1][1] == tabuleiroJogo[2][0] 
            && tabuleiroJogo[0][2] != ""){
            setVencedor(true);
        }

        //verifica empate
        let contEmpate = 0;
        tabuleiroJogo.forEach((casa)=>{
            casa.forEach((valor)=>{
                if(valor != ""){
                    contEmpate++
                }
            })
        })
        if(contEmpate == 9 && !vencedor){
            alert("Empatado");
        }

    }

    const renderTabuleiro = () =>{
        return (
            <div className='flex flex-col gap-2'>
            {tabuleiroJogo.map((linha, i) => (
                <div key={i} className='flex flex-row gap-2'>
                    {
                        linha.map((coluna, j) => (
                            <div key={j} className='w-24 h-24 border border-black rounded-md' onClick={()=>{
                                if(!vencedor){
                                    handleClick(coluna, i, j)
                                }
                            }}><p>{coluna}</p></div>
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
            return("Vez de " + playerVez +" ("+jogadaPorPlayer()+")")
        }else{
            return((playerVez == player1? player2 : player1)+ " Venceu!")
        }
    }
    return (
        <div className='flex flex-col justify-center items-center h-[82vh]'>
            <p className='font-font1 text-lg mb-3'>{mensagem()}</p>
            {renderTabuleiro()} 
        </div>
    )
}