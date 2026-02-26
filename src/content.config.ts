import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// About singleton — profile data, social links, CV
const about = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml}", base: "./src/content/about" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      subtitle: z.string().optional(),
      bio: z.string(),
      profileImage: image(),
      email: z.string().email(),
      location: z.string(),
      socialLinks: z.object({
        linkedin: z.string().url().optional().or(z.literal("")),
        github: z.string().url().optional().or(z.literal("")),
        googleScholar: z.string().url().optional().or(z.literal("")),
        orcid: z.string().url().optional().or(z.literal("")),
        researchGate: z.string().url().optional().or(z.literal("")),
      }),
      cvLinks: z
        .object({
          english: z.string().optional(),
          italian: z.string().optional(),
        })
        .optional(),
    }),
});

// Education collection
const education = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml}", base: "./src/content/education" }),
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Experience collection
const experience = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml}", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    summary: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Publications collection
const publications = defineCollection({
  loader: glob({
    pattern: "**/*.{md,yaml}",
    base: "./src/content/publications",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      journal: z.string().optional(),
      status: z
        .enum(["published", "submitted", "in-preparation"])
        .default("published"),
      doi: z.string().optional(),
      url: z.string().url().optional(),
      image: image().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

// Software collection
const software = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml}", base: "./src/content/software" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      journal: z.string().optional(),
      journalUrl: z.string().url().optional(),
      githubUrl: z.string().url(),
      image: image().optional(),
      language: z.string().optional(),
      order: z.number().default(0),
    }),
});

// Presentations collection
const presentations = defineCollection({
  loader: glob({
    pattern: "**/*.{md,yaml}",
    base: "./src/content/presentations",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(["invited-talk", "invited-seminar", "poster", "workshop"]),
    venue: z.string(),
    location: z.string().optional(),
    slidesUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

// General settings singleton
const general = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml}", base: "./src/content/general" }),
  schema: z.object({
    enableThemeSelector: z.boolean().default(true),
    sectionVisibility: z.object({
      education: z.boolean().default(true),
      experience: z.boolean().default(true),
      publications: z.boolean().default(true),
      software: z.boolean().default(true),
      presentations: z.boolean().default(true),
      contact: z.boolean().default(true),
    }),
  }),
});

// Contact singleton — kept from Bloomfolio
const contact = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml}", base: "./src/content/contact" }),
  schema: z.object({
    icon: z.enum(["MessageCircleCode", "Mail", "Phone"]),
    linkUrl: z.string().url(),
    linkText: z.string(),
    footerIcon: z.enum(["Pickaxe", "Hammer", "Heart"]),
    footerText: z.string(),
    footerLinkText: z.string(),
    footerLinkUrl: z.string().url(),
  }),
});

export const collections = {
  about,
  education,
  experience,
  publications,
  software,
  presentations,
  general,
  contact,
};
