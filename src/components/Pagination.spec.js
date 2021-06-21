import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import { expect, it, jest } from '@jest/globals';

describe('<Pagination/>', () => {
    const props = {
        totalCount: 151,
        onChange: jest.fn(),
    }

    function setUp(props) {
        render(<Pagination {...props} />)

    }
    it('render default Pagination Component', () => {
        render(<Pagination />)
        /* setUp(props); */
        expect(screen.getByRole('list').classList.contains('pagination')).toBe(true);
        expect(screen.getAllByRole('listitem').length).toBe(2);
        expect(screen.getByRole('button', { name: /처음/ })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /끝/ })).toBeInTheDocument();
    });

    it('render props Pagination Componet', () => {
        setUp(props);
        expect(screen.getAllByRole('listitem').length).toBe(12);
    });

    it('Page first,last button Click ', () => {
        setUp(props);
        let firstButton = screen.getByRole('button', { name: /처음/ });
        let lastButton = screen.getByRole('button', { name: /끝/ });
        userEvent.click(firstButton);
        expect(screen.getByRole('button', { name: /10/ })).toBeInTheDocument();
        userEvent.click(lastButton);
        /*  screen.debug(screen.getAllByRole('button')); */
        expect(screen.getByRole('button', { name: /16/ })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /17/ })).not.toBeInTheDocument();

    })

    it('Click pageButton disable test', () => {
        setUp(props);
        /* first render  */
        let firstButton = screen.getByRole('button', { name: /처음/ });
        let lastButton = screen.getByRole('button', { name: /끝/ });
        expect(firstButton.classList.contains('disabled')).toBe(true);
        userEvent.click(lastButton)
        expect(lastButton.classList.contains('disabled')).toBe(true);
    })
})