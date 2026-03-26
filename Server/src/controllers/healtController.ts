import type { Request, Response } from "express";

const healthcheaker = (req:Request, res:Response) => {
    res.send("Hello world server is healthy");
}

export default healthcheaker;