const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },

  },
  Mutation: {
    // 2
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })
      return newLink
    },
    // updateLink: (parent, args) => {
    //   for (const l of links) {
    //     if (l.id === args.id) {
    //       if(args.url) l.url = args.url
    //       if(args.description) l.description = args.description
    //       console.log(l)
    //       return l
    //     }
    //   }
    // },
    // deleteLink: (parent, args) => {
    //   const index = links.findIndex(l => l.id === args.id)
    //   return links.splice(index, 1)[0]
    // }
  },
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))