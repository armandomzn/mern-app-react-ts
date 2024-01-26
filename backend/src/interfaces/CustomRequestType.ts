import { Request } from "express";
import { JwtPayload } from "./JwtPayloadProps";

export type CustomRequest = Request & { user: JwtPayload };
