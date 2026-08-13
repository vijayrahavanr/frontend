import { useEffect, useRef } from 'react';

const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

/**
 * Calls `onWarning` after `timeout - warningBefore` ms of no tracked
 * user activity, then `onIdle` after the full `timeout` — any tracked
 * activity resets both timers. Used to show an idle-timeout warning
 * dialog before auto-logging the user out.
 *
 * @param {object} options
 * @param {boolean} options.enabled
 * @param {number} options.timeout - total idle time (ms) before onIdle fires
 * @param {number} [options.warningBefore] - ms before timeout to fire onWarning
 * @param {() => void} options.onIdle
 * @param {() => void} [options.onWarning]
 */
export const useIdleTimeout = ({
  enabled = true,
  timeout = 20 * 60 * 1000,
  warningBefore = 60 * 1000,
  onIdle,
  onWarning,
}) => {
  const idleTimer = useRef(null);
  const warningTimer = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const clearTimers = () => {
      clearTimeout(idleTimer.current);
      clearTimeout(warningTimer.current);
    };

    const resetTimers = () => {
      clearTimers();
      if (warningBefore > 0 && warningBefore < timeout) {
        warningTimer.current = setTimeout(() => onWarning?.(), timeout - warningBefore);
      }
      idleTimer.current = setTimeout(() => onIdle?.(), timeout);
    };

    resetTimers();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetTimers, { passive: true }));

    return () => {
      clearTimers();
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimers));
    };
  }, [enabled, timeout, warningBefore, onIdle, onWarning]);
};

export default useIdleTimeout;
