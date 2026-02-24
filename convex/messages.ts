import {mutation, query} from './_generated/server'
import {v} from "convex/values"

export const createMessage = mutation({
    args:{text:v.string()},
    handler : async (ctx,args) =>{
        const userId  = await ctx.auth.getUserIdentity();
        if(!userId){
            throw new Error("unauthorized")
        }
         await ctx.db.insert("messages",{ownerId:userId.subject,text:args.text})
    }
})


export const get = query({
    args:{},
    handler:async (ctx, args)=>{

        const userId = await ctx.auth.getUserIdentity();

        if(!userId){
           return []
        }
       return await ctx.db.query('messages').withIndex('by_ownerId',(q) => q.eq('ownerId' ,userId.subject,)).collect()  }
})

