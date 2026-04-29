import HeaderButton from "./HeaderButton";
import HeaderUsername from "./HeaderUsername";
import SearchBar from "./SearchBar";

export default function Header(){
    return(
        <div className="flex items-center w-full h-14 shrink-0 bg-amber-400">
            <div className="flex items-center w-1/4">
                <a href="/" className="text-3xl font-bold text-center ml-1 w-24">Forum</a>
            </div>

            <SearchBar></SearchBar>

            <div className="flex items-center justify-end w-1/4">
                <HeaderUsername />
                <HeaderButton link="/" text="⚙" />
            </div>
        </div>
    );
}