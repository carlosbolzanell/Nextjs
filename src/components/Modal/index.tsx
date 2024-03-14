import { useRouter } from "next/navigation"

type modalType = {
    text: string,
    textButton: string,
    caminho: string,
}

export default function Modal({text, textButton, caminho}: modalType){
    const router = useRouter()
    return(
        <div className="bg-blue-200 w-56 h-28 rounded-lg flex flex-col items-center justify-center gap-3"> 
            <div>
                <p className="font-font1">{text}</p>
            </div>
            <div>
                <button onClick={()=>router.push(caminho)} className="font-font1 bg-blue-100 w-20 h-7 rounded-lg">{textButton}</button>
            </div>
        </div>
    )
}