import { renderHook, waitFor } from '@testing-library/react'
import useFetch from '../hooks/useFetch'

describe('useFetch', () => {
  it('returns fetched data from the given URL', async () => {
    // Mock fetch to return fake data instantly, no real network call
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'Mock Coffee' }])
      })
    ))

    // renderHook lets you call a hook outside of a component, 
    // and gives you back a `result` object whose `.current` reflects the hook's return value
    const { result } = renderHook(() => useFetch('http://fake-url.com/coffee'))

    // Immediately after rendering, the fetch hasn't resolved yet — data should still be null
    expect(result.current).toBe(null)

    // waitFor repeatedly re-checks its condition until it passes (or times out) —
    // needed here because the fetch's Promise resolves asynchronously, not instantly
    await waitFor(() => {
      expect(result.current).toEqual([{ id: 1, name: 'Mock Coffee' }])
    })
  })
})