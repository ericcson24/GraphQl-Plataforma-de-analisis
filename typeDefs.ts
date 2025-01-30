export const typeDefs = `#graphql
    type Usuario {
        id: ID!
        nombre: String!
        correo: String!
        telefono: String!
        tipo: String!
    }

    type ConsultaFinanciera {
        id: ID!
        IDUsuario: ID!
        tipoConsulta: String!
        simbolo: String!
        resultado: Float!
        fecha: String!
    }

    type ConsultaSeguridad {
        id: ID!
        IDUsuario: ID!
        tipoConsulta: String!
        parametro: String!
        resultado: String!
        fecha: String!
    }

    type Query {
        getCryptoPrice(nombre: String!): ConsultaFinanciera!
        getStockPrice(simbolo: String!): ConsultaFinanciera!
        getGoldPrice: ConsultaFinanciera!
        convertCurrency(cantidad: Float!, origen: String!, destino: String!): Float!
        validateEmail(correo: String!): Boolean!
        validatePhone(telefono: String!): Boolean!
        ipLookup(ip: String!): ConsultaSeguridad!
        getDomainInfo(dominio: String!): ConsultaSeguridad!
    }

    type Mutation {
        addUser(nombre: String!, correo: String!, telefono: String!, tipo: String!): Usuario!
        deleteUser(id: ID!): Boolean!
        updateUser(id: ID!, nombre: String, correo: String, telefono: String): Usuario!
    }
`;