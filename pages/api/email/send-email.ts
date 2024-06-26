import {NextApiRequest, NextApiResponse} from "next";
import axios from 'axios';
import {Resend} from "resend";



export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const resend = new Resend(process.env.RESEND_KEY);
  const token = await fetchManagementToken();
  const users  = await getUsers(token);
  const emails:string[] = [];

  for(let i = 0; i < users['data'].length; i++){
    emails.push(users['data'][i].email);
  }
  for(let i = 0; i< emails.length; i++){
    await resend.emails.send({
      from:'reminder@tacompanion.com',
      to: emails[i],
      subject: 'Log your hours!',
      html: '<p> This is your weekly reminder to log your hours in Workday! Visit  <strong>workday.wpi.edu</strong> to do so!</p>'
    });
    setTimeout(() => {  console.log(''); }, 2000);



  }
  res.status(200).json(emails);
}


async function getUsers(token:string){
  const queryOptions = {
    method: 'GET',
    url: 'https://dev-r7lqz0ea5g3p461d.us.auth0.com/api/v2/users',
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
  const data = await axios.request(queryOptions);
  return data;


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

    return data['data']['access_token'];
  }
  catch(err){
    console.log(err);
  }
}