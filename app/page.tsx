export default function Home() {
return (
    <div className="flex flex-row overflow-hidden">
        <div className="flex flex-col w-1/5">
            <p className="font-bold m-1">Tags</p>
            <Tag text="One"></Tag>
            <Tag text="Two"></Tag>
            <Tag text="Three"></Tag>
            <Tag text="Four"></Tag>
            <Tag text="Five"></Tag>
        </div>

        <div className="flex flex-col w-3/5 items-center overflow-y-scroll">
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
        </div>
    </div>
);
}


function Post(){
    return(
        <div className="shrink-0 bg-amber-400 w-2xl h-96 border m-2"></div>
    );
}

type TagProps = {
    text: string
}

function Tag({text}: TagProps){
    return(
        <p className="m-1">{text}</p>
    );
}