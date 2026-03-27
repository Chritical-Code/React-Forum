'use client';

import { useRef } from "react";

export default function ImageScroller({children}: Readonly<{children: React.ReactNode;}>){
    const scrollDivRef = useRef<HTMLDivElement | null>(null);
    const indexRef = useRef<number>(0);

    function handleScroll(direction: number){
        //check for child elements
        const arrLength = scrollDivRef.current?.children.length ?? 0;

        if(arrLength > 0){
            let newIndex = indexRef.current + direction;

            //floor/cieling
            if(newIndex < 0){
                newIndex = 0;
            }
            else if(newIndex > arrLength -1){
                newIndex = arrLength -1;
            }

            //get width of element
            const width = scrollDivRef.current?.children[0].clientWidth ?? 0;

            //apply
            scrollDivRef.current?.scrollTo({left: (width * newIndex), behavior:"smooth"});
            indexRef.current = newIndex;
            
        }
    }

    return(
        <div className="flex flex-col items-center">
            <div ref={scrollDivRef} className="flex flex-row w-90 h-51 md:w-120 md:h-67.5 overflow-hidden border m-0">
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