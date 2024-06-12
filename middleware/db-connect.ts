import mongoose, {ConnectOptions} from "mongoose";

const MONGO_URI = process.env.MONGO_URI || " ";

//check if the env variable was bound to the running process
if(!MONGO_URI.length){
  throw new Error("Please define the MONGO_URI env variable");
}
//setup connection cache
let cached= global.mongoose;

//if there is no connection cache make one
if(!cached){
  cached = global.mongoose =  {conn:null, promise:null};
}


async function dbConnect():Promise<any>{
  if (cached.conn){ //if there is a connection return it
    return cached.conn;
  }
  if(!cached.promise){ //otherwise
    const opts: ConnectOptions = { //create connection config
      bufferCommands:false,
      maxIdleTimeMS:10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    };
    //connect
    cached.promise = mongoose.connect(MONGO_URI, opts)
      .then((mongoose)=> mongoose)
      .catch((err) => {
        throw new Error(String(err));
      });

  }
  //wait for the promise to resolve
  try{
    cached.conn = await cached.promise;
  }
  catch (err){
    throw new Error(String(err));
  }
  return cached.conn; //return the connection
}
export default dbConnect;


