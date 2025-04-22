"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsf = require("json-schema-faker");
const index_1 = require("../index");
const origin = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        phones: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'string'
            }
        }
    }
};
console.log(`~~~ take your original schema:`, origin);
const fakified = index_1.fakify(origin);
console.log(`~~~ fakify it:`, fakified);
console.log(`~~~ then use it to make a fake:`);
jsf.extend('faker', () => require('faker'));
console.log(jsf.generate(fakified));
