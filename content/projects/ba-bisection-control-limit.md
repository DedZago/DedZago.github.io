---
date: '2025-20-24T09:53:42+02:00' # date in which the content is created - defaults to "today"
title: 'An improved bisection-type algorithm for control chart calibration'
draft: false # set to "true" if you want to hide the content 

# link: "" # optional URL to link the logo to

params:
    buttons:
        - icon: "fa-solid fa-share"
          btnText: "Journal article"
          URL: "https://doi.org/10.1007/s11222-025-10609-7"
    image:  
        x: "images/works/bisection/sacl-boxplot-time.png"
        _2x: "images/works/bisection/sacl-boxplot-time.png"

## The content is used for the description of the project
---

This project addresses the challenge of computing control limits in statistical process control when the in-control process distribution is complex and analytical solutions are not feasible. Standard Monte Carlo-based methods like bisection search require a predefined search range and become computationally intensive when multiple charts are involved.

I proposed a modified bisection algorithm that eliminates the need for an initial search interval and significantly improves computational efficiency. The method was further extended to handle multi-chart scenarios effectively. Comparative experiments showed that the new approach outperforms classical bisection and stochastic approximation techniques.

A paper detailing the methodology has been published in Statistics and Computing.
