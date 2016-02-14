export const GET_CONFIG = 'GET_CONFIG';

export function getConfig(value) {
  return {
    type: GET_CONFIG,
    payload: value
  };
}
