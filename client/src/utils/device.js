/**
 * Device detection helpers.
 *
 * The user-agent pattern is hoisted to module scope so it is compiled once
 * rather than on every call (see `js-hoist-regexp`).
 */
const MOBILE_USER_AGENT_PATTERN = /android|iphone/i;

/** True when the current device looks like a phone (Android/iPhone). */
export const isMobileDevice = () =>
  MOBILE_USER_AGENT_PATTERN.test(navigator.userAgent);
