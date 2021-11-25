const express = require('express');
const mongoose = require('mongoose');


const alertsSchema = new mongoose.Schema(
    {
        alertID: {
            type: String,
            required: true 
        },
        category: {
            type: String,
            required: true 
        },
        location: {
            type: String,
            required: true 
        },
        severity: {
            type: String,
            required: true 
        },
        type: {
            type: String,
            required: true 
        },
        district:{
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true 
        },
        date: {
            type: Date,
            default: Date.now,
            // required: true
        },
        isTicketRaised: Boolean

    }
);
// const csvSchema = new mongoose.Schema({
//     fileName: { type: String, required: true },
//     csvData: { type: [alertsSchema], required: true },
//   });

// creating new collection
const Alert  = new mongoose.model("alerts ", alertsSchema)
// const csvModel  = new mongoose.model("alerts ", csvSchema)

module.exports = Alert;
