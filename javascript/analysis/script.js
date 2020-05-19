var btns = document.getElementsByClassName("btn1");
for (var i = 0; i < btns.length; i++) {
  addEvent(btns[i], "click", function () {
    var current = document.getElementsByClassName("active1");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active1", "");
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

filter("all");
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
var year_title = document.getElementById("year_title");
var otp_title = document.getElementById("otp_title");
var own_title = document.getElementById("own_title");
previous = "#18";

format = d3.format(",");

slider.oninput = function () {
  step();
};

step("All keywords");

function step(drug) {
  year = 2006 + parseInt(slider.value);
  if (drug == undefined) {
    drug = $(".active1").text();
  }
  Plotly.d3.csv("vader-data/polarity.csv", function (err, rows) {
    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      });
    }

    var num = unpack(rows, year + "-" + drug);
    var pol = [
      "[-1.0, -0.75)",
      "[-0.75, -0.50)",
      "[-0.50, -0.25)",
      "[-0.25, 0.0)",
      "0.0 ",
      "(0.0, 0.25]",
      "(0.25, 0.50]",
      "(0.50, 0.75]",
      "(0.75, 1.0]",
    ];
    var hover = [];
    for (var i = 0; i < pol.length; i++) {
      hover[i] =
        "Number of Tweets: <b>" +
        format(num[i]) +
        "</b><br>Polarity: <b>" +
        pol[i] +
        "</b>";
    }

    var data = [
      {
        x: pol,
        y: num,
        type: "bar",
        marker: {
          color: [
            "#de3b44",
            "#e66e60",
            "#ee9d7a",
            "#f6d096",
            "#feffaf",
            "#d2e2b3",
            "#a9c7b6",
            "#80acb9",
            "#538ebd",
          ],
        },
        hovertext: hover,
        hoverinfo: "text",
      },
    ];

    var layout = {
      title: {
        text: "<b>Number of Tweets by Polarity: " + drug + ", " + year + "</b>",
        font: {
          size: 24,
        },
        x: 0.02,
      },
      bargap: 0.02,
      xaxis: {
        range: [-0.75, 8.75],
        tickmode: "array",
        tickvals: [-0.5, 0.5, 1.5, 2.5, 4, 5.5, 6.5, 7.5, 8.5],
        ticktext: [
          "-1.0",
          "-0.75",
          "-0.50",
          "-0.25",
          "0.0",
          "0.25",
          "0.50",
          "0.75",
          "1.0",
        ],
        showline: false,
        zeroline: false,
        title: "Polarity",
        titlefont: {
          size: 16,
        },
        tickfont: {
          size: 14,
        },
        type: "category",
      },
      yaxis: {
        showline: false,
        zeroline: true,
        zerolinecolor: "#eeeeee",
        zerolinewidth: 1,
        // title: 'Number of Tweets',
        tickformat: ",.0f",
        titlefont: {
          size: 16,
        },
        tickfont: {
          size: 14,
        },
      },
      margin: {
        pad: 4,
      },
      font: {
        family: "Roboto Condensed",
        color: "rgb(51, 51, 51)",
      },
    };

    Plotly.newPlot("pol", data, layout, {
      modeBarButtonsToRemove: [
        "sendDataToCloud",
        "toggleSpikelines",
        "zoom2d",
        "pan2d",
        "select2d",
        "lasso2d",
        "zoomIn2d",
        "zoomOut2d",
        "autoScale2d",
        "resetScale2d",
        "hoverClosestCartesian",
        "hoverCompareCartesian",
      ],
      responsive: true,
      displaylogo: false,
    });
  });

  // Plotly.d3.csv('results/subjectivity-with-all.csv', function(err, rows){
  //     function unpack(rows, key) {
  //         return rows.map(function(row) { return row[key]; });
  //     }

  //     var num = unpack(rows, year+'-'+drug);
  //     var sub = ['0.0 ', '(0.0, 0.25]', '(0.25, 0.50]', '(0.50, 0.75]', '(0.75, 1.0]'];
  //     var hover = [];

  //     for (var i = 0;  i < sub.length; i++) {
  //         hover[i] = 'Number of Tweets: <b>' + format(num[i]) + '</b><br>Subjectivity: <b>' + sub[i] + '</b>'
  //     }

  //     var data = [{
  //         x: sub,
  //         y: num,
  //         hovertext: hover,
  //         hoverinfo: 'text',
  //         type: 'bar',
  //         marker: {
  //           color: ['#feffaf', '#d2e2b3', '#a9c7b6', '#80acb9', '#538ebd']
  //         }
  //     }];

  //     var layout = {
  //         title: {
  //             text: '<b>Number of Tweets by Subjectivity: ' + drug + ', ' + year + '</b>',
  //             font: {
  //                 size: 24
  //             },
  //             x: 0.02
  //         },
  //         bargap: 0.02,
  //         xaxis: {
  //             range: [-0.75, 4.75],
  //             tickmode: 'array',
  //             tickvals: [0, 1.5, 2.5, 3.5, 4.5],
  //             ticktext: ['0.0', '0.25', '0.50', '0.75', '1.0'],
  //             showline: false,
  //             zeroline: false,
  //             title: 'Subjectivity',
  //             titlefont: {
  //                 size: 16
  //             },
  //             tickfont: {
  //                 size: 14
  //             }
  //         },
  //         yaxis: {
  //             showline: false,
  //             zeroline: true,
  //             zerolinecolor: '#eeeeee',
  //             zerolinewidth: 1,
  //             // title: 'Number of Tweets',
  //             tickformat: ",.0f",
  //             titlefont: {
  //                 size: 16
  //             },
  //             tickfont: {
  //                 size: 14
  //             }
  //         },
  //         margin: {
  //             pad: 4
  //         },
  //         font: {
  //             family: 'Roboto Condensed',
  //             color: 'rgb(51, 51, 51)'
  //         }
  //     };

  //     Plotly.newPlot('sub', data, layout, {modeBarButtonsToRemove: ['sendDataToCloud', 'toggleSpikelines', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], responsive: true, displaylogo: false});
  // });
}

