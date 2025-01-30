import {  ObjectId, OptionalId } from "mongodb";

// Definición del esquema de Usuario
export type Usuario = OptionalId<{
    nombre: string;
    correo: string;
    telefono: string;
    tipo: string;
}>;

// Definición del esquema de Consulta Financiera
export type ConsultaFinanciera = OptionalId<{
    IDUsuario: ObjectId;
    tipoConsulta: string;
    simbolo: string;
    resultado: number;
    fecha: Date;
}>;

// Definición del esquema de Consulta de Seguridad Web
export type ConsultaSeguridad = OptionalId<{
    IDUsuario: ObjectId;
    tipoConsulta: string;
    parametro: string;
    resultado: string;
    fecha: Date;
}>;

// Definición de respuestas de APIs externas
export type Api_Phone = {
    is_valid: boolean;
};

export type Api_Domain = {
    is_valid: boolean;
};

export type Api_IpLookup = {
    is_valid: boolean;
};

export type Api_convertCurrency = {
    new_currency: number;
};

export type Api_CryptoPrice = {
    price: number;
    change_24h: number;
};

export type Api_StockPrice = {
    price: number;
    change_percent: number;
};

export type Api_GoldPrice = {
    price: number;
};

export type Api_ValidateEmail = {
    is_valid: boolean;
};
