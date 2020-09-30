//First, building Metadata function
function buildMeta(sample) {
    //using d3.json to connect to the sample
    var dataurl = "/metadata/" + sample
    //d3 to select panel '#sample-metadata'
    var paneldata = d3.select("#sample-metadata");
    //use .html("") to clear exisiting
    paneldata.hmtl("");
    //object.entries to add key/value pair
    //inside loop, need d3 to append new tags for each pair
    d3.json(dataurl).then(function(data){
        Object.entries(data).forEach(([key,value]) => {
            paneldata.append("h5").text(`${key}: ${value}`);
        });
    
        var data = [domain: {x: [0,1], y: [0,1]}, value: data.WFREQ,
        title: {text: "Belly Button Washing Frequency of Scrubbing Per Week", font: {size: 14}},
        type: "indicator", mode: "gauge+number+delta",
        delta: {reference: 9, increasing: {color: "green"}},
        gauge:
            {axis: {range: [0,10]}, steps: [{range: [0,5], color: "lightgray"},
            {range: [5,8], color: "gray"}], threshold: {line: {color: "red", width: 4},
            thickness: 0.75, value: 9}}}];

        var gaugeLayout = {width: 400, height: 500, margin: {t:0, b: 0}};
        Plotly.newPlot("gauge", data, gaugeLayout);

    });
};

//Second, a function to build some charts!
function charting(sample) {
    var chartURL = "/samples/" + sample;
    d3.json(chartURL).then(data) => {
        //Build bubbly chart
        var trace1 = {
            x: data.otu_ids,
            y: data.sample_values,
            mode: 'markers',
            text: data.otu_labels,
            marker: {
                color: data.otu_ids,
                size: data.sample_values,
                colorscale: "Earth"
            }
        };
        var trace1 = [trace1];
        var layout = {
            title: "OTU ID",
            showlegend: false,
            height: 600,
            width: 1500
        };
        Plotly.newPlot("bubble", trace1, layout);
};

function init() {
    //reference dropdown select element
    var selector = d3.select("#selDataset");

    //use list of names to populate options
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        const firstSample = sampleNames[0];
        charting(firstSample);
        buildMeta(firstSample);
        console.log(firstSample)
    });
}

function optionChanged(newSample) {
    //getting new data for a new selection
    charting(newSample);
    buildMeta(newSample);

}

//initialize dashboard
init();