import type { ApiError } from "@asahome/shared-types";

export class ApiClientError extends Error {
  public readonly code: string;
  public readonly requestId: string;
  public readonly statusCode?: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    code: string,
    requestId: string,
    statusCode?: number,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiClientError";
    this.code = code;
    this.requestId = requestId;
    this.statusCode = statusCode;
    this.details = details;
  }

  static fromApiError(
    error: ApiError,
    statusCode?: number
  ): ApiClientError {
    return new ApiClientError(
      error.message,
      error.code,
      error.requestId,
      statusCode,
      error.details
    );
  }
}

export function isApiClientError(error: unknown): error is ApiClientError {
  return error instanceof ApiClientError;
}
