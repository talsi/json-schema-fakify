import { JSONSchema7 } from "json-schema";
export declare type JSONSchemaFaker = JSONSchema7 & {
    faker?: string;
};
export declare function fakify(schema: JSONSchemaFaker, propName?: string): JSONSchema7;
