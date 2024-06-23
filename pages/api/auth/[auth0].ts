import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import {NextApiRequest, NextApiResponse} from "next";

export default handleAuth({
  async login(req:NextApiRequest, res:NextApiResponse) {
    try {
      await handleLogin(req, res, {
        returnTo: '/todo'
      });
    } catch (error:any) {
      console.error(error);
      res.status(error.status || 500).end(error.message);
    }
  }
});
