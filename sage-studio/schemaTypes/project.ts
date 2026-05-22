import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A brief summary of the project for the project card.'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Multiple images for the project'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'lng',
      title: 'Longitude',
      type: 'number',
    }),
    defineField({
      name: 'scale',
      title: 'Scale',
      type: 'string',
    }),
    defineField({
      name: 'logic',
      title: 'Logic',
      type: 'string',
    }),
    defineField({
      name: 'ref',
      title: 'Reference Code',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Commercial', value: 'Commercial'},
          {title: 'Residential', value: 'Residential'},
          {title: 'Cultural', value: 'Cultural'},
          {title: 'Masterplan', value: 'Masterplan'},
          {title: 'Healthcare', value: 'Healthcare'},
          {title: 'Research', value: 'Research'}
        ],
      }
    }),
    defineField({
      name: 'year',
      title: 'Year Completed',
      type: 'number',
    }),
    defineField({
      name: 'body',
      title: 'Body content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'location',
    },
  },
})
