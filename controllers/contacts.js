const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .collection('contacts')
            .find();

        const contacts = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single contact by ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDb()
            .collection('contacts')
            .find({ _id: userId });

        const contacts = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        // Validate required fields
        if (
            !contact.firstName ||
            !contact.lastName ||
            !contact.email ||
            !contact.favoriteColor ||
            !contact.birthday
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const response = await mongodb
            .getDb()
            .collection('contacts')
            .insertOne(contact);

        if (response.acknowledged) {
            res.status(201).json({
                id: response.insertedId
            });
        } else {
            res.status(500).json({
                message: 'Failed to create contact'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        // Validate required fields
        if (
            !contact.firstName ||
            !contact.lastName ||
            !contact.email ||
            !contact.favoriteColor ||
            !contact.birthday
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const response = await mongodb
            .getDb()
            .collection('contacts')
            .replaceOne(
                { _id: userId },
                contact
            );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({
                message: 'Failed to update contact'
            });
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDb()
            .collection('contacts')
            .deleteOne({ _id: userId });
        
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json({
                message: 'Failed to delete contact'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};