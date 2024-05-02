const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Update Contact Endpoint', () => {
    let contactId;

    beforeAll(async () => {
        // Create a contact for testing
        const response = await request(app)
            .post('/api/contacts')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                phoneNumber: '0987654321'
            });
        contactId = response.body._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should update an existing contact', async () => {
        const updatedContact = {
            firstName: 'Jane',
            lastName: 'Smith',
            phoneNumber: '0987654321'
        };

        const response = await request(app)
            .put(`/api/contacts/${contactId}`)
            .send(updatedContact)
            .expect(200);

        expect(response.body.firstName).toBe(updatedContact.firstName);
        expect(response.body.lastName).toBe(updatedContact.lastName);
        expect(response.body.phoneNumber).toBe(updatedContact.phoneNumber);
    });

    it('should return 404 if contact is not found', async () => {
        const response = await request(app)
            .put('/api/contacts/invalidId')
            .send({
                firstName: 'Jane',
                lastName: 'Smith',
                phoneNumber: '0987654321'
            })
            .expect(404);
    });
});