import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.css'

const NavBar = () => {
  return (
	<div className='main-nav'>
		<Navbar>
			<Container>
				<Navbar.Brand>
					<Nav.Link href={`${window.location.protocol}//${window.location.host}`}>
					<h1 style={{
						// color:"white",
						fontFamily:"Times New Roman"
						// fontFamily: '"Great Vibes", cursive'
						}}
					>
						SWE Duo Team
					</h1>
					</Nav.Link>
				</Navbar.Brand>
			</Container>
			<Navbar.Toggle />
			<Navbar.Collapse className='justify-content-end'>
				<Nav.Link href='https://github.com/ndminhvn/CodeRed_2022' target='_blank'>
					GitHub
				</Nav.Link>
			</Navbar.Collapse>
		</Navbar>

		<Outlet />
	</div>
	)
};

export default NavBar;