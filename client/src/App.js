
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import HomeScreen from './pages/HomeScreen';
import ProductScreen from "./pages/ProductScreen";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './pages/CartScreen';
import SignInScreen from './pages/SignInScreen';
import NavDropdown from 'react-bootstrap/NavDropdown'
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { getError } from './utils';
import SearchBox from './components/SearchBox';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const {data} = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);
  return (
    <div 
      className={
        sidebarIsOpen
        ? "d-flex flex-column site-container active-cont"
        : 'd-flex flex-column site-container'
      }>
      <ToastContainer position="bottom-center" limit={1} />
      <header className="App-header">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Button
              variant="dark"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                <i className='fas fa-bars'></i>
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' >
              <SearchBox />
            <Nav className="me-auto w-100 justify-content-end">
              <Link to="/cart" className='nav-link'>
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                </Badge>
              )}
              </Link>
              {userInfo? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className='dropdown-item'
                    to='#signout'
                    onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </NavDropdown>
              ): (
                <Link className="nav-link" to='/signin'>Sign In</Link>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div
        className={
          sidebarIsOpen
          ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
          : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <Nav className='flex-column text-white w-100 p-2'>
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              <Link to={`/search?category=${category}`}
              onClick={() => setSidebarIsOpen(false)}
              >
                {category}
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <main>
        <Container className='mt-3'>
              <Outlet/>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All right reserved</div>
      </footer>
    </div>
  );
}

export default App;
