import { useEffect, useMemo, useRef } from "react";
import {  basicSetup } from "codemirror";
import {  EditorView,keymap } from "@codemirror/view";
import {oneDark} from "@codemirror/theme-one-dark"
import {customTheme} from '@/features/editor/extension/theme'
import { getLanguageExtension } from "../extension/language-extension";
import {indentWithTab} from "@codemirror/commands";
import { miniMap } from "../extension/minmap";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { customSetup } from "../extension/custom-setup";
export const CodeEditor = ({fileName,initialValue="",onChange}:{fileName:string,initialValue?:string,onChange:(value:string)=>void}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView |null>(null)

  const languageExtension = useMemo(()=> {
    return getLanguageExtension(fileName)
  },[fileName])

  useEffect(()=>{
     if(!editorRef.current) return ;
    const view = new EditorView({
     
    doc:initialValue,
      parent:editorRef.current,
      extensions:[
      oneDark,
    customTheme,
        customSetup,
       languageExtension,
       keymap.of([indentWithTab]),
       miniMap(),
       indentationMarkers({thickness:2}),
       EditorView.updateListener.of((update)=>{
        if(update.docChanged){
          onChange(update.state.doc.toString())
        }
       })
        
      ]
    })
    viewRef.current = view
    return ()=>{
      view.destroy();
    }
  },[languageExtension])

  return (
   <div ref= {editorRef} className="bg-red-50 size-full">

   </div>
  )
}