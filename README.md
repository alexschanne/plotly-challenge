# Plotly Challenge: Belly Button Diversity
Module 15 Homework, emphasizing skills in javascript, plotly, and d3 for interactive web development.

![Belly Button Face by stresschronic.com](Images/belly-button-face.jpg)



## Background from Instructions
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## This assignment will accomplish the following:
  1. Reading the samples.json using D3 Library.
  2. A horizontal bar chart with a dropdown menu to display the top 10 OTUs found in the individual selected.
    a. Use sample_values for bar chart values.
    b. Use otu_ids for bar chart labels.
    c. Use otu_labels as hovertext for the chart.
  3. Create a bubble chart that displays each sample.
    a. Use otu_ids for x values.
    b. Use sample_values for y values.
    c. Use sample_values for marker size.
    d. Use otu_ids for marker colors.
    e. Use otu_labels for text values.
  4. Displaying sample metadata like demographic info for individual.
  5. Displaying each key-value pair from the metatdata JSON object on the page.
  6. Ability to update the plots anytime a new smaple is selected.
