class Validator {
    constructor(schema) {
        this.schema = schema;
    }

    validate(data) {
        let errors = [];

        for (let field in this.schema) {
            let rules = this.schema[field];

            if (rules.required && !data[field]) {
                errors.push(`${field} is required`);
                continue;
            }

            if (rules.type === 'string') {
                if (typeof data[field] !== 'string') {
                    errors.push(`${field} must be a string`);
                }
                if (rules.minLength && data[field].length < rules.minLength) {
                    errors.push(`${field} must be at least ${rules.minLength} characters long`);
                }
                if (rules.maxLength && data[field].length > rules.maxLength) {
                    errors.push(`${field} must be less than ${rules.maxLength} characters long`);
                }
            }

            // if (rules.type === 'number') {
            //     if (typeof data[field] !== 'number') {
            //         errors.push(`${field} must be a number`);
            //     }
            //     if (rules.min && data[field] < rules.min) {
            //         errors.push(`${field} must be at least ${rules.min}`);
            //     }
            //     if (rules.max && data[field] > rules.max) {
            //         errors.push(`${field} must be less than ${rules.max}`);
            //     }
            // }
        }

        return errors;
    }
}

module.exports = Validator;