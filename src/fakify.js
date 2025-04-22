"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakify = void 0;
const fakerLibFull = require("faker");
const pluralize_1 = require("pluralize");
const DefaultPropFakers_1 = require("./DefaultPropFakers");
const fakerLib = Object.fromEntries(Object.entries(fakerLibFull)
    .filter(([categoryName, category]) => categoryName != 'definitions' && typeof category != 'function') // faker internals
);
function fakify(schema, propName) {
    return {
        ...schema,
        ...enhanceFaker(schema, propName)
    };
}
exports.fakify = fakify;
function enhanceFaker(schema, propName) {
    if (schema.type == 'array') {
        return {
            items: typeof schema.items == 'boolean' ? schema.items :
                schema.items instanceof Array ?
                    schema.items.map(subSchema => typeof subSchema == 'boolean' ? subSchema : fakify(subSchema, propName))
                    : fakify(schema.items, propName)
        };
    }
    else if (schema.type != 'object') {
        const faker = getFakerName(schema, propName);
        return faker ? { faker } : undefined;
    }
    else {
        return {
            properties: Object.fromEntries(Object.entries(schema.properties)
                .map(([propName, schema]) => [
                propName,
                typeof schema == 'boolean' ? schema : fakify(schema, propName)
            ]))
        };
    }
}
function getFakerName(schema, propName) {
    propName = pluralize_1.singular(propName || '');
    return schema.faker || getFakerLibName(DefaultPropFakers_1.defaultSchemaPropFakers[propName] || propName);
}
function getFakerLibName(prop) {
    const [categoryName] = Object.entries(fakerLib).find(([_, category]) => category[prop]) || [];
    return categoryName ? `${categoryName}.${prop}` : undefined;
}
