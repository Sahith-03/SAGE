import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'career',
  title: 'Career Opportunity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
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
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
        ],
      }
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Turn this off to hide the listing without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, subtitle, isActive} = selection
      return {
        title: title,
        subtitle: `${subtitle} | ${isActive ? 'Active' : 'Inactive'}`
      }
    }
  }
})
