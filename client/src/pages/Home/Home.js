import Search from '../../components/Search/Search';
import Globe from '../../components/Globe/Globe';

import './Home.css'

const Home = () => {
    return (
        <>
            <div>
                <Globe />
            </div>
            <div>
                <Search />
            </div>
        </>
    );
}

export default Home;