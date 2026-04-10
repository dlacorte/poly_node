import type { Division } from '../types'

export const DIVISIONS: Division[] = ['4n', '8n', '8t', '16n']

export function divisionLabel(division: Division): string {
  const labels: Record<Division, string> = {
    '4n': '¼',
    '8n': '⅛',
    '8t': '⅛T',
    '16n': '¹⁄₁₆',
  }
  return labels[division]
}
