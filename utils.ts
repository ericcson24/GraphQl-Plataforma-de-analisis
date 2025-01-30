import { GraphQLError } from "graphql";
import { Api_Phone, Api_IpLookup, Api_convertCurrency, Api_Domain } from "./types.ts";

/**
 * Valida un número de teléfono usando la API externa.
 */
export const validatePhone = async (telefono: string) => {
    
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la petición de la API");
    const result: Api_Phone = await data.json();
    return result.is_valid;
};

/**
 * Busca información sobre una dirección IP.
 */
export const ipLookup = async (ip: string) => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/iplookup?address=${ip}`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la petición de la API");
    const result: Api_IpLookup = await data.json();
    return result.is_valid;
};

/**
 * Convierte una cantidad de una moneda a otra usando la API externa.
 */
export const convertCurrency = async (cantidad: number, origen: string, destino: string) => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/convertcurrency?have=${origen}&want=${destino}&amount=${cantidad}`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la petición de la API");
    const result: Api_convertCurrency = await data.json();
    return {
        new_currency: result.new_currency
    };
};

/**
 * Obtiene el precio actual de una criptomoneda.
 */
export const getCryptoPrice = async (nombre: string) => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/cryptoprice?symbol=${nombre}`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la API de criptomonedas");
    const result = await data.json();
    return {
        price: result.price,
        change_24h: result.change_24h
    };
};

/**
 * Obtiene el precio actual de una acción bursátil.
 */
export const getStockPrice = async (simbolo: string) => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/stockprice?symbol=${simbolo}`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la API de acciones");
    const result = await data.json();
    return {
        price: result.price,
        change_percent: result.change_percent
    };
};

/**
 * Obtiene el precio actual del oro en USD por onza.
 */
export const getGoldPrice = async () => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/goldprice`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la API del oro");
    const result = await data.json();
    return result.price;
};

/**
 * Valida si un correo electrónico es válido.
 */
export const validateEmail = async (email: string) => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/validateemail?email=${email}`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la API de validación de correo");
    const result = await data.json();
    return result.is_valid;
};

/**
 * Consulta información de un dominio web.
 */
export const getDomainInfo = async (dominio: string) => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) throw new GraphQLError("Error en la API_KEY");

    const url = `https://api.api-ninjas.com/v1/domainlookup?domain=${dominio}`;
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });

    if (data.status !== 200) throw new GraphQLError("Error en la API de dominios");
    const result: Api_Domain = await data.json();
    return result;
};
