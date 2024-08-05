import bcrypt from 'bcrypt';

const data = {
    users: [
        {
            name: 'Pawan',
            email: 'admin@example.com',
            password: '123345',
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: '12313123',
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality shirt',
        },
        {
            name: 'Nike Slim Pant',
            slug: 'nike-slim-pant',
            category: 'Pants',
            image: '/images/p2.jpg',
            price: 150,
            countInStock: 1,
            brand: 'Nike',
            rating: 4.2,
            numReviews: 14,
            description: 'high quality pant',
        },
        {
            name: 'Adidas Slim Shirt',
            slug: 'adidas-slim-shirt',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 130,
            countInStock: 5,
            brand: 'Adidas',
            rating: 1,
            numReviews: 13,
            description: 'high quality shirt',
        }
    ]
}

export default data;