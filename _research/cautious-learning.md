---
title: "Cautious learning"
layout: single-portfolio
excerpt: "<img src='/images/research/cautious-learning/thetahat.png' >"
description:
collection: research
status: Submitted
<!-- code: https://github.com/DedZago/CautiousLearning/ -->
poster: /research/files/cautious-learning/poster.pdf
slides:
pdf:
preprint:
order_number: 1001
---

### Manuscript in preparation
Zago D., Capizzi G. (202+). Alternative parameter learning schemes for monitoring process stability. *Submitted*.

{% if page.pdf and page.preprint %}<button class="btn--research" onclick="window.location.href='{{ page.pdf }}';">Pdf</button> {%elsif page.pdf %} <button class="btn--research" onclick="window.location.href='{{ page.pdf }}';">Pdf</button> {%elsif page.preprint %} <button class="btn--research" onclick="window.location.href='{{ page.preprint }}';">Preprint</button> {% endif %} {% if page.code %}<button class="btn--research" onclick="window.location.href='{{ page.code }}';">Code</button>{% endif %} {% if page.poster %}<button class="btn--research" onclick="window.location.href='{{ page.poster }}';">Poster</button>{% endif %} {% if page.slides %} <button class="btn--research" onclick="window.location.href='{{ page.slides }}';">Slides</button> {% endif %}

### Description ###

Control charts based on estimated model parameters are usually applied with the following approaches:
* **Fixed-parameter** (FE): the model parameter is held fixed after estimation on an in-control dataset.
* **Adaptive estimator** (AE): the model parameter is updated after having checked for potential OC situations.

In this work, we formally show how these approaches are opposite examples of **bias-variance trade-off**, and as such they suffer from complementary issues.
With fixed estimators, **large amounts of data** are required to be effective in detecting shifts.
With adaptive estimators, **early and small shifts go undetected** from the control chart and OC observations bias the estimate, thereby reducing performance.

### Cautious learning ###
We propose an improvement over both approaches by choosing a "middle ground", namely an estimator that alternates between the fixed-parameter and adaptive estimator approaches, depending on tentative evidence of parameter shift.
We term this approach **cautious learning** (CL) in order to underline how the parameter updates are stopped to prevent biasing the estimates.

| <img src="/images/research/cautious-learning/shaded-regions-cl.png" alt="chart" width="350"/>| <img src="/images/research/cautious-learning/thetahat.png" alt="parameter" width="350"/>| 
|:--:|:--:|
| *Control chart with alarm limit (**red**) and warning region (**yellow**)* | *Parameter estimates and window of opportunity (**gray**)*


Combining the proposed approach with the GICP methodology for designing control limits results in a considerably higher detection power for early and small shifts, while maintaining similar performance to the adaptive estimator for large and delayed shifts.

| <img src="/images/research/cautious-learning/IC.png" alt="chart" width="350"/>| <img src="/images/research/cautious-learning/delta=0.35.png" alt="parameter" width="350"/>| 
|:--:|:--:|
| *In-control performance (CARL)* | *Out-of-control performance (CARL)*


