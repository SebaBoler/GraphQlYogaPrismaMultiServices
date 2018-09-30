import { GraphQLServer } from "graphql-yoga" 
import { Prisma } from 'prisma-binding'
import chalk from 'chalk'
import 'dotenv/config'
// dotenv.config({ path: path.join(__dirname, '.env') });

const authorizationApi = new Prisma({
    typeDefs: './src/generated/authorization-api.graphql',
    endpoint: process.env.AUTHORIZATION_SERVICE_ENDPOINT,
});

const licenceApi = new Prisma({
    typeDefs: './src/generated/licence-api.graphql',
    endpoint: process.env.LICENCE_SERVICE_ENDPOINT,
});

const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: () => true,
    context: req =>({ ...req, authorizationApi, licenceApi }) 
});

server.start(() => 
    console.log(`Graphql Server is running on ${chalk.green(process.env.SERVER_ENDPOINT)}`),
);