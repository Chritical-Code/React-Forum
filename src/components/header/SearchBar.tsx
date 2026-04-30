'use client';
import { useRouter } from "next/navigation";

export default function SearchBar(){
    const router = useRouter();
    
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchString = formData.get("search") as string;
        if(searchString != ""){
            router.push(`/search?q=${encodeURIComponent(searchString)}`);
        }
    }

    return(
            <form onSubmit={handleSubmit} className="flex w-2/4 justify-center items-center h-full">
                <input name="search" placeholder="🔍Search" type="text" className="m-1 w-40 md:w-100 bg-white border rounded-lg pl-2 pr-2 h-6/10"></input>
            </form>
    );
}