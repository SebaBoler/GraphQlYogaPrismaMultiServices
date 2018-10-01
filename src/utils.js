import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const verifyOptions = {
  expiresIn: '15m',
  algorithm: 'HS384',
};

class AuthError extends Error {
  constructor() {
    super('Srry hacker, you are not invited here');
  }
}

// async function isLogIn(userId, ctx) {
//   const authorization = await ctx.db.query.authorization({
//     where: { userId },
//   });
//   if (authorization) {
//     return authorization.loggedIn;
//   }
//   return false;
// }

async function validateToken(ctx) {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.SERVER_SECRET, verifyOptions);

    if (!(await isLogIn(userId, ctx))) {
      throw new Error('Invalid token (user is logout)');
    }
    return token;
  }
  throw new AuthError();
}

async function getUserId(ctx) {
  const token = await validateToken(ctx);
  const { userId } = jwt.decode(token, process.env.SERVER_SECRET, verifyOptions);
  return userId;
}

function getTimeNow() {
  const d = new Date();
  const insertDate = d.getTime();
  return insertDate;
}

function createToken(userId) {
  const token = jwt.sign({ userId }, process.env.SERVER_SECRET, verifyOptions);
  return token;
}

module.exports = {
  getUserId,
  validateToken,
  createToken,
//   isLogIn,
  AuthError,
};
