// =============================================================================
// Directus Errors — Unified error handling for the data layer
// =============================================================================

export class DataLayerError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    details?: unknown
  ) {
    super(message);
    this.name = "DataLayerError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const Errors = {
  notFound: (entity: string, id: string) =>
    new DataLayerError(`${entity} not found: ${id}`, "NOT_FOUND", 404),

  cmsUnavailable: (cause?: string) =>
    new DataLayerError(
      `CMS unavailable${cause ? `: ${cause}` : ""}`,
      "CMS_UNAVAILABLE",
      502
    ),

  validationFailed: (details: unknown) =>
    new DataLayerError("Response validation failed", "VALIDATION_FAILED", 502, details),

  unauthorized: () =>
    new DataLayerError("Unauthorized", "UNAUTHORIZED", 401),
};
