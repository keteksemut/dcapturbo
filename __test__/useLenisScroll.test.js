// useLenisScroll.test.js
import { renderHook } from '@testing-library/react';
import useLenisScroll from '../hooks/useGaeroh';

// We'll mock the named export `useStore` from your store module.
let mockState = { lenis: null }; // mutable test state

jest.mock('../store/useStore', () => ({
  useStore: (selector) => selector(mockState),
}));

describe('useLenisScroll', () => {
  beforeEach(() => {
    // reset between tests
    mockState = { lenis: null };
    jest.resetAllMocks();
  });

  test('does nothing if lenis is not set', () => {
    const handler = jest.fn();
    const { unmount } = renderHook(() => useLenisScroll(handler));

    // lenis is null, so on/off should never have been called
    // but we don't have a direct lenis mock here; this test ensures no errors
    unmount(); // should not throw
  });

  test('registers on mount and unregisters on unmount when lenis exists', () => {
    const mockLenis = { on: jest.fn(), off: jest.fn() };
    mockState.lenis = mockLenis;

    const handler = jest.fn();
    const { unmount } = renderHook(() => useLenisScroll(handler));

    expect(mockLenis.on).toHaveBeenCalledTimes(1);
    expect(mockLenis.on).toHaveBeenCalledWith(handler);

    unmount();

    expect(mockLenis.off).toHaveBeenCalledTimes(1);
    expect(mockLenis.off).toHaveBeenCalledWith(handler);
  });

  test('re-registers when handler changes (calls off for old and on for new)', () => {
    const mockLenis = { on: jest.fn(), off: jest.fn() };
    mockState.lenis = mockLenis;

    const handlerA = jest.fn();
    const handlerB = jest.fn();

    const { rerender, unmount } = renderHook(({ cb }) => useLenisScroll(cb), {
      initialProps: { cb: handlerA },
    });

    // initial registration
    expect(mockLenis.on).toHaveBeenCalledWith(handlerA);

    // change handler -> should remove old and register new
    rerender({ cb: handlerB });

    // off called for handlerA, on called for handlerB
    expect(mockLenis.off).toHaveBeenCalledWith(handlerA);
    expect(mockLenis.on).toHaveBeenCalledWith(handlerB);

    unmount();
    // the last registered handler (handlerB) should be unregistered at unmount
    expect(mockLenis.off).toHaveBeenCalledWith(handlerB);
  });

  test('accepts a second argument for deps (arguments[1]) and re-runs when deps change', () => {
    const mockLenis = { on: jest.fn(), off: jest.fn() };
    mockState.lenis = mockLenis;

    const handler = jest.fn();
    const dep1 = { value: 1 };

    // renderHook supports passing multiple args by calling the hook with them
    const { rerender } = renderHook(
      ({ cb, deps }) => useLenisScroll(cb, deps),
      { initialProps: { cb: handler, deps: [dep1] } }
    );

    expect(mockLenis.on).toHaveBeenCalledWith(handler);

    // change the deps array content -> should re-run effect (off/on)
    const dep2 = { value: 2 };
    rerender({ cb: handler, deps: [dep2] });

    // handler is the same, but because hook spreads [...i] in deps, effect runs again:
    // You should see off then on again (off called with same handler)
    expect(mockLenis.off).toHaveBeenCalledWith(handler);
    expect(mockLenis.on).toHaveBeenCalledWith(handler);
  });
});
