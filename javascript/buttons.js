var btns = document.getElementsByClassName("btn1");
for (var i = 0; i < btns.length; i++) {
    addEvent(btns[i], "click", function () {
        var current = document.getElementsByClassName("active1");
        if (current.length > 0) {
            current[0].className = current[0].className.replace("active1", "");
        }
        this.className += " active1";
    });
}

var btns2 = document.getElementsByClassName("btn2");
for (var i = 0; i < btns2.length; i++) {
    addEvent(btns2[i], "click", function () {
        var current = document.getElementsByClassName("active2");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active2", "");
        }
        this.className += " active2";
    });
}

filter("all")

function filter(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


var slider = document.getElementById("myRange");
var year_title = document.getElementById('year_title');
var otp_title = document.getElementById('otp_title');
var own_title = document.getElementById('own_title');
previous = '#18';

format = d3.format(',');

slider.oninput = function () {
    step();
}

step('Codeine/Tylenol #3');

function step(drug) {
    year = 2006 + parseInt(slider.value);
    if (drug == undefined) {
        drug = $('.active1').text();
    }
    Plotly.d3.csv('results/polarity.csv', function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }

        var num = unpack(rows, year + '-' + drug);
        var pol = ['[-1.0, -0.75)', '[-0.75, -0.50)', '[-0.50, -0.25)', '[-0.25, 0.0)', '0.0 ', '(0.0, 0.25]', '(0.25, 0.50]', '(0.50, 0.75]', '(0.75, 1.0]'];
        var hover = [];
        for (var i = 0; i < pol.length; i++) {
            hover[i] = 'Number of Tweets: <b>' + format(num[i]) + '</b><br>Polarity: <b>' + pol[i] + '</b>'
        }

        var data = [{
            x: pol,
            y: num,
            type: 'bar',
            marker: {
                color: ['#538ebd', '#80acb9', '#a9c7b6', '#d2e2b3', '#feffaf', '#f6d096', '#ee9d7a', '#e66e60', '#de3b44']
            },
            hovertext: hover,
            hoverinfo: 'text'
        }];

        var layout = {
            title: {
                text: '<b>Number of Tweets by Polarity: ' + drug + ', ' + year + '</b>',
                font: {
                    size: 24
                },
                x: 0.02
            },
            bargap: 0.02,
            xaxis: {
                range: [-0.75, 8.75],
                tickmode: 'array',
                tickvals: [-0.5, 0.5, 1.5, 2.5, 4, 5.5, 6.5, 7.5, 8.5],
                ticktext: ['-1.0', '-0.75', '-0.50', '-0.25', '0.0', '0.25', '0.50', '0.75', '1.0'],
                showline: false,
                zeroline: false,
                title: 'Polarity',
                titlefont: {
                    size: 16
                },
                tickfont: {
                    size: 14
                },
                type: 'category',
            },
            yaxis: {
                showline: false,
                zeroline: true,
                zerolinecolor: '#eeeeee',
                zerolinewidth: 1,
                // title: 'Number of Tweets',
                tickformat: ",.0f",
                titlefont: {
                    size: 16
                },
                tickfont: {
                    size: 14
                }
            },
            margin: {
                pad: 4
            },
            font: {
                family: 'Roboto Condensed',
                color: 'rgb(51, 51, 51)'
            }
        };

        Plotly.newPlot('pol', data, layout, {
            modeBarButtonsToRemove: ['sendDataToCloud', 'toggleSpikelines', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
            responsive: true,
            displaylogo: false
        });
    });

    Plotly.d3.csv('results/subjectivity.csv', function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }

        var num = unpack(rows, year + '-' + drug);
        var sub = ['0.0 ', '(0.0, 0.25]', '(0.25, 0.50]', '(0.50, 0.75]', '(0.75, 1.0]'];
        var hover = [];

        for (var i = 0; i < sub.length; i++) {
            hover[i] = 'Number of Tweets: <b>' + format(num[i]) + '</b><br>Subjectivity: <b>' + sub[i] + '</b>'
        }

        var data = [{
            x: sub,
            y: num,
            hovertext: hover,
            hoverinfo: 'text',
            type: 'bar',
            marker: {
                color: ['#feffaf', '#f6d096', '#ee9d7a', '#e66e60', '#de3b44']
            }
        }];

        var layout = {
            title: {
                text: '<b>Number of Tweets by Subjectivity: ' + drug + ', ' + year + '</b>',
                font: {
                    size: 24
                },
                x: 0.02
            },
            bargap: 0.02,
            xaxis: {
                range: [-0.75, 4.75],
                tickmode: 'array',
                tickvals: [0, 1.5, 2.5, 3.5, 4.5],
                ticktext: ['0.0', '0.25', '0.50', '0.75', '1.0'],
                showline: false,
                zeroline: false,
                title: 'Subjectivity',
                titlefont: {
                    size: 16
                },
                tickfont: {
                    size: 14
                }
            },
            yaxis: {
                showline: false,
                zeroline: true,
                zerolinecolor: '#eeeeee',
                zerolinewidth: 1,
                // title: 'Number of Tweets',
                tickformat: ",.0f",
                titlefont: {
                    size: 16
                },
                tickfont: {
                    size: 14
                }
            },
            margin: {
                pad: 4
            },
            font: {
                family: 'Roboto Condensed',
                color: 'rgb(51, 51, 51)'
            }
        };

        Plotly.newPlot('sub', data, layout, {
            modeBarButtonsToRemove: ['sendDataToCloud', 'toggleSpikelines', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
            responsive: true,
            displaylogo: false
        });
    });
}

function stepUp() {
    slider.stepUp(1);
    step();
}

function stepDown() {
    slider.stepDown(1);
    step();
}