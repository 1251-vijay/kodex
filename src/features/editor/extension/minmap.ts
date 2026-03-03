import { showMinimap } from "@replit/codemirror-minimap"
import { EditorView } from "codemirror";

const createmimMap = (v: EditorView) => {
  const dom = document.createElement('div');
  return { dom }
}

export const miniMap = ()=>[
    showMinimap.compute(['doc'] ,()=>{
return {
    create:createmimMap
}
    })
]