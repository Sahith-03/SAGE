import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
    }),
    defineField({
      name: 'siteAddress',
      title: 'Site Address',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Review', value: 'reviewing' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Archived', value: 'archived' }
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    })
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      date: 'submittedAt'
    },
    prepare(selection) {
      const { firstName, lastName, date } = selection
      return {
        title: `${firstName || ''} ${lastName || ''}`,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Unknown date'
      }
    }
  }
})
