# GraphQl-Plataforma-de-analisis

Objetivo:
Desarrollar una API en GraphQL que permita la gestión de análisis financiero y validación de datos en línea, utilizando diversas APIs externas.

**Colecciones**:
- Usuarios: Contiene la información de los usuarios que pueden acceder a la plataforma.
- Consultas Financieras: Registra las búsquedas y análisis de datos financieros realizados por los usuarios.
- Consultas de Seguridad Web: Almacena los análisis de seguridad y validaciones en línea ejecutadas por los usuarios.

**Resolvers**:

**addUser**
- Parámetros:

        Nombre completo (ej. "Carlos Martínez")
        Correo electrónico (ej. "carlos.martinez@example.com")
        Número de teléfono con prefijo nacional (ej. "+34645543345")
        Tipo de usuario (ej. "Analista", "Inversor", "Administrador")
  
        Devuelve:El usuario recién creado con su ID.
  
**getCryptoPrice (Consulta el precio de criptomonedas)**
Parámetros:

Nombre de la criptomoneda (ej. "Bitcoin")
Devuelve:

Precio actual en USD.
Variación en las últimas 24 horas.
Usa la API: Crypto Price

getStockPrice (Consulta el precio de una acción)
Parámetros:

Símbolo bursátil (ej. "AAPL" para Apple)
Devuelve:

Precio actual.
Variación en porcentaje.
Usa la API: Stock Price

getGoldPrice (Consulta el precio del oro)
Devuelve:

Precio actual en USD por onza.
Usa la API: Gold Price

convertCurrency (Conversión de divisas)
Parámetros:

Cantidad (ej. 1000)
Moneda de origen (ej. "USD")
Moneda de destino (ej. "EUR")
Devuelve:

Monto convertido.
Usa la API: Convert Currency

validateEmail (Validación de correo electrónico)
Parámetros:

Correo electrónico a validar (ej. "user@example.com")
Devuelve:

true si es válido, false si es inválido.
Usa la API: Validate Email

validatePhone (Validación de número telefónico)
Parámetros:

Número telefónico con prefijo internacional (ej. "+34645543345")
Devuelve:

true si es válido, false si es inválido.
Usa la API: Validate Phone

ipLookup (Consulta de dirección IP)
Parámetros:

Dirección IP (ej. "192.168.1.1")
Devuelve:

Ubicación geográfica de la IP.
Nombre del proveedor de servicios de internet (ISP).
Usa la API: IP Lookup

getDomainInfo (Consulta de información sobre un dominio)
Parámetros:

Nombre de dominio (ej. "example.com")
Devuelve:

Información de registro del dominio.
Estado del dominio.
Usa la API: Domain

deleteUser
Parámetro:

ID del usuario.
Devuelve:

true o false según si el usuario se ha eliminado correctamente.
updateUser
Parámetros:

ID del usuario.
Nuevos datos (nombre, teléfono, correo electrónico).
Devuelve:

Los datos actualizados del usuario.
Notas:
Se debe validar el número de teléfono y el correo electrónico usando las APIs correspondientes antes de registrarlo en la base de datos.
Un usuario solo puede realizar un número limitado de consultas diarias (configurable en la base de datos).
Se deben registrar todas las consultas realizadas en la base de datos con la información del usuario y la fecha de consulta.
Entrega:
Enlace a una release de GitHub.
Archivo comprimido generado en la release.
Enlace al despliegue de la aplicación en Deno Deploy.
Si falta alguno de los dos primeros elementos, la calificación será 0.
