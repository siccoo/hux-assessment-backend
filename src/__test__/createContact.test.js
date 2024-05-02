const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Create Contact Endpoint', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new contact', async () => {
        const newContact = {
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890'
        };

        const response = await request(app)
            .post('/api/contacts')
            .send(newContact)
            .expect(201);

        expect(response.body.firstName).toBe(newContact.firstName);
        expect(response.body.lastName).toBe(newContact.lastName);
        expect(response.body.phoneNumber).toBe(newContact.phoneNumber);
    });

    it('should return 400 if required fields are missing', async () => {
        const invalidContact = {
            lastName: 'Doe',
            phoneNumber: '1234567890'
        };

        await request(app)
            .post('/api/contacts')
            .send(invalidContact)
            .expect(400);
    });
});