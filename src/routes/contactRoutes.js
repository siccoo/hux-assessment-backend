const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth'); 

// Protected routes
router.post('/contacts', authMiddleware, contactController.createContact);
router.get('/contacts', authMiddleware, contactController.getAllContacts);
router.get('/contacts/:id', authMiddleware, contactController.getContactById);
router.put('/contacts/:id', authMiddleware, contactController.updateContact);
router.delete('/contacts/:id', authMiddleware, contactController.deleteContact);

module.exports = router;
