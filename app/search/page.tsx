type SearchPageProps = {
    searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export default async function SearchPage({searchParams}: SearchPageProps){
    const resolved = await searchParams;
    
    return(
        <div>
            <p>Search page.</p>
            <p>{resolved.q}</p>
        </div>
    );
}