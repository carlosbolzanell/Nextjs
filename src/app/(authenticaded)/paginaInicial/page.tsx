import CardGame from "@/components/CardGame"

type userType = {
    nome: string,
    cpf: string,
    email: string,
}

export default function clientesPage(){
    return(
        <div className="flex flex-col items-center h-[88vh]">
            <h1 className="font-font2 text-2xl mt-10">Escolha um jogo</h1>
            <div className="flex gap-12 mt-24">
                <CardGame src="./assets/velha.png" game="Jogo da Velha"/>
                <CardGame src="./assets/forca.png" game="Jogo da Forca"/>
                <CardGame src="./assets/memoria.png" game="Jogo da Memoria"/>
            </div>
        </div>
    )
}
