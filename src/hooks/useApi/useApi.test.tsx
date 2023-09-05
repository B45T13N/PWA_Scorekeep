import {renderHook} from '@testing-library/react';
import useApi from './useApi';
import {act} from "react-dom/test-utils";

test('useApi hook fetches data correctly', async () => {
    const apiEndpoint = 'http://example.com/api/data'; // Replace with your API endpoint

    // Simulate a successful API response
    const mockData = { id: 1, name: 'Example Data' };
    global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockData),
    });
    const { result } = renderHook(() => useApi());

    await act(async () => {
        result.current.callApi(apiEndpoint);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toEqual(false);
});

test('useApi hook fetches can throw error', async () => {
    const apiEndpoint = 'http://example.com/api/data'; // Replace with your API endpoint

    // Simulate a successful API response
    global.fetch = jest.fn().mockResolvedValue(new Error('Failed to fetch data'));
    const { result } = renderHook(() => useApi());

    await act(async () => {
        result.current.callApi(apiEndpoint);
    });

    expect(result.current.error).toEqual(true);
    expect(result.current.data).toBe(null);
});
