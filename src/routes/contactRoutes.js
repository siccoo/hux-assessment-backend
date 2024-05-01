const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes
router.post('/contacts', authMiddleware.authenticate, contactController.createContact);
router.get('/contacts', authMiddleware.authenticate, contactController.getAllContacts);
router.get('/contacts/:id', authMiddleware.authenticate, contactController.getContactById);
router.put('/contacts/:id', authMiddleware.authenticate, contactController.updateContact);
router.delete('/contacts/:id', authMiddleware.authenticate, contactController.deleteContact);

module.exports = router;