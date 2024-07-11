import { Response } from "express";
import { CookieOptions } from "../interfaces";
import {
  COOKIE_MAX_AGE_EXPIRATION_MS,
  COOKIE_EXPIRES_ONE_DAY_MS,
} from "./constants";

const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  };
  const cookieOptions = { ...defaultOptions, ...options };
  res.cookie(name, value, cookieOptions);
};

const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  setCookie(res, "accessToken", accessToken, {
    maxAge: COOKIE_MAX_AGE_EXPIRATION_MS,
  }); // 5 minutes
  setCookie(res, "refreshToken", refreshToken, {
    expires: new Date(Date.now() + COOKIE_EXPIRES_ONE_DAY_MS),
  }); // 1 day
};

export { setCookie, setAuthCookies };
