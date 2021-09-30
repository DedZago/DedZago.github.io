---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
header:
  og_image: "research/ecdf.png"
---

My research interests broadly include the development of flexible Bayesian methods for structured data, such as functions and curves.
Currently, I am working on multiscale Bayesian nonparametric approaches for density estimation.

<nbsp>

{% include base_path %}

{% assign ordered_pages = site.research | sort:"order_number" %}

{% for post in ordered_pages %}
  {% include archive-single.html type="grid" %}
{% endfor %}
