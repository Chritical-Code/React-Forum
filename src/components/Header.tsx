import HeaderButton from "./HeaderButton";

export default function Header(){
    function handleClick(){
        console.log("click button");
    }

    return(
        <div className="flex items-center w-full bg-pink-500 h-14">
            <div className="flex w-1/5 items-center">
                <HeaderButton text="⌂" />
                <h1 className="text-3xl font-bold text-center">
                    Forum
                </h1>
            </div>

            <div className="flex grow justify-center items-center">
                <input type="text" className="m-1 min-w-0 w-1/3 bg-white border rounded-lg pl-2 pr-2"></input>
                <p className="m-1">search</p>
            </div>

            <div className="flex w-1/5 items-center justify-end">
                <HeaderButton text="⚙" />
                <HeaderButton text="☺" />
            </div>
        </div>
    );
}