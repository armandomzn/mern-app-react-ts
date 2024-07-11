const JOB_STATUS = {
  PENDING: "pending",
  INTERVIEW: "interview",
  DECLINED: "declined",
};

const JOB_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERNSHIP: "internship",
};

const JOB_SORT = {
  NEWEST: "newest",
  OLDEST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
};

const ACCESS_TOKEN_EXPIRY = "5m";
const REFRESH_TOKEN_EXPIRY_MS = 1000 * 60 * 60 * 24;
const COOKIE_MAX_AGE_EXPIRATION_MS = 1000 * 60 * 5;
const COOKIE_EXPIRES_ONE_DAY_MS = 1000 * 60 * 60 * 24;

export {
  JOB_STATUS,
  JOB_TYPE,
  JOB_SORT,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MS,
  COOKIE_MAX_AGE_EXPIRATION_MS,
  COOKIE_EXPIRES_ONE_DAY_MS,
};
