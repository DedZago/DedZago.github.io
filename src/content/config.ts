import { defineCollection, z } from 'astro:content';

// Education collection
const educationCollection = defineCollection({
  type: 'content',
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string(),  // "2021" or "Jan 2023"
    endDate: z.string().optional(),  // "2024" or "present"
    description: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Experience collection
const experienceCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),  // undefined = "present"
    order: z.number().default(0),
  }),
});

// Publications collection
const publicationsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    journal: z.string().optional(),
    status: z.enum(['published', 'submitted', 'in-preparation']).default('published'),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    image: image().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Software collection (custom)
const softwareCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    journal: z.string().optional(),  // For accompanying papers
    journalUrl: z.string().url().optional(),
    githubUrl: z.string().url(),
    image: image().optional(),
    language: z.string().optional(),  // "Julia", "R", "Python"
    order: z.number().default(0),
  }),
});

// Presentations collection (custom)
const presentationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['invited-talk', 'invited-seminar', 'poster', 'workshop']),
    venue: z.string(),
    location: z.string().optional(),
    slidesUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

// About/Settings singleton
const aboutCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    bio: z.string(),
    profileImage: image(),
    email: z.string().email(),
    location: z.string(),
    socialLinks: z.object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      googleScholar: z.string().url().optional(),
      orcid: z.string().url().optional(),
      researchGate: z.string().url().optional(),
    }),
    cvLinks: z.object({
      english: z.string().optional(),
      italian: z.string().optional(),
    }).optional(),
    sectionVisibility: z.object({
      education: z.boolean().default(true),
      experience: z.boolean().default(true),
      publications: z.boolean().default(true),
      software: z.boolean().default(true),
      presentations: z.boolean().default(true),
    }).optional(),
  }),
});

// General/Contact collection (for Bloomfolio compatibility)
const generalCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).passthrough(),
});

const contactCollection = defineCollection({
  type: 'data',
  schema: z.object({
    email: z.string().email().optional(),
  }).passthrough(),
});

export const collections = {
  education: educationCollection,
  experience: experienceCollection,
  publications: publicationsCollection,
  software: softwareCollection,
  presentations: presentationsCollection,
  about: aboutCollection,
  general: generalCollection,
  contact: contactCollection,
};
