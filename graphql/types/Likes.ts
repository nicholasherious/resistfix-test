import { extendType, nonNull, objectType, stringArg } from 'nexus';

export const Like = objectType({
name: "Like",
definition(t) {
    t.nonNull.field("like", {type: "Post"})
    t.nonNull.field('user', {type: "User"})
},
})

export const LikeMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field('like', { 
            type: "Like",
            args: { 
                likeId: nonNull(stringArg())
            }
        })
    },
})