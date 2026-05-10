export default {
  name: 'jobApplication',
  title: 'Job Applications',
  type: 'document',
  fields: [
    {
      name: 'applicantName',
      title: 'Applicant Name',
      type: 'string',
    },
    {
      name: 'appliedRole',
      title: 'Applied Role',
      type: 'reference',
      to: [{ type: 'career' }],
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'resume',
      title: 'Resume/Portfolio (PDF)',
      type: 'file',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Interviewing', value: 'interviewing' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Hired', value: 'hired' }
        ],
      },
      initialValue: 'new',
    },
    {
      name: 'appliedAt',
      title: 'Applied At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'applicantName',
      subtitle: 'appliedRole.title',
    }
  }
}
