import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';

import './Search.css';

const delayInMilliseconds = 1000;

const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
}

const Search = () => {
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [resultDisplay, setResultDisplay] = useState(false);
    const [regionData, setRegionData] = useState([]);

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
                (value !== 'Search by Location') ? setResultDisplay(true) : setResultDisplay(false);
            });
        }
    }, [isLoading,value]);
    
    const handleLoading = () => setLoading(true);
        
    const handleSearch = e => {
        setValue(e.target.value);
        setResultDisplay(false);
    }

    const getData = () => {
        fetch('regionalData.json',
            {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(regionData => setRegionData(regionData))
        .catch(error => console.log(error));
    } 

    useEffect(() => {
      getData()
    }, [])

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
                    {regionData.map((regionalData, index) => {
                        return (
                            <option key={index} value={regionalData.region}>{regionalData.region}</option>
                        )
                    })}
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