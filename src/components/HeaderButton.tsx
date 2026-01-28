"use client"

type HeaderButtonProps = {
    text: string,
}

export default function HeaderButton({text}: HeaderButtonProps){
    function handleClick(){
        console.log({text});
    }
    
    return(
        <button className="m-1 border h-8 w-10 hover:border-gray-600 hover:text-gray-600 hover:cursor-pointer" onClick={() => handleClick()}>{text}</button>
    );
}