// =============================================================================
// Character Core (Phase 3 stub)
// =============================================================================
// Placeholder module for Character Manifest schema validation, state machine,
// resource resolution, animation timing, and event definitions.
//
// This module MUST NOT depend on DOM, Next.js, or Tauri.
// Real implementation deferred to Phase 3.
// =============================================================================

export type { CharacterManifest, CharacterState } from "@asahome/shared-types";

/**
 * Stub: validate a Character Manifest against the schema.
 * Phase 3 will implement full validation (schemaVersion, file hashes,
 * file count, individual file size, total package size).
 */
export function validateManifest(_manifest: unknown): { valid: boolean; errors: string[] } {
  return { valid: false, errors: ["Not implemented — Phase 3 placeholder"] };
}

/**
 * Stub: resolve a state key to its definition, falling back to defaultState.
 */
export function resolveState(
  _manifest: { defaultState: string; states: Record<string, unknown> },
  _stateKey: string
): unknown {
  return null;
}

/**
 * Stub: compute the next state given an event.
 */
export function transition(
  _currentState: string,
  _event: string,
  _manifest: unknown
): string {
  return _currentState;
}
