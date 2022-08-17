from pybtex.database.input import bibtex

parser = bibtex.Parser()
bib_data = parser.parse_file('pubs.bib')
bib_data.entries.keys()

from pybtex.plugin import find_plugin
from pybtex.database import parse_string
APA = find_plugin('pybtex.style.formatting', 'apa')()
MD = find_plugin('pybtex.backends', 'markdown')()

def bib2html(bibliography, exclude_fields=None):
    exclude_fields = exclude_fields or []
    if exclude_fields:
        bibliography = parse_string(bibliography.to_string('bibtex'), 'bibtex')
        for entry in bibliography.entries.values():
            for ef in exclude_fields:
                if ef in entry.fields.__dict__['_dict']:
                    del entry.fields.__dict__['_dict'][ef]
    formattedBib = APA.format_bibliography(bibliography)
    return [entry.text.render(MD) for entry in formattedBib]

output = bib2html(bib_data)

upper_text = """---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

"""

with open("../_pages/publications.md", 'w') as f:
    f.write(upper_text)
    f.write("\n".join(output))

# ## Creating the markdown files
#
# This is where the heavy lifting is done. This loops through all the rows in the TSV dataframe, then starts to concatentate a big string (```md```) that contains the markdown for each type. It does the YAML metadata first, then does the description for the individual page. If you don't want something to appear (like the "Recommended citation")

# In[5]:

# import os
# for row, item in publications.iterrows():

#     md_filename = str(item.pub_date) + "-" + item.url_slug + ".md"
#     html_filename = str(item.pub_date) + "-" + item.url_slug
#     year = item.pub_date[:4]

#     ## YAML variables

#     md = "---\ntitle: \""   + item.title + '"\n'

#     md += """collection: publications"""

#     md += """\npermalink: /publication/""" + html_filename

#     if len(str(item.excerpt)) > 5:
#         md += "\nexcerpt: '" + html_escape(item.excerpt) + "'"

#     md += "\ndate: " + str(item.pub_date)

#     md += "\nvenue: '" + html_escape(item.venue) + "'"

#     if len(str(item.paper_url)) > 5:
#         md += "\npaperurl: '" + item.paper_url + "'"

#     md += "\ncitation: '" + html_escape(item.citation) + "'"

#     md += "\n---"

#     ## Markdown description for individual page

#     if len(str(item.paper_url)) > 5:
#         md += "\n\n<a href='" + item.paper_url + "'>Download paper here</a>\n"

#     if len(str(item.excerpt)) > 5:
#         md += "\n" + html_escape(item.excerpt) + "\n"

#     md += "\nRecommended citation: " + item.citation

#     md_filename = os.path.basename(md_filename)

#     with open("../_publications/" + md_filename, 'w') as f:
#         f.write(md)


