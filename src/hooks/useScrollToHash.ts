import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * The browser tries to jump to `#id` before React has rendered the section, so a shared link like
 * `/en#safety` would land at the top. Once the page has rendered, scroll the target into view.
 * Malformed hashes are ignored.
 */
export function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash || hash.length < 2) return;
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    document.getElementById(id)?.scrollIntoView?.();
  }, [hash]);
}
