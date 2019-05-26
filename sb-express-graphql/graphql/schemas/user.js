const types = `
    type Geo {
        lat: String!
        lng: String!
    }

    type Address {
        street: String!
        suite: String!
        city: String!
        zipcode: String!
        geo: Geo!
    }

    type Company {
        name: String!
        catchPhrase: String!
        bs: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        address: Address!
        phone: String!
        website: String!
        company: Company!
    }

    input GeoInput {
        lat: String!
        lng: String!
    }

    input AddressInput {
        street: String!
        suite: String!
        city: String!
        zipcode: String!
        geo: GeoInput!
    }

    input CompanyInput {
        name: String!
        catchPhrase: String!
        bs: String!
    }

    input UserInput {
        name: String!
        email: String!
        address: AddressInput!
        phone: String!
        website: String!
        company: CompanyInput!
    }
`;

const queries = `
    users: [User!]!
`;

const mutations = `
    createUser(userInput: UserInput): User
`;

module.exports = { types, queries, mutations };
