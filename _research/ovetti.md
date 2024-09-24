---
title: "Monitoring of complex geometrical shapes"
layout: single-portfolio
excerpt: "<img src='/images/research/ovetti/ovetto.png' >"
description:
collection: research
status: Submitted
article: 
code:
poster: 
slides:
pdf:
preprint: 
order_number: 1
gallery1:
  - url: research/ovetti/ovetti-distances-b.png
    image_path: research/ovetti/ovetti-distances-b.png
    alt: ""
    title: "\"Backward\" distances for the egg dataset. The last six eggs are defective."
  - url: research/ovetti/rsp-kurtosis-b.png
    image_path: research/ovetti/rsp-kurtosis-b.png
    alt: ""
    title: "Our proposed method for change detection applied to the \"backward\" distances."
gallery2:
  - url: research/ovetti/ovetti-distances-f.png
    image_path: research/ovetti/ovetti-distances-f.png
    alt: "\"Forward\" distances for the egg dataset. The last six eggs are defective."
    title: ""
  - url: research/ovetti/rsp-kurtosis-f.png
    image_path: research/ovetti/rsp-kurtosis-f.png
    alt: ""
    title: "Our proposed method for change detection applied to the \"forward\" distances."
---

### Manuscript in preparation
Zago D., Capizzi G., Colosimo B. M. (2023). Statistical process monitoring of isolated and persistent defects in complex geometrical shapes. *Submitted*.

**Keywords:** Additive Manufacturing, Statistical process monitoring, Free-form shapes, Nonparametric control charts, Phase I.

{% include markdown-header.md %}

### Description ###
Additive Manufacturing (AM), also known as 3D printing, allows the creation of complex shapes unattainable by traditional manufacturing methods. However, this increased design freedom poses challenges in statistical quality control, particularly when monitoring defects in geometrically complex parts. Traditional methods often fail as defects appear as localized outliers that deviate significantly from the nominal shape, making detection difficult.

This paper proposes a novel Phase I procedure for **monitoring shape defects** by focusing on changes in the tails of the distribution of geometrical deviations, specifically through kurtosis analysis. Simulation studies have shown that this distribution-free method offers superior defect detection capabilities compared to conventional approaches.

{% include gallery1 %}

{% include gallery2 %}

### Key contributions ###
Key contributions of this work include:
- The development of a non-parametric control chart that efficiently identifies deviations in the tail of the distribution.
- Demonstration of the method's effectiveness through simulation scenarios designed to replicate challenges in monitoring complex geometries.
- An application case study analyzing defects in egg-shaped 3D-printed objects, showcasing the practical implications of the proposed monitoring technique.

The results suggest that monitoring the kurtosis can enhance the sensitivity of defect detection in free-form shapes, addressing limitations present in traditional statistical process control methods. Supplementary materials, including R code for reproducing results, are provided for practitioners and researchers interested in this methodology.
