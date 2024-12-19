export const LoadingStates = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type LoadingState = typeof LoadingStates[keyof typeof LoadingStates];

export const isLoading = (state: LoadingState): boolean => {
  return state === LoadingStates.LOADING;
};