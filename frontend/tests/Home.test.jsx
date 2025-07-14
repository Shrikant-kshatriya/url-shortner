import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Home from '../src/app/page';

jest.mock('axios');

describe('Home component', () => {
    it('calls API on button click when valid URL is entered', async () => {
        // Mock the axios response
        axios.post.mockResolvedValue({
            data: {
                short_url: 'http://localhost/abc123',
                original_url: 'https://example.com',
                code: 'abc123',
            },
        });

        axios.get.mockResolvedValue({
            data: {
                click_count: 5,
            },
        });

        const { getByPlaceholderText, getByText } = render(<Home />);

        const input = getByPlaceholderText(/paste your long url/i);
        const button = getByText(/shorten it!/i);

        fireEvent.change(input, { target: { value: 'https://example.com' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringMatching(/\/api\/shorten/),
                { url: 'https://example.com' }
            );
        });
    });
});
