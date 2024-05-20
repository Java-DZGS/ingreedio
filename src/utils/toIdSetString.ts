import { WithId } from '../types/types'

const toIdSetString = <T extends WithId>(items: T[]): string => Array.from(new Set(items.map((obj) => obj.id))).join(',');
