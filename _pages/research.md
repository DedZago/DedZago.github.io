---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
header:
  og_image: "research/ecdf.png"
---

### Statistical process control ###
Effect of parameter estimation in sequential analysis and process monitoring; developement of more efficient control charts based on intermediate approaches between fixed-parameter and self-starting methods.

### Bayesian nonparametrics ###
Developement of flexible Bayesian methods for structured data, such as functions and curves.
Currently, I am working on multiscale stick-breaking Bayesian nonparametric approaches for density estimation.

<nbsp>

{% include base_path %}

{% assign ordered_pages = site.research | sort:"order_number" %}

{% for post in ordered_pages %}
  {% include archive-single.html type="grid" %}
{% endfor %}
