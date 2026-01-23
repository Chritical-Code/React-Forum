type TestNumberProps = {
    params: Promise<{
        id: number;
    }>
}

export default async function TestNumber({params}: TestNumberProps){
    const resolved = await params;
    
    return(
        <div>
            <p>Test Number: {resolved.id}</p>
        </div>
    );
}