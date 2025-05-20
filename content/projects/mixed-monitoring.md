---
date: '2025-20-22T09:53:42+02:00' # date in which the content is created - defaults to "today"
title: 'A General Framework for Monitoring Mixed Data'
draft: false # set to "true" if you want to hide the content 

# link: "" # optional URL to link the logo to

params:
    buttons:
        - icon: "fa-solid fa-share"
          btnText: "Journal article"
          URL: ""
    image:  
        x: "images/works/mixed-monitoring/showcase.png"
        _2x: "images/works/mixed-monitoring/showcase.png"

## The content is used for the description of the project
---

In many real-world applications, quality monitoring involves data of mixed types—continuous, ordinal, and categorical—often collected over time. Traditional statistical process monitoring techniques struggle to handle this complexity, especially when variables are correlated across time.

In this project, I developed a general methodology for monitoring such multivariate processes. The core idea is to transform mixed-type data into a continuous form suitable for statistical modeling, using dummy and score variable encodings along with transformation and decorrelation steps. This enables effective sequential monitoring even under serial correlation.
The method demonstrated strong performance in simulations and outperformed several state-of-the-art techniques. 

A paper detailing the methodology has been accepted for publication in the Journal of Quality Technology.
