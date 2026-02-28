import { defineSchema,defineTable } from "convex/server";
import {v} from "convex/values"

export default defineSchema({
    projects:defineTable({
        name: v.string(),
        ownerId:v.string(),
        updatedAt:v.number(),
        importStatus:v.optional(
            v.union(
                v.literal("importing"),
                v.literal("completed"),
                v.literal("failed"),
            )
        ),
        exportStatus:v.optional(
            v.union(
                v.literal('exporting'),
                v.literal('completed'),
                v.literal("failed"),
                v.literal("cancelled")
            )
        ),
        exportRepoUrl:v.optional(v.string()),
    }).index('by_ownerId',['ownerId']),


    files:defineTable({
        projectId:v.id('projects'),
        parentId:v.optional(v.id('files')), //nested files 
        name:v.string(),   //file names 
        type:v.union(v.literal("file"),v.literal("folder")), //file type
        content: v.optional(v.string()) ,// text files  or image files  
        storageId: v.optional(v.id('_storage')), // convex storage for storing binary files or data
        updatedAt:v.number(),



    }).index("by_project",['projectId']).index("by_parent",['parentId']).index("by_project_parent",['projectId','parentId'])
})