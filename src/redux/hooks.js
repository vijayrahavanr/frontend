// Consolidated from hooks/useAppDispatch.js + hooks/useAppSelector.js
// during the enterprise folder-structure migration (redux/hooks.js).
// Both were previously exported as both named + default; only the named
// form was used anywhere in the codebase, so the default exports were
// dropped here rather than kept as two conflicting `export default`
// statements in one module (which is a syntax error).

import { useDispatch, useSelector } from 'react-redux';

/**
 * Thin wrapper around react-redux's useDispatch.
 * Kept as a dedicated hook so it's the single place to evolve
 * (e.g. add typed dispatch via JSDoc) without touching every component.
 */
export const useAppDispatch = () => useDispatch();

/**
 * Thin wrapper around react-redux's useSelector.
 * Centralizes selector access for future typing / memoization needs.
 */
export const useAppSelector = (selectorFn) => useSelector(selectorFn);


