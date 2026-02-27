import Image from 'next/image'

export default function MyImg(){
    return(
        <div className="flex flex-col items-center w-120 h-70 shrink-0 m-0">
            <Image src={"/uploads/img.webp"} alt="alt text" width={480} height={270} className="border border-black"></Image>
            <button className="btn w-8 h-8 bg-red-700 relative bottom-10">🗑️</button>
        </div>
    );
}