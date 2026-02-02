type UserProps = {
    params: Promise<{
        username: string;
    }>
}

export default async function User({params}: UserProps){
    const resolved = await params;
    
    return(
        <div className="flex flex-row overflow-hidden">
            <h1>Username: {resolved.username}</h1>
        </div>
    );
}