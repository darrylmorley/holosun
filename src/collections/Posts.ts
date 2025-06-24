import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "imageAlt",
      type: "text",
      admin: {
        description: "Alternative text for the cover image (for accessibility)",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: false,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "Unique identifier for the post in URLs.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        position: "sidebar",
        description: "Select the author of the post.",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        description: "Select the date when the post will be published.",
      },
    },
    {
      name: "updatedDate",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Select the date when the post was last updated.",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
        {
          label: "Archived",
          value: "archived",
        },
      ],
      admin: {
        position: "sidebar",
        description: "Select the status of the post.",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Select tags to categorize your post.",
      },
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      admin: {
        description: "Select posts that are related to this one",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Check this box to feature this post.",
      },
    },
    {
      name: "Seo",
      label: "SEO",
      type: "group",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          required: false,
          admin: {
            description: "SEO title for the post.",
          },
        },
        {
          name: "metaDescription",
          type: "text",
          required: false,
          admin: {
            description: "SEO description for the post.",
          },
        },
        {
          name: "metaKeywords",
          type: "array",
          fields: [
            {
              name: "keyword",
              type: "text",
            },
          ],
          admin: {
            description: "SEO keywords for the post.",
          },
        },
      ],
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Example hook to set the author to the current user
        if (!data.author && req.user) {
          data.author = req.user.id;
        }
      },
      async ({ data, req, operation }) => {
        // Set author to current user if not provided
        if (!data.author && req.user) {
          data.author = req.user.id;
        }

        // Generate slug from title if creating a new document or if slug is empty
        if (operation === "create" || !data.slug) {
          if (data.title) {
            // Convert title to slug format:
            // 1. Convert to lowercase
            // 2. Replace spaces and special chars with hyphens
            // 3. Remove consecutive hyphens
            // 4. Remove leading/trailing hyphens
            data.slug = data.title
              .toLowerCase()
              .replace(/[^\w\s-]/g, "") // Remove special characters
              .replace(/\s+/g, "-") // Replace spaces with hyphens
              .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
              .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
          }
        }

        return data;
      },
    ],
  },
};
