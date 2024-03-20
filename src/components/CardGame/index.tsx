type cardType = {
    src: string,
    game: string,
}

export default function CardGame({src, game}: cardType){
    return(
        <div className="flex flex-col items-center justify-center hover:scale-110 duration-200">
            <div className="w-28 h-28 border border-black rounded-lg">
                <img src={src} alt="" className="h-[6.88rem] w-28 rounded-lg"/>
            </div>
            <p className="font-font1 font-medium">{game}</p>
        </div>
    )
}