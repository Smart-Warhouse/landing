/**
 * Parts cost per forklift, grouped from docs/00-sources/parts-bom.pdf (selected parts, quantity per
 * forklift, IQD). Group names live in the copy dictionaries (`bom.groups`, same order). The groups
 * must add up to the list's stated total; `bom.test.ts` checks it.
 *
 * compute    Jetson 995,000 · NVMe SSD 66,000 · ESP32-S3 Zero 9,250
 * sensing    RPLIDAR C1 185,000 · Camera Module 3 68,000 · 6× VL53L1X 99,000 · MPU9250 18,500
 * fork       AS5600 3,500 · 2× TCRT5000 2,000 · 2× limit 1,000 · slide pot 4,000 · TCA9548A 4,000
 * power      4× 18650 22,000 · BMS 3,000 · holder 1,250 · XL4015 2,250 · INA219 5,500 · TXS0108E 2,750
 * actuation  2× MX1508 5,500 · MG90S 5,000 · E-Stop 3,000 · WS2812 ring 1,250 · buzzer 500
 */
export const BOM_GROUPS_IQD = [1_070_250, 370_500, 14_500, 36_750, 15_250] as const;

/** Total per forklift as printed on the parts list. */
export const BOM_TOTAL_IQD = 1_507_250;

/** Jetson Orin Nano Super, the single largest line. */
export const BOM_JETSON_IQD = 995_000;

/** 3 working forklifts + 1 spare. */
export const FLEET_SIZE = 4;

export function formatIqd(value: number): string {
  // Latin digits with thousands separators in both languages: the parts list and the dashboard use
  // them, and the figures sit in LTR-pinned cells.
  return new Intl.NumberFormat('en-US').format(value);
}
