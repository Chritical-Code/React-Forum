import HeaderButton from "./HeaderButton";
import HeaderUsername from "./HeaderUsername";

export default function Header(){
    return(
        <div className="flex items-center w-full h-14 shrink-0 bg-amber-400">
            <div className="flex items-center w-1/4">
                <a href="/">
                    <h1 className="text-3xl font-bold text-center ml-1 w-24">Forum</h1>
                </a>
            </div>

            <div className="flex w-2/4 justify-center items-center h-full">
                <input placeholder="🔍Search" type="text" className="m-1 w-40 md:w-100 bg-white border rounded-lg pl-2 pr-2 h-6/10"></input>
            </div>

            <div className="flex items-center justify-end w-1/4">
                <HeaderUsername />
                <HeaderButton link="/" text="⚙" />
            </div>
        </div>
    );
}