import Link from "next/link";

export default function HeaderDeslogado() {
    return (
        <div className="border-b border-black bg-sky-300">
            <header className="flex flex-row justify-between items-center w-[85%] m-auto h-[10.92vh]">
                <div className="font-font2 text-xl">
                    <Link href={"./"}>Portal dos Games</Link>
                </div>
                <nav className="flex flex-row gap-8">
                    <ul>
                        <li className="border border-black w-20 justify-center flex rounded-lg font-font1 bg-blue-100"><Link href={'./login'}>Login</Link></li>
                    </ul>
                    <ul>
                        <li className="border border-black w-20 justify-center flex rounded-lg font-font1 bg-blue-100"><Link href={"./cadastro"}>Cadastro</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}