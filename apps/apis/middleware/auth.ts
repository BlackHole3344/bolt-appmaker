import type { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { token_payload } from "../types/token";
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET=`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4YhANYmtKFpgzgaucefJ
X4DueEoZyQqIEcwZIX10FCeQib8CGBJvMrIadSvZwZnZvsSh+11ynk1fXGAhtBfb
Tnxo/4jUVapT+Yl0s+7kHhK5AGaLZOULCrH2K8wAkD+/pMuBj6zWJMdPBRt+bOcl
V79AjsXwQL5T5+iVVVBG5PGzondchvELzGVyft/pcIcgbgWZqyACoT8lhEsRTG1f
7ZHQPM+z97oQBJnEcLWhtQRwfiGfIuk/FqJWG+EPgk+VVKITBleid26onxeTcA91
zJtgXwzq3KLAC8TskrvOoeD9qB30Q4WvPig5PZ/Ah2j1RaD9RvKgRRrIc85Ql20V
uQIDAQAB
-----END PUBLIC KEY-----
`
 

const Auth = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Authentication token is missing" });
      return;
    }
    console.log(token);


      const decoded = jwt.verify(token, JWT_SECRET, {
        algorithms: ["RS256"],
      }) ; 

      console.log(decoded)
 

      req.userId = (decoded as any).sub; 
      next();

  };
};

export default Auth;
