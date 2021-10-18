---
title: "Multiscale models"
layout: single-portfolio
excerpt: "<img src='/images/research/multiscale-model.png' alt=''>"
collection: research
order_number: 1
header: 
  og_image: "research/multiscale-model.png"
---

In this research project I developed, together with Antonio Canale and Marco Stefanucci, a Bayesian multivariate stick-breaking multiscale mixture model based on a binary-tree expansion,

$$
  f(y) = \sum_{s=0}^{\infty }\sum_{h=1}^{2^{s}} \pi_{s,h} \mathcal{K}(y | \mathbf{\vartheta}_{s,h}).
$$

Although the dimension of the target space $$\mathcal{Y} \subseteq \mathbb{R}^{d}$$ can be greater than one, we managed to maintain a binary tree structure by leveraging the Hilbert curve during the construction of the underlying stochastic processes.
The building block of the proposed approach is a base measure defined by exploiting the Hilbert space-filling curve, which allows the partitioning scheme for the univariate parameter to be adapted to the multivariate case with minor adjustments.


## Manuscript in preparation

Daniele Zago, Marco Stefanucci, Antonio Canale (2021). "*Bayesian nonparametric multiscale mixture models via Hilbert-curve partitioning*".

[Article](){: .btn--research} [Preprint](){: .btn--research} [GitHub](https://github.com/DedZago/msMK){: .btn--research}
