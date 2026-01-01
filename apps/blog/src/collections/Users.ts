import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'author',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Author', value: 'author' },
      ],
      required: true,
    },
  ],
}
