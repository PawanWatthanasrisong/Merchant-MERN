import React from 'react'
import CheckoutStep from '../components/CheckoutStep'
import { Helmet } from 'react-helmet-async'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default function PlaceOrderScreen() {
  return (
    <div>
      <CheckoutStep step1 step2 step3 step4></CheckoutStep>
      <Helmet>
        <title>
            Preview Order
        </title>
      </Helmet>
      <h1 className='my-3'>Preview Order</h1>
      <Row>
        <Col md={8}>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  )
}
