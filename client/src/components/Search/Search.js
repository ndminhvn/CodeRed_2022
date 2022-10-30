import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

import './Search.css';

const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

const Search = () => {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
        simulateNetworkRequest().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);

    const handleSearch = () => setLoading(true);
    return (
        <div id="search-container">
            <div >
                <Form.Select id="form-section" aria-label="Default select example">
                    <option>Search by Location</option>
                    <option value="1">Alaska</option>
                    <option value="2">Federal Offshore - Gulf of Mexico</option>
                    <option value="3">Midwest</option>
                    <option value="4">Northeast</option>
                    <option value="5">Southeast</option>
                    <option value="6">Texas</option>
                    <option value="7">West Coast</option>
                </Form.Select>
                {/* <Form>
                </Form> */}
            </div>
            <div>
                <Button id="search-btn"
                    variant="secondary"
                    type="submit"
                    disabled={isLoading}
                    onClick={!isLoading ? handleSearch : null}
                >
                    <b>
                        {isLoading ? 'Searching…' : 'Search'}
                    </b>
                </Button>
            </div>
        </div>
    )
}

export default Search;