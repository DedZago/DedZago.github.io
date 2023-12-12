---
title: "Bootstrap-assisted bisection"
layout: single-portfolio
excerpt: "<img src='/images/research/BA-bisection/Bisection_method.png' >"
description:
collection: research
status: Submitted
article:
code:
poster: 
slides:
pdf:
preprint:
order_number: 999
gallery:
  - url: research/BA-bisection/singlechart.png
    image_path: research/BA-bisection/singlechart.png
    alt: "BA-bisection algorithm for a single control chart."
    title: "BA-bisection algorithm for a single control chart."
  - url: research/BA-bisection/multichart.png
    image_path: research/BA-bisection/multichart.png
    alt: "BA-bisection algorithm for multi-chart design schemes."
    title: "BA-bisection algorithm for multi-chart design schemes."
---

### Manuscript in preparation
Zago D., Capizzi G., Qiu P. (202+). An Improved Bisection-type Algorithm for Control Chart Calibration. *Submitted*.

{% include markdown-header.md %}

### Description ###
The control limit calculation is a critical step when designing control charts in statistical process control. Traditional control chart designs require computing the control limits so that a characteristic of the in-control run length distribution, such as the mean or median, equals a pre-determined value. When the complexity of the IC process distribution makes analytical methods difficult, Monte Carlo approaches can be used to find the control limits. 

To address the computational challenges of classical Monte-Carlo approaches, we introduce a **modified bisection algorithm**, referred to as the Bootstrap-Assisted bisection (BA-bisection) algorithm.
The primary goal of the proposed algorithm is to **overcome the shortcomings** of the traditional bisection searching algorithm and **extend its applicability to multi-chart scenarios**.

Instead of approximating the in-control run length distribution as in the traditional bisection searching algorithm, the proposed algorithm uses bootstrap to estimate the IC distribution of the charting statistic at each time $t = 1, 2, \ldots, T$ during process monitoring.
Consequently, a bisection search can be applied to the estimated IC distribution of the charting statistic with minimal computational cost to find the appropriate control limit values.

The new method eliminates the need to specify an initial range for searching. Additionally, an efficient generalization of this approach is proposed to handle the multi-chart setting. Numerical results confirm that our method offers an efficient and reliable way to compute control limits compared to the conventional bisection searching algorithm and the algorithm based on stochastic approximations.

{% include gallery %}
