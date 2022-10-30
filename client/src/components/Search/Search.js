import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Accordion } from 'react-bootstrap';

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
                <Card.Header><i>Oil/Gas Production Summary</i></Card.Header>
                <Card.Body>
                    <Card.Title><b>{value}</b></Card.Title>
                    <Card.Text>
                        {regionData.map((regionalData, index) => {
                            return (
                                regionalData.region === value ? 
                                `Total Production: ${regionalData.totalProd}` : null
                            )
                        })}
                    </Card.Text>
                    <Card.Text>
                        {regionData.map((regionalData, index) => {
                            return (
                                regionalData.region === value ? 
                                `Total Share of US Production: ${regionalData.sharePercent}` : null
                            )
                        })}
                    </Card.Text>
                </Card.Body>
                <Card.Body>List of Wells:
                    {regionData.map((regionalData, index) => {
                        return (
                            regionalData.region === value ? 
                            <Accordion key={index}>
                            {regionalData.listWell.map((well, id) => {
                                return (
                                    <Accordion.Item eventKey={id}>
                                        <Accordion.Header>
                                            Well: {well.name}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p>Type: {well.type}</p>
                                            <p>Company: {well.company}</p>
                                            <p>Location: {well.location}</p>
                                            <p>Field: {well.field}</p>
                                            <p>BOE: {well.BOE}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )})
                            }
                            </Accordion> : null
                        )
                    })}
                </Card.Body>
            </Card>
        </div> : null
        }
        </>
    )
}

export default Search;