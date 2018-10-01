const AuthPayload = {
  user: async ({ user: { id } }, args, ctx, info) =>
    ctx.authorizationApi.query.user({ where: { id } }, info)
};

module.exports = { AuthPayload };
