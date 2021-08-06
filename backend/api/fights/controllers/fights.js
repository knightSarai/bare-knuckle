'use strict';

const { sanitizeEntity } = require('strapi-utils')

module.exports = {
    async me(context) {
        const { user } = context.state;

        if (!user)
            return context.badRequest(
                null,
                [
                    {
                        messages: [{ id: "No autorization header was found" }]
                    }
                ]
            )

        const data = await strapi.services.fights.find({ user: user.id })
        if (!data) return context.notFound();

        return sanitizeEntity(
            data,
            { model: strapi.models.fights }
        )

    }
}
