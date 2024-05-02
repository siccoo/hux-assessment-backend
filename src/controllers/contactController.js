const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;

    try {
        // Create new contact
        const contact = new Contact({ firstName, lastName, phoneNumber });
        await contact.save();

        res.status(201).json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getContactById = async (req, res) => {
    const id = req.params.id;

    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateContact = async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, phoneNumber } = req.body;

    try {
        const contact = await Contact.findByIdAndUpdate(id, { firstName, lastName, phoneNumber }, { new: true });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteContact = async (req, res) => {
    const id = req.params.id;

    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};