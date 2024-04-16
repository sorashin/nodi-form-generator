
import { UINodeBase } from "@nodi/core";
import { Dialog } from "../atoms/Dialog";
import { useAtom } from "jotai";
import { isDownloadDialogOpenAtom } from "../../store";
import { ButtonElementsProps } from "~/src/types";
import { FC } from "react";

interface DialogDownloadProps {
    elements: ButtonElementsProps[];
}


export const DialogDownload:FC<DialogDownloadProps>=({elements})=>{
  //get login dialog atom
  const [isOpen, setIsOpen] = useAtom(isDownloadDialogOpenAtom);


  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center p-8 gap-4">
        {elements.map((element, index) => (
          <div key={index} className='flex justify-between items-center w-full relative px-4 py-2 [&>div>div>span]:hidden [&>div>div>button]:absolute [&>div>div>button]:inset-0 [&>div>div>button]:rounded-sm [&>div>div>button]:text-[0px] [&>div>div>button]:hover:bg-content-extra-light-a [&>div>div>button]:transition'>
            <img 
              src={element.path} alt=''
              className="w-20 h-20 object-contain rounded-md"
              />
            <p className="grow ml-2">{element.label}</p>
            <span className="w-12 h-12 flex items-center justify-center rounded-sm bg-content-dark-a">
              <img src="/icons/download.svg" alt="" />
            </span>
            {/* span + button */}
            {element.jsx}
          </div>
        ))}
      </div>
    </Dialog>
  );
};
