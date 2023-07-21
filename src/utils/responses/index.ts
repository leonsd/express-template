import { HttpStatus } from '../../enums/httpStatus';
import IErrorResponse from '../../interfaces/ErrorResponse';

const headers = {
  'content-type': 'application/json',
};

export const response = {
  success: {
    ok: <T>(body: T) => {
      return {
        statusCode: HttpStatus.OK,
        headers,
        body,
      };
    },
    created: <T>(body: T) => {
      return {
        statusCode: HttpStatus.CREATED,
        headers,
        body,
      };
    },
  },
  error: {
    badRequest: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        headers,
        body,
      };
    },
    forbidden: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        headers,
        body,
      };
    },
    notFound: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        headers,
        body,
      };
    },
    conflict: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.CONFLICT,
        headers,
        body,
      };
    },
    internal: (body: IErrorResponse) => {
      return {
        statusCode: HttpStatus.INTERNAL,
        headers,
        body,
      };
    },
  },
};
