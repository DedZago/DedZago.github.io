---
title: "Cautious learning"
layout: single-portfolio
excerpt: "<img src='/images/research/cautious-learning/cautious-learning.png' alt=''>"
collection: research
order_number: 1
header: 
  og_image: "research/cautious-learning/cautious-learning.png"
---

### Description ###

Control charts based on estimated model parameters are usually applied with the following approaches:
* **Fixed-parameter** (FP): the model parameter is held fixed after estimation on an in-control dataset.
* **Adaptive estimator** (AE): the model parameter is updated after having checked for potential OC situations.

Within project, we highlight how these approaches are two ends of a more varied spectrum of choices, and as such they suffer from complementary issues.
With fixed-parameter approaches, large amounts of data are required to be effective in detecting shifts.
With adaptive estimators, early and small shifts go undetected from the control chart and OC observations bias the estimate, thereby reducing performance.

### Cautious learning ###
We propose an improvement over both approaches by choosing a "middle ground", namely an estimator that alternates between the fixed-parameter and adaptive estimator approaches, depending on tentative evidence of parameter shift.
We term this approach **cautious learning** (CL) in order to underline how the parameter updates are stopped to prevent biasing the estimates.


<img src="/images/research/cautious-learning/cautious-learning.png" alt="chart" width="350"/>
<img src="/images/research/cautious-learning/thetahat.png" alt="parameter" width="350"/>

Combining the proposed approach with the GICP methodology for designing control limits results in a considerably higher detection power for early and small shifts, while maintaining similar performance to the adaptive estimator for large and delayed shifts.

<img src="/images/research/cautious-learning/IC.png" alt="chart" width="350"/>
<img src="/images/research/cautious-learning/delta=0.35.png" alt="parameter" width="350"/>

### Manuscript in preparation
Zago D., Capizzi G. (2022). Improving control chart performance with cautious parameter learning.

<!-- [Article](){: .btn--research} [Preprint](){: .btn--research} [GitHub](){: .btn--research} -->
