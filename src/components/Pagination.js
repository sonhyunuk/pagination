import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.totalCount !== prevProps.totalCount) {
            this.changePage(1, this.props.itemPerPage);
        }
    }

    changePage(page, itemPerPage) {
        this.setState({ currentPage: page });
        this.props.onChange((page - 1) * itemPerPage, itemPerPage);
    }

    render() {
        let { totalCount, itemPerPage, pagePerView } = this.props;
        let { currentPage } = this.state;

        let totalPage = Math.ceil(totalCount / itemPerPage);
        let startPage, endPage;

        if (totalPage <= pagePerView) {
            startPage = 1;
            endPage = totalPage;
        } else {
            if (currentPage <= (pagePerView / 2 + 1)) {
                startPage = 1;
                endPage = pagePerView;
            } else if (currentPage + (pagePerView / 2 - 1) >= totalPage) {
                startPage = totalPage - (pagePerView - 1);
                endPage = totalPage;
            } else {
                startPage = currentPage - (pagePerView / 2);
                endPage = currentPage + (pagePerView / 2 - 1);
            }
        }
        // let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        let pages = [];
        for (let i = startPage; i < endPage + 1; i++) {
            pages.push(i);
        };

        return (
            <>
                <ul className="pagination">
                    <li>
                        <button className={currentPage === 1 ? 'btn disabled' : 'btn'} onClick={() => this.changePage(1, itemPerPage)}>처음</button>
                    </li>
                    {pages.map((page, index) =>
                        <li key={index}>
                            <button className={currentPage === page ? 'btn btn-dark' : 'btn'} onClick={() => this.changePage(page, itemPerPage)}>{page}</button>
                        </li>
                    )}
                    <li>
                        <button className={currentPage === totalPage ? 'btn disabled' : 'btn'} onClick={() => this.changePage(totalPage, itemPerPage)}>끝</button>
                    </li>
                </ul>
                <h1>Test</h1>
            </>
        );
    }
}

Pagination.propTypes = {
    totalCount: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    itemPerPage: PropTypes.number,
    pagePerView: PropTypes.number,
}
Pagination.defaultProps = {
    totalCount: 0,
    itemPerPage: 10,
    pagePerView: 10,
}