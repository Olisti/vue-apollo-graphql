// apollographql.com/docs/apollo-server/getting-started/
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }

    type Mutation {
        addBook(title: String, author: String): Book
    }

    type Subscription {
        booksList: [Book]
    }
`;

const resolvers = {
    Query: {
        books: () => books,
    },
    Mutation: {
        addBook: (root, args, context) => {
            books.push(args);
            pubsub.publish(BOOK_ADDED, { booksList: books });
            return args;
        },
    },
    Subscription: {
        booksList: {
            subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
