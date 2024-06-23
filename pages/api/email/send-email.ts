import {NextApiRequest, NextApiResponse} from "next";
import axios from 'axios';
export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const data = await fetchManagementToken();
  console.log(data);
  res.status(200).json({token:data});
}



async function fetchManagementToken(){
  try{
    const options = {
      method: "POST",
      url:'https://dev-r7lqz0ea5g3p461d.us.auth0.com/oauth/token',
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type:"client_credentials",
        client_id: "Zse54Y3JPjYUg2o07xILOb16ZTbghr6W",
        client_secret:"p3JQqK3FrJprvGJGR6MczOF7RRxN0aD5R_rz706XwucpzoSXi-yIR833XK3Lv7_j",
        audience: 'https://dev-r7lqz0ea5g3p461d.us.auth0.com/api/v2/'
      }),
    };
    const data = await axios.request(options);

    return data.data["access_token"];
  }
  catch(err){
    console.log(err);
  }
}