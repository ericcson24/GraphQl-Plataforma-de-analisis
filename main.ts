import { MongoClient } from 'mongodb';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";
import { GraphQLError } from "graphql";
import { Usuario, ConsultaFinanciera,ConsultaSeguridad } from "./types.ts";

//Conectarse a la base de datos
const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL) throw new GraphQLError("MONGO URL NOT EXISTS")
//enlace cogido
const client = new MongoClient(MONGO_URL)
await client.connect()
console.log("Conectado a la base de datos")

//colecciones en base de datos
const db = client.db("Gestion_de_reservas")
const UsuariosCollection = db.collection<Usuario>("Usuarios")
const ConsultaFinancieraCollection = db.collection<ConsultaFinanciera>("ConsultaFinanciera")
const ConsultaSeguridadCollection = db.collection<ConsultaSeguridad>("ConsultaSeguridad")


//para la creacion de server apollo
const server = new ApolloServer({typeDefs, resolvers})
const { url } = await startStandaloneServer(server,{
  context: () => ({ UsuariosCollection,ConsultaFinancieraCollection,ConsultaSeguridadCollection })             //aqui creamos apollo con esta coleccion
})

console.log(`🚀  Server ready at: ${url}`);