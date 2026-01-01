import type { CollectionConfig } from 'payload'

async function triggerRebuild(payload: any) {
  try {
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const webhookUrl = settings?.rebuildWebhookUrl

    if (webhookUrl) {
      await fetch(webhookUrl, { method: 'POST' })
      console.log('[Posts] Triggered site rebuild')
    }
  } catch (error) {
    console.error('[Posts] Failed to trigger rebuild:', error)
  }
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'publishedAt'],
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        // Trigger rebuild when post is published or unpublished
        const wasPublished = previousDoc?.status === 'published'
        const isPublished = doc.status === 'published'

        if (wasPublished !== isPublished) {
          await triggerRebuild(req.payload)
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        // Trigger rebuild when published post is deleted
        if (doc.status === 'published') {
          await triggerRebuild(req.payload)
        }
      },
    ],
  },
  access: {
    read: ({ req }) => {
      // Published posts are public
      if (!req.user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Logged in users can see all posts
      return true
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief summary of the post for listings',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            if (!value && req.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ value, data, originalDoc }) => {
            // Set publishedAt when first published
            if (data?.status === 'published' && originalDoc?.status !== 'published' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'SEO title (max 60 chars)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'SEO description (max 160 chars)',
          },
        },
      ],
    },
  ],
}
