import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
    ? {
        kind: "github",
        repo: {
          owner: import.meta.env.PUBLIC_KEYSTATIC_REPO_OWNER!,
          name: import.meta.env.PUBLIC_KEYSTATIC_REPO_NAME!,
        },
      }
    : {
        kind: "local",
      },

  singletons: {
    about: singleton({
      label: "Profile & Settings",
      path: "src/content/about/index",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Full Name" }),
        title: fields.text({ label: "Professional Title" }),
        subtitle: fields.text({ label: "Subtitle / Tagline" }),
        bio: fields.text({
          label: "Bio (HTML allowed)",
          multiline: true,
          description: "Supports basic HTML tags for formatting.",
        }),
        profileImage: fields.image({
          label: "Profile Image",
          directory: "src/assets/images/profile",
          publicPath: "@assets/images/profile/",
        }),
        email: fields.text({ label: "Email" }),
        location: fields.text({ label: "Location" }),
        socialLinks: fields.object(
          {
            linkedin: fields.url({ label: "LinkedIn URL" }),
            github: fields.url({ label: "GitHub URL" }),
            googleScholar: fields.url({ label: "Google Scholar URL" }),
            orcid: fields.url({ label: "ORCID URL" }),
            researchGate: fields.url({ label: "ResearchGate URL" }),
          },
          { label: "Social Links" }
        ),
        cvLinks: fields.object(
          {
            english: fields.text({ label: "English CV path (e.g. /pdf/zago_cv_english.pdf)" }),
            italian: fields.text({ label: "Italian CV path (e.g. /pdf/zago_cv_italian.pdf)" }),
          },
          { label: "CV Downloads" }
        ),
      },
    }),

    general: singleton({
      label: "General Settings",
      path: "src/content/general/index",
      format: { data: "yaml" },
      schema: {
        enableThemeSelector: fields.checkbox({
          label: "Enable Theme Selector",
          defaultValue: true,
        }),
        sectionVisibility: fields.object(
          {
            education: fields.checkbox({ label: "Show Education", defaultValue: true }),
            experience: fields.checkbox({ label: "Show Experience", defaultValue: true }),
            publications: fields.checkbox({ label: "Show Publications", defaultValue: true }),
            software: fields.checkbox({ label: "Show Software", defaultValue: true }),
            presentations: fields.checkbox({ label: "Show Presentations", defaultValue: true }),
            contact: fields.checkbox({ label: "Show Contact", defaultValue: true }),
          },
          { label: "Section Visibility" }
        ),
      },
    }),

    contact: singleton({
      label: "Contact Section",
      path: "src/content/contact/index",
      format: { data: "yaml" },
      schema: {
        icon: fields.select({
          label: "Section Icon",
          options: [
            { label: "Message Circle", value: "MessageCircleCode" },
            { label: "Mail", value: "Mail" },
            { label: "Phone", value: "Phone" },
          ],
          defaultValue: "Mail",
        }),
        linkUrl: fields.url({ label: "Contact Link URL" }),
        linkText: fields.text({ label: "Contact Link Text" }),
        footerIcon: fields.select({
          label: "Footer Icon",
          options: [
            { label: "Pickaxe", value: "Pickaxe" },
            { label: "Hammer", value: "Hammer" },
            { label: "Heart", value: "Heart" },
          ],
          defaultValue: "Heart",
        }),
        footerText: fields.text({ label: "Footer Text" }),
        footerLinkText: fields.text({ label: "Footer Link Text" }),
        footerLinkUrl: fields.url({ label: "Footer Link URL" }),
      },
    }),
  },

  collections: {
    education: collection({
      label: "Education",
      path: "src/content/education/*",
      slugField: "institution",
      format: { contentField: "description" },
      schema: {
        institution: fields.slug({ name: { label: "Institution" } }),
        degree: fields.text({ label: "Degree" }),
        field: fields.text({ label: "Field of Study" }),
        location: fields.text({ label: "Location" }),
        startDate: fields.text({ label: "Start Date (e.g. 2021 or Jan 2023)" }),
        endDate: fields.text({ label: "End Date (leave empty for ongoing)" }),
        description: fields.markdoc({ label: "Description", extension: "md" }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    experience: collection({
      label: "Experience",
      path: "src/content/experience/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Job Title" } }),
        company: fields.text({ label: "Company" }),
        location: fields.text({ label: "Location" }),
        startDate: fields.text({ label: "Start Date" }),
        endDate: fields.text({ label: "End Date (leave empty for current)" }),
        summary: fields.text({
          label: "Short Summary",
          description: "Brief summary shown in timeline (before expanding)",
        }),
        content: fields.markdoc({ label: "Description", extension: "md" }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    publications: collection({
      label: "Publications",
      path: "src/content/publications/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Publication Date" }),
        journal: fields.text({ label: "Journal / Venue" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Published", value: "published" },
            { label: "Submitted", value: "submitted" },
            { label: "In Preparation", value: "in-preparation" },
          ],
          defaultValue: "published",
        }),
        doi: fields.text({ label: "DOI" }),
        url: fields.url({ label: "Article URL" }),
        image: fields.image({
          label: "Showcase Image",
          directory: "src/assets/images/publications",
          publicPath: "@assets/images/publications/",
        }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        content: fields.markdoc({ label: "Description", extension: "md" }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    software: collection({
      label: "Software",
      path: "src/content/software/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Package Name" } }),
        date: fields.date({ label: "Release Date" }),
        journal: fields.text({ label: "Accompanying Paper Journal" }),
        journalUrl: fields.url({ label: "Paper URL" }),
        githubUrl: fields.url({ label: "GitHub Repository URL" }),
        image: fields.image({
          label: "Showcase Image",
          directory: "src/assets/images/software",
          publicPath: "@assets/images/software/",
        }),
        language: fields.text({ label: "Programming Language (e.g. Julia, R, Python)" }),
        content: fields.markdoc({ label: "Description", extension: "md" }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),

    presentations: collection({
      label: "Presentations",
      path: "src/content/presentations/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Presentation Title" } }),
        date: fields.date({ label: "Date" }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Invited Talk", value: "invited-talk" },
            { label: "Invited Seminar", value: "invited-seminar" },
            { label: "Poster Presentation", value: "poster" },
            { label: "Workshop", value: "workshop" },
          ],
          defaultValue: "invited-talk",
        }),
        venue: fields.text({ label: "Conference / Venue" }),
        location: fields.text({ label: "Location" }),
        slidesUrl: fields.url({ label: "Slides URL (optional)" }),
        content: fields.markdoc({ label: "Abstract / Description", extension: "md" }),
        order: fields.integer({ label: "Display Order", defaultValue: 0 }),
      },
    }),
  },
});
