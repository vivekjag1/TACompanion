import {NextApiResponse, NextApiRequest} from "next";
import {getAccessToken} from "@auth0/nextjs-auth0";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const token = await getAccessToken();
  res.status(200).json({token:token});
}