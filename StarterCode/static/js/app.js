//giving the dropdown menu functionality
function dropDownMenu() {
    d3.json("samples.json").then(data => {
        var filterOpts = ["All"];
        filterOpts = filterOpts.concat(data.names);
        console.log(filterOpts);

        d3.select("#selDataset")
            .selectAll("option")
            .data(filterOpts)
            .enter()
            .append("option")
            .text(d => d);

            //event
            d3.select("#selDataset").on("change", optionChanged);
    });
}

function optionChanged(event) {
    //selector as event to get selected event
    var filterVal = d3.select("#selDataset").property('value');
    console.log(filterVal);
    //refresh charts with value
    demoTable(filterVal)
    charting(filterVal);
}

function demoTable(sampleName) {
    d3.json("samples.json").then((data) => {
        var tabInfo = data.metadata
        var filtered = tabInfo.filter(x => x.id == sampleName)
        console.log(filtered[0])
        var tablegraphic = d3.select("#sample-metadata");
        tablegraphic.html("")
        Object.entries(filtered[0]).forEach(([key,value]) => {
            var row = tablegraphic.append('tr');
            var cell = tablegraphic.append('td');
            cell.text(key)
            var cell = row.append('td');
            cell.text(`: ${value}`)
        });
    });
}

function charting(sampleName) {
    d3.json("sample.json").then((data) => {
        var tabInfo = data.samples
        var filterd = tabInfo.filter(x => x.id == sampleName)
        console.log(filterd)
        var otu_ids = filterd[0].otu_ids;
        var otu_labels = filterd[0].otu_labels
        var sample_values = filterd[0].sample_values;
        
        //bar chart
        var trace1 = [{
            type: "bar",
            orientation: "h",
            x: sample_values.slice(1,10),
            y: otu_ids.slice(1,10).map(x => `OTU ${x}`),
        }];

        var layout1 = {
            title: "Top 10 OTU",
            xaxis: { title: "otu_labels" },
            yaxis: { title: "otu_ids" }
        };
        Plotly.newPlot("bar", trace1, layout1);


        var trace2 = [{
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            markers: {
                color: ['rgb(93, 164, 214)','rgb(255, 144, 14)','rgb(44, 160, 101)','rgb(255, 65, 54)'],
                opacity: [1, 0.8, 0.6, 0.4],
                size: [40, 60, 80, 100]
            }
        }];

        var layout2 = {
            title: 'OTU Samples from All Subjects',
            showlegend: false,
            height: 600,
            width: 600
        };
        Plotly.newPlot("bubble", trace2, layout2);
    });
}



//initialize Dashboard
dropDownMenu();