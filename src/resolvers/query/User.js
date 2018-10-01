import { getUserId } from '../../utils'

const Users = {
  users: async (parent, args, ctx, info) => {
    await getUserId(ctx);
    const users = ctx.authorizationApi.query.users({}, info);
    return users;
  },
};

const Me = {
    me: async (parent, args, ctx, info) => {
        const id = await getUserId(ctx);
        return ctx.authorizationApi.query.user({ where: { id } }, info);
      },
};

module.exports = { Users, Me };