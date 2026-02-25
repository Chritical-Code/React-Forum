import Image from 'next/image'

export default function MyImg(){
    return(
        <div className="flex border w-120 h-80 shrink-0 bg-pink-300">
            <Image src={"/example.png"} alt="alt text" width={640} height={480} className=""></Image>
        </div>
    );
}