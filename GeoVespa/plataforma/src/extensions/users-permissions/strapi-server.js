const user = require('./content-types/user');
const role = require('./content-types/role');
const auth = require('./auth.js')
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const env = require('dotenv').config().parsed

module.exports = (plugin) => {



    plugin.contentTypes.user = user;
    plugin.contentTypes.role.lifecycles = role.lifecycles;
    plugin.controllers.auth = auth
        //console.log(plugin.controllers.auth)

    plugin.services.jwt = ({ strapi }) => ({
        getToken(ctx) {
            let token;

            if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
                const parts = ctx.request.header.authorization.split(/\s+/);

                if (parts[0].toLowerCase() !== 'bearer' || parts.length !== 2) {
                    return null;
                }

                token = parts[1];
            } else {
                return null;
            }

            return this.verify(token);
        },

        issue(payload, jwtOptions = {}) {
            _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
            return jwt.sign(
                _.clone(payload.toJSON ? payload.toJSON() : payload),
                strapi.config.get('plugin.users-permissions.jwtSecret'),
                jwtOptions
            );
        },

        verify(token) {
            return new Promise((resolve, reject) => {
                jwt.verify(
                    token,
                    strapi.config.get('plugin.users-permissions.jwtSecret'), {},
                    (err, tokenPayload = {}) => {
                        if (err) {
                            return reject(new Error('Invalid token.'));
                        }
                        resolve(tokenPayload);
                    }
                );
            });
        },
    })
    return plugin;
}