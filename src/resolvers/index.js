import { Users, Me } from './query/User'
const { Authorization, registerUser } = require('./mutation/Authorization');
const { AuthPayload } = require('./AuthPayload');

const resolvers = {
  Query: {
    ...Users,
    ...Me,
  },
  Mutation: {
    ...Authorization,
    ...registerUser,
  },
  AuthPayload,
};

module.exports = resolvers;