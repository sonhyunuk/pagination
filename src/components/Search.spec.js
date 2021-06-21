import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Serach';
import { expect, it, jest } from '@jest/globals';

describe('<Search/>', () => {
    const props = {
        onChange: jest.fn(),
    }

    function setUp(props) {
        render(<Search {...props} />)
    }

    it('renders Search default component', () => {
        setUp(props);
        /* expact(screen.getByPlaceholderText(/검색어를 입력해주세요./)).toBeInTheDocument(); */
        expect(screen.getByRole('button', { name: /검색/ })).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });


    it('input tag Change value', () => {
        setUp(props);
        let input = screen.getByRole('textbox');
        userEvent.type(input, 'test');
        expect(input).toHaveValue('test');
    });

    it('enter key press search', () => {
        setUp(props);
        let input = screen.getByPlaceholderText(/검색어를 입력해주세요./);
        userEvent.type(input, 'test{enter}');
        expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('handle button click search', () => {
        setUp(props);
        let button = screen.getByRole('button', { name: /검색/ });
        userEvent.click(button);
        expect(props.onChange).toHaveBeenCalledTimes(1);
    })
})