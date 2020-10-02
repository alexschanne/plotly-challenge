//giving the dropdown menu functionality
function dropDownMenu() {
    var menu = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleName = data.names;
        sampleName.forEach((name) => {
            menu
            .append("option")
            .text(name)
            .property("value", name);                
        });

        //set default
        const defaultSample = sampleName[0];
        demoTable(defaultSample);
        charting(defaultSample);
    });
}

function optionChanged(sampleName) {
    // //menu as event to get selected event
    // var filterVal = d3.select("#selDataset").property('value');
    // console.log(filterVal);
    //refresh charts with value
    demoTable(sampleName)
    charting(sampleName);
}

function demoTable(sampleName) {
    d3.json("samples.json").then((data) => {
        var tabInfo = data.metadata;
        console.log(tabInfo)
        var filtered = tabInfo.filter(x => x.id == sampleName)[0];
        console.log(filtered)
        var tablegraphic = d3.select("#sample-metadata");
        tablegraphic.html("")
        // Object.entries(filtered).forEach((i) => {
        //     tablegraphic.append('h5').text(i[0].toUpperCase() + ': ' +  i[1] + '\n');
        // });
        Object.entries(filtered).forEach(([key,value]) => {
            var row = tablegraphic.append('tr');
            var cell = tablegraphic.append('td');
            cell.text(key.toUpperCase() + `: ${value}`)
            var cell = row.append('td');
            // cell.text(`: ${value}`)
        });
    });
}

function charting(sampleName) {
    d3.json("samples.json").then((data) => {
        var tabInfo = data.samples;
        var filtered = tabInfo.filter(x => x.id.toString() === sampleName)[0];
        console.log(filtered)
        var otu_ids = filtered.otu_ids;
        var otu_labels = filtered.otu_labels
        var sample_values = filtered.sample_values;
        
        //bar chart
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: sample_values.slice(1,10),
            y: otu_ids.slice(1,10).map(x => `OTU ${x}`),
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTU",
            xaxis: { title: "OTU (Operational Taxonomic Unit) Labels" },
            yaxis: { title: "OTU (Operational Taxonomic Unit) IDs" }
        };
        Plotly.newPlot("bar", data1, layout1);

        var desired_maximum_marker_size = 40;
        var size = sample_values
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            markers: {
                size: size,
                //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
                sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
                sizemode: 'area',                
                color: otu_ids,
                colorscale: [
                    ['0.0', 'rgb(40, 190, 220)'],
                    ['0.1', 'rgb(51, 175, 221)'],
                    ['0.2', 'rgb(62, 160, 222)'],
                    ['0.3', 'rgb(73, 145, 223)'],
                    ['0.4', 'rgb(84, 130, 224)'],
                    ['0.5', 'rgb(95, 115, 225)'],
                    ['0.6', 'rgb(106, 100, 226)'],
                    ['0.7', 'rgb(117, 85, 227)'],
                    ['0.8', 'rgb(128, 70, 228)'],
                    ['0.9', 'rgb(139, 55, 229)'],
                    ['1.0', 'rgb(150, 40, 230)']
                  ]            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: 'Cultures per Sample',
            margin: { t: 25, r: 25, l: 25, b: 25 },
            showlegend: false,
            hovermode: 'closest',
            xaxis: {
                title:"OTU (Operational Taxonomic Unit) ID  from Sample " +sampleName
            },
             yaxis: {
                range: [0, Math.max.apply(null, sample_values) * 4]
            },
            margin: {t:50}
        };
        Plotly.newPlot("bubble", data2, layout2);
    });
}



//initialize Dashboard
dropDownMenu();