function stepUp() {
  slider.stepUp(1);
  step();
}

function stepDown() {
  slider.stepDown(1);
  step();
}

// Plotly.d3.csv('results/teds-tweets.csv', function(err, rows){
//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     }

//     var years = unpack(rows, 'year'),
//     teds_heroin = unpack(rows, 'teds-heroin'),
//     teds_o_drugs = unpack(rows, 'teds-o_drugs'),
//     tw_heroin = unpack(rows, 'tw-heroin'),
//     tw_o_drugs = unpack(rows, 'tw-o_drugs');

//     var data = [{
//         x: years,
//         y: teds_heroin,
//         type: 'line',
//         marker: {
//           color: '#de3b44'
//         },
//         line: {
//             dash: 'dot'
//         },
//         name: 'TEDS-Heroin'
//     },{
//         x: years,
//         y: teds_o_drugs,
//         type: 'line',
//         marker: {
//           color: '#538ebd'
//         },
//         line: {
//             dash: 'dot'
//         },
//         name: 'TEDS-Other opioids'
//     },{
//         x: years,
//         y: tw_heroin,
//         type: 'line',
//         marker: {
//           color: '#de3b44'
//         },
//         line: {
//             dash: 'solid'
//         },
//         name: 'Tweets-Heroin'
//     },{
//         x: years,
//         y: tw_o_drugs,
//         type: 'line',
//         marker: {
//           color: '#538ebd'
//         },
//         line: {
//             dash: 'solid'
//         },
//         name: 'Tweets-Other opioids'
//     }];

//     var layout = {
//         title: {
//             text: '<b>teds v tweets</b>',
//             font: {
//                 size: 28
//             },
//             x: 0.02
//         },
//         bargap: 0.02,
//         xaxis: {
//             showline: false,
//             zeroline: false,
//             title: 'Year',
//             titlefont: {
//                 size: 16
//             },
//             tickfont: {
//                 size: 14
//             },
//             type: 'year',
//             dtick: 1
//         },
//         yaxis: {
//             showline: false,
//             zeroline: true,
//             zerolinecolor: '#eeeeee',
//             zerolinewidth: 1,
//             title: 'Number of TEDS Admissions, Tweets',
//             tickformat: ",.0f",
//             titlefont: {
//                 size: 16
//             },
//             tickfont: {
//                 size: 14
//             },
//             automargin: true
//         },
//         margin: {
//             pad: 4,
//             l: 100,
//             r: 100
//         },
//         font: {
//             family: 'Roboto Condensed',
//             color: 'rgb(51, 51, 51)'
//         }
//     };

