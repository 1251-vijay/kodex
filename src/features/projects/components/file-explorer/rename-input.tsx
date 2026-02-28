import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { getItemPadding } from "./constants";
import { cn } from "@/lib/utils";

interface CreateInputProps {
    type: 'file' | 'folder',
    level: number,
    onSubmit: (name: string) => void
    onCancel: () => void,
    defaultValue:string,
    isOpen?:boolean
}

export const RenameInput = ({ type, level, onSubmit, onCancel,defaultValue,isOpen }: CreateInputProps) => {

    const [value, setValue] = useState(defaultValue)
    const handleSubmit = () => {
        const trimmedValue = value.trim()
        if (trimmedValue) {
            onSubmit(trimmedValue)
        } else {
            onCancel()
        }


    }
    return (
        <div className="w-full items-centers gap-1 h-5.5 bg-accent/30"
        style={{paddingLeft: getItemPadding(level,type === 'file')}}
        
        >
            <div className="flex items-center gap-0.5">
                {type === "folder" && (<ChevronRightIcon className={cn("size-4 shrink-0 text-muted-foreground",isOpen && 'rotate-90' )}/>)}
                {type === "file" && (<FileIcon className="size-4 " fileName={value} autoAssign />)}
                {type === "folder" && (<FolderIcon className="size-4" folderName={value} />)}
            
            <input autoFocus type="text" value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 bg-transparent 
            text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-ring" onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    handleSubmit()
                }
                if(e.key === 'Escape'){
                    onCancel()
                }
            }} onFocus={
                (e)=>{
                    if(type === 'folder'){
                        e.currentTarget.select();
                    }else{
                        const value = e.currentTarget.value;
                        const lastDotindex = value.lastIndexOf('.');
                        if (lastDotindex>0){
                            e.currentTarget.setSelectionRange(0,lastDotindex)
                        }else{
                            e.currentTarget.select()
                        }
                    }
                   

                }
            }  onBlur={handleSubmit}/>
        </div>
          </div>

    )
}