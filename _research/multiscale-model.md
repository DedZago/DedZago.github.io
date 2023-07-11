---
title: "Multiscale models"
layout: single-portfolio
excerpt: "<img src='/images/research/multiscale-model.png'>"
collection: research
status: Published (2022, 36th International Workshop on Statistical Modelling.)
code: 
poster: /research/files/msmk/msmk.pdf
slides:
pdf:
preprint:
order_number: 1002
header: 
  og_image: "research/multiscale-model.png"
---

{% if page.pdf and page.preprint %}<button class="btn--research" onclick="window.location.href='{{ page.pdf }}';">Pdf</button> {%elsif page.pdf %} <button class="btn--research" onclick="window.location.href='{{ page.pdf }}';">Pdf</button> {%elsif page.preprint %} <button class="btn--research" onclick="window.location.href='{{ page.preprint }}';">Preprint</button> {% endif %} {% if page.code %}<button class="btn--research" onclick="window.location.href='{{ page.code }}';">Code</button>{% endif %} {% if page.poster %}<button class="btn--research" onclick="window.location.href='{{ page.poster }}';">Poster</button>{% endif %} {% if page.slides %} <button class="btn--research" onclick="window.location.href='{{ page.slides }}';">Slides</button> {% endif %}

### Publication

Zago, D., Canale, A., Stefanucci, M. (2022). Bayesian multiscale mixtures of multivariate Gaussian kernels for density estimation. *Proceedings of the 36th International Workshop on Statistical Modelling*.

<!-- [Article](){: .btn--research} [Preprint](){: .btn--research} [GitHub](https://github.com/DedZago/msMK){: .btn--research} -->

### Description
In this research project we developed a Bayesian multivariate stick-breaking multiscale mixture model based on a binary-tree expansion,

$$
  f(y) = \sum_{s=0}^{\infty }\sum_{h=1}^{2^{s}} \pi_{s,h} \mathcal{K}(y | \mathbf{\vartheta}_{s,h}).
$$

Although the dimension of the target space $$\mathcal{Y} \subseteq \mathbb{R}^{d}$$ can be greater than one, we managed to maintain a binary tree structure by leveraging the Hilbert curve during the construction of the underlying stochastic processes.
The building block of the proposed approach is a base measure defined by exploiting the Hilbert space-filling curve, which allows the partitioning scheme for the univariate parameter to be adapted to the multivariate case with minor adjustments.