//     Plotly.newPlot('teds', data, layout, {modeBarButtonsToRemove: ['sendDataToCloud', 'toggleSpikelines', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'], responsive: true, displaylogo: false});
// });

Plotly.d3.csv("results/tweetsxtime.csv", function (err, rows) {
  function unpack(rows, key) {
    return rows.map(function (row) {
      return row[key];
    });
  }

  var years = unpack(rows, "year"),
    Codei = unpack(rows, "Codeine/Tylenol #3"),
    Demer = unpack(rows, "Demerol/Meperidine"),
    Hydro = unpack(rows, "Hydromorphone/Dilaudid"),
    Fenta = unpack(rows, "Fentanyl/Duragesic"),
    Vicod = unpack(rows, "Vicodin/Norco/Hydrocodone"),
    Metha = unpack(rows, "Methadone"),
    Morph = unpack(rows, "Morphine"),
    Opiat = unpack(rows, "Opiate(s)"),
    Opioi = unpack(rows, "Opioid(s)"),
    Oxyco = unpack(rows, "Oxycodone/Percocet"),
    Oxyco = unpack(rows, "Oxycontin"),
    Trama = unpack(rows, "Tramadol/Ultram"),
    Heroi = unpack(rows, "Heroin");

  var data = [
    {
      x: years,
      y: Codei,
      type: "line",
      marker: { color: "#a6cee3" },
      name: "Codeine/Tylenol #3",
    },
    {
      x: years,
      y: Demer,
      type: "line",
      marker: { color: "#1f78b4" },
      name: "Demerol/Meperidine",
    },
    {
      x: years,
      y: Fenta,
      type: "line",
      marker: { color: "#33a02c" },
      name: "Fentanyl/Duragesic",
    },
    {
      x: years,
      y: Heroi,
      type: "line",
      marker: { color: "#8ab1ff" },
      name: "Heroin",
    },
    {
      x: years,
      y: Hydro,
      type: "line",
      marker: { color: "#b2df8a" },
      name: "Hydromorphone/Dilaudid",
    },
    {
      x: years,
      y: Metha,
      type: "line",
      marker: { color: "#e31a1c" },
      name: "Methadone",
    },
    {
      x: years,
      y: Morph,
      type: "line",
      marker: { color: "#fdbf6f" },
      name: "Morphine",
    },
    {
      x: years,
      y: Opiat,
      type: "line",
      marker: { color: "#ff7f00" },
      name: "Opiate(s)",
    },
    {
      x: years,
      y: Opioi,
      type: "line",
      marker: { color: "#cab2d6" },
      name: "Opioid(s)",
    },
    {
      x: years,
      y: Oxyco,
      type: "line",
      marker: { color: "#6a3d9a" },
      name: "Oxycodone/Percocet",
    },
    {
      x: years,
      y: Oxyco,
      type: "line",
      marker: { color: "#ffff99" },
      name: "Oxycontin",
    },
    {
      x: years,
      y: Trama,
      type: "line",
      marker: { color: "#b15928" },
      name: "Tramadol/Ultram",
    },
    {
      x: years,
      y: Vicod,
      type: "line",
      marker: { color: "#fb9a99" },
      name: "Vicodin/Norco/Hydrocodone",
    },
  ];

  var layout = {
    title: {
      text: "<b>Tweets by Keyword Over Time</b>",
      font: {
        size: 28,
      },
      x: 0.02,
    },
    bargap: 0.02,
    xaxis: {
      showline: false,
      zeroline: false,
      title: "Year",
      titlefont: {
        size: 16,
      },
      tickfont: {
        size: 14,
      },
      // type: 'year',
      dtick: 2,
    },
    yaxis: {
      showline: false,
      zeroline: true,
      zerolinecolor: "#eeeeee",
      zerolinewidth: 1,
      title: "Tweets",
      tickformat: ",.0f",
      titlefont: {
        size: 16,
      },
      tickfont: {
        size: 14,
      },
      automargin: true,
      // type: 'log'
    },
    height: 600,
    margin: {
      pad: 6,
      l: 100,
      r: 100,
    },
    font: {
      family: "'Roboto Condensed'",
      color: "rgb(51, 51, 51)",
    },
  };

  Plotly.newPlot("tweetsxtime", data, layout, {
    modeBarButtonsToRemove: [
      "sendDataToCloud",
      "toggleSpikelines",
      "zoom2d",
      "pan2d",
      "select2d",
      "lasso2d",
      "zoomIn2d",
      "zoomOut2d",
      "autoScale2d",
      "resetScale2d",
      "hoverClosestCartesian",
      "hoverCompareCartesian",
    ],
    responsive: true,
    displaylogo: false,
  });
});

