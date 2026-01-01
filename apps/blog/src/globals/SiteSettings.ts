import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'rebuildWebhookUrl',
      type: 'text',
      label: 'Rebuild Webhook URL',
      admin: {
        description: 'URL to trigger site rebuild (e.g., Vercel deploy hook, GitHub Actions webhook)',
      },
    },
  ],
}
