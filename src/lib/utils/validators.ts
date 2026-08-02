export const VALIDATORS = {
  // GitHub handles: max 39 chars, alphanumeric and single hyphens
  github: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
  
  // LeetCode: alphanumeric, dash, underscore
  leetcode: /^[a-zA-Z0-9_-]{1,40}$/,
  
  // Codeforces: alphanumeric, dash, underscore, 3-24 chars
  codeforces: /^[a-zA-Z0-9_-]{3,24}$/,
  
  // CodeChef: alphanumeric, underscore, 3-40 chars
  codechef: /^[a-zA-Z0-9_]{3,40}$/
};

export function validateHandle(platform: keyof typeof VALIDATORS, handle: string): boolean {
  if (!handle || typeof handle !== 'string') return false;
  return VALIDATORS[platform].test(handle);
}
