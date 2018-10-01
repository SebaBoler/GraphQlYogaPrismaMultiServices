import { createToken } from '../../utils';

const Authorization = {
  async login(parent, { email, password }, ctx, info) {
    const errors = [];
    console.log(`Info: ${info}`);
    const user = await ctx.authorizationApi.query.user({ where: { email } });
    if (!user) {
      errors.push({ key: 'email', message: `No such user found for email: ${email}` });
      return { errors };
    }
    if (password !== user.password) {
      // Passwords don't match
      errors.push({ key: 'password', message: `Invalid password` });
      return { errors };
    }

    return {
      token: createToken(user.id),
      user,
    };
  },
};
module.exports = { Authorization };