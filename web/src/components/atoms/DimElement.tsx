import { useAtom } from "jotai";
import { gridAtoms, openAIAPIKeyAtom } from "../../store";
import { FC, useMemo, useState } from "react";

// define type
type DimElementProps = {
    value: number;
    onChange: (e: any) => void;
    isVertical: boolean;
};

export const DimElement:FC<DimElementProps> = ({value, onChange, isVertical}) => {
    
  return isVertical?(
    // 縦方向
    <p className='absolute w-4 h-full overflow-visible -left-8 text-center border-y-[1px] border-content-dark text-content-dark flex flex-col items-center'>
        <span className="grow w-[1px] bg-content-dark"/>            
            <input 
                className="my-2 p-2 text-sm w-16 text-center rounded-sm bg-transparent hover:bg-[rgba(255,255,255,.2)] focus:bg-[rgba(255,255,255,.2)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition"
                type="number"
                value={value}
                onChange={(e) => onChange(e)}
            />
        <span className="grow w-[1px] bg-content-dark"/>
    </p>
  
  ):(
    // 横方向
    <p className='absolute w-full h-4 overflow-visible -top-8 text-center border-x-[1px] border-content-dark text-content-dark flex flex-row items-center'>
        <span className="grow h-[1px] bg-content-dark"/>            
            <input 
                className="mx-2 p-2 text-sm w-16 text-center rounded-sm bg-transparent hover:bg-[rgba(255,255,255,.2)] focus:bg-[rgba(255,255,255,.2)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={value}
                onChange={(e) => onChange(e)}
            />
        <span className="grow h-[1px] bg-content-dark"/>
    </p>
  );
};