export const getUrl = (params: Record<string, string>, route: string): string => {
  const url = new URLSearchParams(params);
  return `${route}?${url}`;
};
