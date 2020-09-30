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