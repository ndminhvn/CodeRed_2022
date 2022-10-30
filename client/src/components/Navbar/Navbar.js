import { Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.css'

const NavBar = () => {
  return (
	<div className='main-nav'>
		<Navbar>
			<Container>
				<Navbar.Brand>
					<h1 style={{
						color:"white",
						fontFamily:"Times New Roman"
						}}
					>
						SWE Duo Team
					</h1>
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