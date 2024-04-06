---
title: "Stochastic approximations"
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
order_number: 2
---

### Manuscript in preparation
Zago, D., Capizzi, G., & Qiu, P. (2024). Optimal constrained design of control charts using stochastic approximations. *Journal of Quality Technology*. [https://doi.org/10.1080/00224065.2024.2323585](https://doi.org/10.1080/00224065.2024.2323585)

{% include markdown-header.md %}

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
