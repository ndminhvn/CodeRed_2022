import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';

import './Search.css';

const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

const Search = () => {
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [resultDisplay, setResultDisplay] = useState(false);

    useEffect(() => {
        if (isLoading) {
        simulateNetworkRequest().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);

    const handleLoading = () => setLoading(true);

    const handleSearch = e => {
        let searchValue = e.target.value;
        setValue(searchValue);
        (searchValue !== 'Search by Location') ? setResultDisplay(true) : setResultDisplay(false);
        // console.log(resultDisplay);
        // console.log(e.target.value);
    };

    return (
        <>
        <div id="search-container">
            <div>
                <Form.Select id="form-section" 
                    aria-label="Default select example"
                    value={value}
                    onChange={handleSearch}
                >
                    <option>Search by Location</option>
                    <option value="Alaska">Alaska</option>
                    <option value="East Coast">East Coast</option>
                    <option value="West Coast">West Coast</option>
                    <option value="Federal Offshore - Gulf of Mexico">Federal Offshore - Gulf of Mexico</option>
                    <option value="Midwest">Midwest</option>
                    <option value="Texas">Texas</option>
                </Form.Select>
            </div>
            <div>
                <Button id="search-btn"
                    variant="secondary"
                    type="submit"
                    disabled={isLoading}
                    onClick={!isLoading ? handleLoading : null}
                >
                    <b>
                        {isLoading ? 'Searching…' : 'Search'}
                    </b>
                </Button>
            </div>
        </div>
        {resultDisplay ?
        <div className="result">
            <Card style={{ width: '30rem' }} >
                <Card.Header>{value}</Card.Header>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        </div> : null}
        </>
    )
}

export default Search;