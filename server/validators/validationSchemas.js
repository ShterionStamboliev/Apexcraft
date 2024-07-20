const userSchema = {
    name: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    note: {
        type: 'string',
        min: 0,
        max: 100,
    },
    email: {
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    number: {
        type: 'string',
        required: true,
        minLength: 6,
        maxLength: 11
    },
    address: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    phone: {
        type: 'string',
        required: true,
        minLength: 6,
        maxLength: 11
    },
    mol: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 11
    },
    password: {
        type: 'string',
        required: true,
        minLength: 6,
        maxLength: 50
    },
    name_and_family: {
        type: 'string',
        required: true,
        minLength: 7,
        maxLength: 50,
    },
    username: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    status: {
        type: 'string',
        required: true,
    },
    dds: {
        type: 'string',
        required: true
    }

};

const activitySchema = {
    name: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    status: {
        type: 'string',
        required: true,
    },
}

module.exports = { userSchema, activitySchema };
