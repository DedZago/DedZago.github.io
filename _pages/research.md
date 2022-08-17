---
layout: archive
title: "Research"
permalink: /research/
---

My research interests are not confined to a single topic in statistics, as a broader perspective allows borrowing of information between different fields.
Here are listed some of the research directions that I am exploring (or have explored).
Any aspect within the following topics is highly likely to pique my interest.

### Statistical process control ###
* Controlling for the effect of parameter estimation in sequential analysis and process monitoring.
* Development of more efficient control charts based on modification of parameter learning methods.
* High-dimensional and machine-learning-based statistical process control.
* Data fusion in process monitoring and Bayesian approaches for uncertainty quantification.

### Bayesian nonparametrics ###
* Developement of flexible Bayesian methods for structured data, such as functions and curves.
* Structured Bayesian nonparametric approaches for density estimation.

<nbsp>

{% include base_path %}

{% assign ordered_pages = site.research | sort:"order_number" %}

{% for post in ordered_pages %}
  {% include archive-single.html type="grid" %}
{% endfor %}
