// This function removes uneccessary spaces from the input string
export const prettyString = (input: string): string => input.trim().replace(/\s+/g, ' ');
