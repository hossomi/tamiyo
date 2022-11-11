import { Set, sets } from '@tamiyo/shared'

export function getSets(): Set[] {
    return sets
}

export function getSet(code: string): Set | undefined {
    return sets.find(set => set.code === code)
}