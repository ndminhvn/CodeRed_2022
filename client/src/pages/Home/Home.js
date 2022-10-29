import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import Globe from '../../components/Globe/Globe';

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

const Home = () => {
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
        <div>
            <Container className="w-50 mt-5 d-flex justify-content-center" 
                // style={ {border:"solid 1px green"}}
            >
                <Form>
                <Form.Select aria-label="Default select example">
                    <option>Search by Location</option>
                    <option value="1">Alaska</option>
                    <option value="2">Federal Offshore - Gulf of Mexico</option>
                    <option value="5">Midwest</option>
                    <option value="6">Northeast</option>
                    <option value="7">Southeast</option>
                    <option value="1">Texas</option>
                    <option value="3">West Coast</option>
                </Form.Select>
                </Form>
                <Button className="justify-content-end"
                variant="primary"
                type="submit"
                disabled={isLoading}
                onClick={!isLoading ? handleSearch : null}
                >
                {isLoading ? 'Searching…' : 'Search'}
                </Button>
            </Container>
            <Globe />
        </div>
    );
}

export default Home;