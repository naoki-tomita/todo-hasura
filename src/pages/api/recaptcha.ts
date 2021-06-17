import { NextApiHandler } from "next";

const SecretKey = "6LduqzobAAAAAMopnDilJGfHLwOfvybYOsOyBPbc";
const handler: NextApiHandler = async (req, res) => {
  if (req.method.toUpperCase() === "POST") {
    const { token } = req.body;
    console.log(token);
    const params = new URLSearchParams();
    params.append("secret", SecretKey);
    params.append("response", token);
    const result = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: params,
      }
    );
    if (result.ok) {
      const json: {
        success: boolean;
        challenge_ts: number;
        hostname: string;
        "error-codes"?: any[];
      } = await result.json();
      return res.json(json);
    }
    return res.writeHead(400).end("Error");
  }
  res.writeHead(405).end("Error");
};

export default handler;
