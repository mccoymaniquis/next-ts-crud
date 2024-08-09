import type { AxiosError } from "axios";

export type ErrorResponse = {
  error?: { message: string; title: string } | string;
  debug?: {
    timestamp: Date;
    code: string;
    type: string;
    message: string;
    refId: string;
    path: string;
  };
  path: string;
  timestamp: Date;
  errors?: {
    code: string;
    description: string;
    details: string | null;
    heading: Date;
    message: string;
  }[];
  code?: string;
  data?: any;
} & AxiosError;

export type SearchParams = {
  page: string;
  pageSize: string;
};

export enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}
