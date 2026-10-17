import { ArrowDownIcon, ArrowUpLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import { useLocale } from '@/i18n/locale';

/** "Leaves this page" arrow, mirrored for RTL (directional glyphs only are mirrored). */
export function ExternalArrow({ size = 16 }: { size?: number }) {
  const { isRtl } = useLocale();
  const Icon = isRtl ? ArrowUpLeftIcon : ArrowUpRightIcon;
  return <Icon size={size} aria-hidden="true" />;
}

/** "Further down this page" arrow (not directional across languages). */
export function DownArrow({ size = 16 }: { size?: number }) {
  return <ArrowDownIcon size={size} aria-hidden="true" />;
}
