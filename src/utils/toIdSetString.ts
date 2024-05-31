import { ObjectWithNameAndId } from '../types/objectWithNameAndId';

const toIdSetString = <T extends ObjectWithNameAndId>(items: T[]): string => Array.from(new Set(items.map((obj) => obj.id))).join(',');

export default toIdSetString;
