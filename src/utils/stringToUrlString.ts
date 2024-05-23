import { prettyString } from './prettyString';

// This function removes uneccessary spaces and replaces the rest of them with '%20'
export const stringToUrlString = (input: string): string => prettyString(input).replace(/ /g, '%20');
