const path = require('path');

module.exports = ({ env }) =>{


    if(env('PRODUCTION')=='false'){
        return {
            connection: {
                client: 'sqlite',
                connection: {
                    filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
                },
                useNullAsDefault: true,
            },
        }
    }else{
        return {
            connection: {
                client: 'postgres',
        
                connection: {
                    host: env('DATABASE_HOST', 'localhost'),
                    port: env.int('DATABASE_PORT', 5432),
                    database: env('DATABASE_NAME', 'bank'),
                    user: env('DATABASE_USERNAME', 'postgres'),
                    password: env('DATABASE_PASSWORD', '0000'),
                    schema: env('DATABASE_SCHEMA', 'public'), // Not required
                   /* ssl: {
                        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
                    },
                    */
                },
                useNullAsDefault: true,
            },
        }
    }

}


