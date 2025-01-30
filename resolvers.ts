import { Collection, ObjectId } from "mongodb";
import { Usuario, ConsultaFinanciera, ConsultaSeguridad } from "./types.ts";
import { getCryptoPrice, getStockPrice, getGoldPrice, convertCurrency, validateEmail, validatePhone, ipLookup, getDomainInfo } from "./utils.ts";
import { GraphQLError } from "graphql";

type Context = {
    UsuarioCollection: Collection<Usuario>,
    ConsultaFinancieraCollection: Collection<ConsultaFinanciera>,
    ConsultaSeguridadCollection: Collection<ConsultaSeguridad>
};

type MutationArgs = {
    id: string,
    nombre: string,
    correo: string,
    telefono: string,
    tipo: string
};

type QueryArgs = {
    nombre: string,
    simbolo: string,
    cantidad: number,
    origen: string,
    destino?: string,
    correo: string,
    telefono: string,
    ip: string,
    dominio: string
};

export const resolvers = {
    Usuario: {
        id: (parent: Usuario) => parent._id!.toString()
    },

    Query: {
        getCryptoPrice: async (_: unknown, args: QueryArgs) => await getCryptoPrice(args.nombre!),
        getStockPrice: async (_: unknown, args: QueryArgs) => await getStockPrice(args.simbolo!),
        getGoldPrice: async () => await getGoldPrice(),
        convertCurrency: async (_: unknown, args: QueryArgs) => await convertCurrency(args.cantidad!, args.origen!, args.destino!),
        validateEmail: async (_: unknown, args: QueryArgs) => await validateEmail(args.correo!),
        validatePhone: async (_: unknown, args: QueryArgs) => await validatePhone(args.telefono!),
        ipLookup: async (_: unknown, args: QueryArgs) => await ipLookup(args.ip!),
        getDomainInfo: async (_: unknown, args: QueryArgs) => await getDomainInfo(args.dominio!)
    },
    
    Mutation: {
        addUser: async (_: unknown, args: MutationArgs, context: Context): Promise<Usuario> => {
            const { nombre, correo, telefono, tipo } = args;
            const emailValido = await validateEmail(correo!);
            const telefonoValido = await validatePhone(telefono!);
            if (!emailValido || !telefonoValido) throw new GraphQLError("Email o teléfono no válidos");
            
            const { insertedId } = await context.UsuarioCollection.insertOne({ nombre, correo, telefono, tipo });
            return { _id: insertedId, nombre, correo, telefono, tipo };
        },
        deleteUser: async (_: unknown, args: { id: string }, context: Context): Promise<boolean> => {
            const { deletedCount } = await context.UsuarioCollection.deleteOne({ _id: new ObjectId(args.id) });
            return deletedCount > 0;
        },
        updateUser: async (_: unknown, args: MutationArgs, context: Context): Promise<Usuario> => {
            const { id, nombre, correo, telefono } = args;
            if (correo) {
                const emailValido = await validateEmail(correo);
                if (!emailValido) throw new GraphQLError("Correo electrónico no válido");
            }
            if (telefono) {
                const telefonoValido = await validatePhone(telefono);
                if (!telefonoValido) throw new GraphQLError("Número de teléfono no válido");
            }
            const result = await context.UsuarioCollection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { nombre, correo, telefono } },
                { returnDocument: "after" }
            );
            if (!result) throw new GraphQLError("Usuario no encontrado");
            return result;
        }
    }
};