Plotly.d3.csv("results/timeline.csv", function (err, rows) {
  function unpack(rows, key) {
    return rows.map(function (row) {
      return row[key];
    });
  }

  var dates = unpack(rows, "date"),
    count = unpack(rows, "count"),
    headlines = unpack(rows, "headline");

  var data = [
    {
      x: dates,
      y: count,
      mode: "lines+markers",
      type: "scatter",
      // r: 'markers',
      // text: headlines,
      text: headlines,
      hovertemplate: "%{text}<extra>%{y}</extra>",
      marker: {
        color: "rgb(62,85,130)",
      },
      line: {
        color: "rgb(138,177,255)",
        //     dash: 'dot'
      },
      // name: 'TEDS-Heroin'
    },
  ];

  var layout = {
    title: {
      text: "<b>Most Tweeted Links</b>",
      font: {
        size: 28,
      },
      x: 0.02,
    },
    annotations: [
      {
        x: "2018-07-24",
        y: 19422,
        xref: "x",
        yref: "y",
        text:
          '"Demi Lovato Hospitalized After Drug Overdose"<br><i>iHeartRadio</i>',
        showarrow: true,
        arrowhead: 0,
        arrowwidth: 1,
        arrowcolor: "rgb(62,85,130)",
        // arrowsize: 2,
        ax: 160,
        ay: 60,
        font: {
          size: 14,
        },
      },
      {
        x: "2017-10-10",
        y: 10242,
        xref: "x",
        yref: "y",
        text:
          '"Vikings at Bears: Five Game-Changing Plays"<br><i>Daily Norseman</i>',
        showarrow: true,
        arrowhead: 0,
        arrowwidth: 1,
        arrowcolor: "rgb(62,85,130)",
        // arrowsize: 2,
        ax: -40,
        ay: -80,
        font: {
          size: 14,
        },
      },
    ],
    xaxis: {
      showline: false,
      zeroline: false,
      // title: 'Year',
      titlefont: {
        size: 16,
      },
      tickfont: {
        size: 14,
      },
    },
    yaxis: {
      showline: false,
      zeroline: false,
      zerolinecolor: "#eeeeee",
      zerolinewidth: 1,
      // title: 'Number of TEDS Admissions, Tweets',
      tickformat: ",.0f",
      titlefont: {
        size: 16,
      },
      tickfont: {
        size: 14,
      },
      automargin: true,
    },
    margin: {
      pad: 4,
    },
    font: {
      family: "Roboto Condensed",
      color: "rgb(51, 51, 51)",
    },
  };

  Plotly.newPlot("timeline", data, layout, {
    modeBarButtonsToRemove: [
      "sendDataToCloud",
      "toggleSpikelines",
      "zoom2d",
      "pan2d",
      "select2d",
      "lasso2d",
      "zoomIn2d",
      "zoomOut2d",
      "autoScale2d",
      "resetScale2d",
      "hoverClosestCartesian",
      "hoverCompareCartesian",
    ],
    responsive: true,
    displaylogo: false,
  });
});
