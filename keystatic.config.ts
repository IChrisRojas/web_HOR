import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        services: collection({
            label: 'Servicios',
            slugField: 'title',
            path: 'src/content/services/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                description: fields.text({ label: 'Descripción Corta', multiline: true }),
                type: fields.select({
                    label: 'Tipo de Servicio',
                    options: [
                        { label: 'Corporativo', value: 'corporate' },
                        { label: 'Social', value: 'social' },
                        { label: 'Concierto', value: 'concert' },
                        { label: 'Otro', value: 'other' },
                    ],
                    defaultValue: 'corporate',
                }),
                coverImage: fields.text({
                    label: 'Imagen de Portada (Nombre del archivo en R2)',
                    description: 'Ejemplo: servicio-iluminacion.jpg'
                }),
                content: fields.document({
                    label: 'Contenido Detallado',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'src/assets/images/services',
                        publicPath: '../../assets/images/services/',
                    },
                }),
            },
        }),
        portfolioEvents: collection({
            label: 'Portafolio: Eventos',
            slugField: 'title',
            path: 'src/content/portfolio/events/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                date: fields.date({ label: 'Fecha' }),
                client: fields.text({ label: 'Cliente' }),
                type: fields.select({
                    label: 'Tipo de Proyecto',
                    options: [
                        { label: 'Evento en Vivo', value: 'event' },
                    ],
                    defaultValue: 'event',
                }),
                description: fields.text({ label: 'Descripción Corta', multiline: true }),
                coverImage: fields.text({
                    label: 'Imagen de Portada (Nombre del archivo en R2)',
                    description: 'Ejemplo: mi-imagen.jpg (Debe estar subida a R2)'
                }),
                gallery: fields.array(
                    fields.text({
                        label: 'Imagen de Galería (Nombre del archivo en R2)',
                    }),
                    {
                        label: 'Galería de Imágenes',
                        itemLabel: props => props.value || 'Imagen',
                    }
                ),
                content: fields.document({
                    label: 'Detalles del Proyecto',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
            },
        }),
        portfolioCorporate: collection({
            label: 'Portafolio: Corporativo',
            slugField: 'title',
            path: 'src/content/portfolio/corporate/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                date: fields.date({ label: 'Fecha' }),
                client: fields.text({ label: 'Cliente' }),
                type: fields.select({
                    label: 'Tipo de Proyecto',
                    options: [
                        { label: 'Corporativo', value: 'corporate' },
                    ],
                    defaultValue: 'corporate',
                }),
                description: fields.text({ label: 'Descripción Corta', multiline: true }),
                coverImage: fields.text({
                    label: 'Imagen de Portada (Nombre del archivo en R2)',
                    description: 'Ejemplo: mi-imagen.jpg (Debe estar subida a R2)'
                }),
                gallery: fields.array(
                    fields.text({
                        label: 'Imagen de Galería (Nombre del archivo en R2)',
                    }),
                    {
                        label: 'Galería de Imágenes',
                        itemLabel: props => props.value || 'Imagen',
                    }
                ),
                content: fields.document({
                    label: 'Detalles del Proyecto',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
            },
        }),
    },
});
