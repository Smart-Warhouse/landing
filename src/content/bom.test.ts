import { describe, expect, it } from 'vitest';
import { BOM_GROUPS_IQD, BOM_JETSON_IQD, BOM_TOTAL_IQD, formatIqd } from '@/content/bom';
import { ar } from '@/i18n/copy/ar';

describe('parts cost', () => {
  it('groups add up to the total printed on the parts list', () => {
    expect(BOM_GROUPS_IQD.reduce((a, b) => a + b, 0)).toBe(BOM_TOTAL_IQD);
  });

  it('has one copy label per group', () => {
    expect(ar.bom.groups).toHaveLength(BOM_GROUPS_IQD.length);
  });

  it('backs the "about two thirds" note', () => {
    const share = BOM_JETSON_IQD / BOM_TOTAL_IQD;
    expect(share).toBeGreaterThan(0.6);
    expect(share).toBeLessThan(0.7);
  });

  it('formats with Latin digits and thousands separators', () => {
    expect(formatIqd(BOM_TOTAL_IQD)).toBe('1,507,250');
  });
});
