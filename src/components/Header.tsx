import HeaderButton from "./HeaderButton";
import HeaderUsername from "./HeaderUsername";

export default function Header(){
    function handleClick(){
        console.log("click button");
    }

    return(
        <div className="flex items-center w-full h-14 shrink-0 bg-amber-400">
            <div className="flex w-1/4 items-cente">
                <HeaderButton link="/" text="⌂" />
                <h1 className="text-3xl font-bold text-center">
                    Forum
                </h1>
            </div>

            <div className="flex grow justify-center items-center">
                <input type="text" className="m-1 min-w-0 w-1/3 bg-white border rounded-lg pl-2 pr-2"></input>
                <p className="m-1">🔍</p>
            </div>

            <div className="flex w-1/4 items-center justify-end">
                <HeaderUsername />
                <HeaderButton link="/" text="⚙" />
                <HeaderButton link="/user/bob" text="☺" />
            </div>
        </div>
    );
}