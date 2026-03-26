'use client';

import { useRef } from "react";

export default function ImageScroller({children}: Readonly<{children: React.ReactNode;}>){
    const scrollDivRef = useRef<HTMLDivElement | null>(null);

    function handleScroll(direction: number){
        //get photo width
        const photoWidth = scrollDivRef.current?.firstElementChild ? scrollDivRef.current?.firstElementChild.clientWidth : 0;
        scrollDivRef.current?.scrollBy({left:(photoWidth + 1) * direction, behavior:"smooth"});
    }

    return(
        <div className="flex flex-col items-center">
            <div ref={scrollDivRef} className="flex flex-row w-90 h-51 md:w-120 md:h-67.5 overflow-x-scroll overflow-y-hidden border m-0">
                {children}
            </div>

            <div className="flex items-center">
                <button onClick={() => {handleScroll(-1)}} className="btn w-10">&lt;</button>
                <div className="flex w-60 md:w-90"></div>
                <button onClick={() => {handleScroll(1)}} className="btn w-10">&gt;</button>
            </div>
        </div>
    );
}