'use strict';

const { sanitizeEntity } = require('strapi-utils')

module.exports = {
    async update(context) {
        const { id } = context.params;

        let entity;

        const [fights] = await strapi.services.fights.find({
            id: context.params.id,
            'user.id': context.state.user.id,
        });

        if (!fights) {
            return context.unauthorized(`You can't update this entry`);
        }

        if (context.is('multipart')) {
            const { data, files } = parseMultipartData(context);
            entity = await strapi.services.fights.update({ id }, data, {
                files,
            });
        } else {
            entity = await strapi.services.fights.update({ id }, context.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.fights });
    },
    async delete(context) {
        const { id } = context.params;

        const [fights] = await strapi.services.fights.find({
            id: context.params.id,
            'user.id': context.state.user.id,
        });

        if (!fights) {
            return context.unauthorized(`You can't delete this entry`);
        }

        const entity = await strapi.services.fights.delete({ id });

        return sanitizeEntity(entity, { model: strapi.models.fights });
    },
    async create(context) {
        let entity;
        if (context.is('multipart')) {
            const { data, files } = parseMultipartData(context);
            data.user = context.state.user.id;
            entity = await strapi.services.fights.create(data, { files });
        } else {
            context.request.body.user = context.state.user.id;
            entity = await strapi.services.fights.create(context.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.fights });
    },

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
