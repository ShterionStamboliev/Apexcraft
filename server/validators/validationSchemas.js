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

const artisanSchema = {
    name: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    note: {
        type: 'string',
        required: false,
        min: 0,
        max: 100,
    },
    status: {
        type: 'string',
        required: true,
    },
}

const companySchema = {
    name: {
        type: 'string',
        required: true,
        minLength: 3,
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
    mol: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 11
    },
    email: {
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    phone: {
        type: 'string',
        required: true,
        minLength: 6,
        maxLength: 11
    },
    dds: {
        type: 'string',
        required: true
    },
    status: {
        type: 'string',
        required: true,
    },
}

const measureSchema = {
    name: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 50,
    }
}

const projectSchema = {
    name: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    company_name: {
        type: 'string',
        reuired: true
    },
    email: {
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    note: {
        type: 'string',
        required: false,
        min: 0,
        max: 100,
    },
    status: {
        type: 'string',
        required: true,
    },
}

module.exports = { 
    activitySchema, 
    artisanSchema, 
    companySchema,
    measureSchema,
    projectSchema
};
