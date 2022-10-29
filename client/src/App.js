import { React, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoPage from './components/NoPage/NoPage';
import './App.css';

const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./pages/Home/Home'));

const App = () => {
  return (
    <div className='main-app'>
      <Router>
        <Suspense>
					<Navbar />
					<Routes>
						<Route path='/' index element={<Home />} />
						<Route path='*' element={<NoPage />} />
					</Routes>
        </Suspense>
			</Router>
    </div>
  );
}

export default App;
