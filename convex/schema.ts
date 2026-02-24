import { defineSchema,defineTable } from "convex/server";
import {v} from "convex/values"

export default defineSchema({
    messages:defineTable({
        ownerId: v.string(),
        text:v.string(),
    }).index('by_ownerId',['ownerId'])
})