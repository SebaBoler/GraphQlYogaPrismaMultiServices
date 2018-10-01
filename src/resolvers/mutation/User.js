import bcrypt from 'bcryptjs'
// const { validateToken } = require('../../utils');

const registerUser = {
  async register(parent, args, ctx, info) {
    console.log(`Info: ${info}`);
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.authorizationApi.mutation.createUser({
      data: { ...args, password },
    });

    return {
      user,
    };
  },
};

module.exports = { registerUser };
