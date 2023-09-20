---
title: "Stochastic Approximations"
layout: single-portfolio
excerpt: "<img src='/images/research/stoch-approx/contour-dark.png' >"
description:
collection: research
status: Submitted
article: 
code:
poster: 
slides:
pdf:
preprint:
order_number: 1000
---

### Manuscript in preparation
Zago D., Capizzi G., Qiu P. (202+). Optimal Constrained Design of Control Charts Using Stochastic Approximations. *Submitted*.

{% if page.pdf and page.preprint %}<button class="btn--research" onclick="window.location.href='{{ page.pdf }}';">Pdf</button> {%elsif page.pdf %} <button class="btn--research" onclick="window.location.href='{{ page.pdf }}';">Pdf</button> {%elsif page.preprint %} <button class="btn--research" onclick="window.location.href='{{ page.preprint }}';">Preprint</button> {% endif %} {% if page.code %}<button class="btn--research" onclick="window.location.href='{{ page.code }}';">Code</button>{% endif %} {% if page.poster %}<button class="btn--research" onclick="window.location.href='{{ page.poster }}';">Poster</button>{% endif %} {% if page.slides %} <button class="btn--research" onclick="window.location.href='{{ page.slides }}';">Slides</button> {% endif %}

### Description ###

In statistical process monitoring, control charts typically depend on a set of tuning parameters $\mathbf{\zeta}$ besides its control limit(s). In a specific application, a control chart is often  designed for detecting a target process distributional shift as efficiently as possible.

However, explicit solutions $\mathbf{\zeta}^*$ for such a design are unavailable for most control charts, and thus numerical optimization methods are needed.
Two key problems in this setting are **computational cost** and **scalability** to multivariate tuning parameters.

In this work we present an algorithm that solves the doubly-stochastic constrained optimization problem

$$
  \begin{aligned}
    \mathbf{g}(\mathbf{\zeta}^*) &=
    \frac{\partial \mathbb{E}_1\{\text{RL}[\mathbf{\zeta}, h(\mathbf{\zeta})]\}}
         {\partial \mathbf{\zeta}}\Big|_{\mathbf{\zeta}=\mathbf{\zeta}^*} = \mathbf{0},\\
      \text{s.t. } & 
      \mathbb{E}_0\{\text{RL}[\mathbf{\zeta}^*, h(\mathbf{\zeta}^*)]\}
      =\text{ARL}_0.
  \end{aligned}
$$


Comparing this algorithm to more traditional optimization methods, such as grid search and Nelder-Mead optimization, shows a remarkable improvement in computational efficiency.

<figure>
  <img src="/images/research/stoch-approx/dimension-comparison.png" alt="Dimension comparison"/>
  <figcaption>Computational cost of finding the optimum for a MEWMA chart with $d = 1, 2,$ and 3 smoothing constants.</figcaption>
</figure>
