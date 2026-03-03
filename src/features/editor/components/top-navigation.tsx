import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { useFile } from "@/features/projects/hooks/use-file";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { FileIcon } from "@react-symbols/icons/utils";
import { XIcon } from "lucide-react";




const Tab = ({fileId,isFirst,projectId}:{fileId:Id<'files'>,isFirst:boolean,
    projectId:Id<'projects'>
})=>{

    const file = useFile(fileId)
    const {activeTabId,previewTabId, closeTab, openFile,setActiveTab} = useEditor(projectId);
    const isActive = activeTabId === fileId;
    const isPreview = previewTabId === fileId;
    const fileName = file?.name??"Loading..."
    return (
        <div className={cn(
            "flex items-center hover:bg-accent/30 gap-2 h-9 pl-2 pr-1.5 cursor-pointer text-muted-foreground group border-y border-x border-transparent",
isActive && "bg-background text-muted-foreground border-x-border border-b-background -mb-px drop-shadow-2xl",
isFirst && 'border-l-transparent!'
        )}
        onClick={()=> setActiveTab(fileId)} 
        onDoubleClick={()=> openFile(fileId,{pinned:true})} >
            {file === undefined ? (<Spinner className=""/>) : (<FileIcon fileName={file.name} autoAssign className="size-4"/> )}
            <span className={cn('text-sm whitespace-normal',isPreview && 'italic')}>{fileName }</span>
            <button onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                closeTab(fileId)
                
            }}
            className={cn(
                "p-0.5 rounded-sm hover:bg-white/10 opacity-0 group-hover:opacity-100" ,
                isActive && 'opacity-100'
            )}
            >
                <XIcon className="size-3.5"/>
                </button>

        </div>
    )

}


export const TopNavigation = ({projectId} : {projectId:Id<'projects'>})=> {


     const {openTabs } = useEditor(projectId);
    return (
       <ScrollArea className="flex-1">
        <nav className="bg-sidebar h-9 border-b flex items-center">
            {openTabs.map((fileId,index) => (
                <Tab 
                key={fileId}
                fileId={fileId}
                isFirst = {index == 0}
                projectId = {projectId}
                
                />
            ))}
        </nav>
        <ScrollBar orientation="horizontal"/>

       </ScrollArea>
    )
}