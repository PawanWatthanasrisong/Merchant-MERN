import React, { useContext } from 'react'
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Col from 'react-bootstrap/Col'
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import  Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import axios from 'axios';

export default function CartScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {cartItems}
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: {...item, quantity}});
    }

    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item});
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }
  
    return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
        {
            cartItems.length === 0? (
                <MessageBox>
                    Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
            ):
            (
                <ListGroup>
                    {cartItems.map((item) => (
                        <ListGroupItem key={item.id}>
                            <Row className='align-items-center'>
                                <Col md={4}>
                                    <img
                                        className="img-fluid rounded img-thumbnail"
                                        src={item.image}
                                        alt={item.name}
                                    />{'   '}
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>
                                    <Button variant='light' disabled={item.quantity === 1} onClick={() => updateCartHandler(item, item.quantity-1)}>
                                        <i className='fas fa-minus-circle'>-</i>
                                    </Button> {'  '}
                                    <span>{item.quantity}</span>
                                    <Button variant='light' disabled={item.quantity === item.countInStock} onClick={() => updateCartHandler(item, item.quantity+1)}>
                                        <i className='fas fa-plus-circle'>+</i>
                                    </Button> 
                                </Col>
                                <Col md={3}>
                                    <span>
                                        ${item.price}
                                    </span>
                                </Col>
                                <Col md={2}>
                                    <Button variant='danger' onClick={() => removeItemHandler(item)} >
                                        DELETE
                                    </Button> 
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )
        }
        </Col>
        <Col md={4}>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>
                                Subtotal({cartItems.reduce((a,c) => a + c.quantity, 0)}{'  '}items) : $
                                {cartItems.reduce((a,c) => a + c.price * c.quantity,0)}
                            </h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <div className='d-grid'>
                                <Button
                                    type='button'
                                    variant='primary'
                                    disabled={cartItems.length === 0}
                                onClick={checkoutHandler}>
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  )
}
