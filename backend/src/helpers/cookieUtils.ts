import { Response } from "express";
import { CookieOptions } from "../interfaces";
import {
  COOKIE_MAX_AGE_EXPIRATION_MS,
  COOKIE_EXPIRES_ONE_DAY_MS,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
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
    sameSite: true,
  };
  const cookieOptions = { ...defaultOptions, ...options };
  res.cookie(name, value, cookieOptions);
};

const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  setCookie(res, ACCESS_TOKEN, accessToken, {
    expires: new Date(Date.now() + COOKIE_MAX_AGE_EXPIRATION_MS),
  }); // 5 minutes
  setCookie(res, REFRESH_TOKEN, refreshToken, {
    expires: new Date(Date.now() + COOKIE_EXPIRES_ONE_DAY_MS),
  }); // 1 day
};

const clearCookies = (res: Response) => {
  const defaultOptions: CookieOptions = {
    secure: process.env.NODE_ENV === "production",
    signed: true,
    httpOnly: true,
    sameSite: true,
  };
  res
    .clearCookie(ACCESS_TOKEN, {
      ...defaultOptions,
    })
    .clearCookie(REFRESH_TOKEN, {
      ...defaultOptions,
    });
};

export { setCookie, setAuthCookies, clearCookies };
