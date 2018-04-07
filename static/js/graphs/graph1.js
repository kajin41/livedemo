var parseDate = d3.time.format("%b.%y").parse,
      formatYear = d3.format("02d"),
      formatDate = function (d) { return "Q" + ((d.getMonth() / 3 | 0) + 1) + formatYear(d.getFullYear() % 100); };

  var margin = { top: 10, right: 20, bottom: 20, left: 60 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var y0 = d3.scale.ordinal()
      .rangeRoundBands([height, 0], .2);

  var y1 = d3.scale.linear();

  var y2 = d3.scale.linear();

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1, 0);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(formatDate);

  var stack = d3.layout.stack()
      .values(function (d) { return d.values; })
      .x(function (d) { return d.date; })
      .y(function (d) { return d.value; })
      .out(function (d, y0) { d.valueOffset = y0; });

  var color = d3.scale.ordinal()

  var svg = d3.select("#graph1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("data.csv", function (error, data) {

    var dataByGroup = d3.nest().key(function (d) { return d.Instrument }).entries(data);

    var maxval = 0;
    dataByGroup = dataByGroup.slice(1, dataByGroup.length);
    dataByGroup.forEach(function (d, i) {
      d.values = d3.entries(d.values[0]).slice(2, d3.entries(d.values[0]).length);
      var tempmax = d3.max(d.values, function (dd) { return +dd.value || 0 });
      if (maxval < tempmax) {
        maxval = +tempmax;
      }
      d.values.forEach(function (dd, i) {
        dd.date = parseDate(dd.key);
        dd.key = null;
        dd.group = d.key;
        dd.value = +dd.value || 0;
      });
    });

    stack(dataByGroup);
    x.domain(dataByGroup[0].values.map(function (d) { return d.date; }));
    y0.domain(dataByGroup.map(function (d, i) { return d.key; }));
    y1.domain([0, maxval]).range([y0.rangeBand(), 0]);
    y2.domain([0, maxval]).range([0, height - 200]);

    //match colors to BIS colors used in pdf
    //made easy using Jason Davies eyedropper http://www.jasondavies.com/eyedropper/
    color
      .domain(y0.domain)
      .range(["#929993","#c28191","#6cade1","#ffec72","#828fc6","#e3c291"]);

    var group = svg.selectAll(".group")
        .data(dataByGroup)
      .enter().append("g")
        .attr("class", "group")
        .attr("transform", function (d) { return "translate(0," + y0(d.key) + ")"; });

    group.selectAll("rect")
        .data(function (d) { return d.values; })
      .enter().append("rect")
        .style("fill", function (d) { return color(d.group); })
        .attr("x", function (d) { return x(d.date); })
        .attr("y", function (d) { return y1(d.value); })
        .attr("width", x.rangeBand())
        .attr("height", function (d) { return y0.rangeBand() - y1(d.value); });

    group.append("text")
        .attr("class", "group-label")
        .attr("x", width)
        .attr("y", function (d) { return y1(d.values[0].value / 2); })
        .attr("dy", ".35em")
        .text(function (d) { return d.key; });

    group.filter(function (d, i) { return !i; }).append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y0.rangeBand() + ")")
        .call(xAxis);

    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function () {
      d3.select("input[value=\"stacked\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
      clearTimeout(timeout);
      if (this.value === "multiples") transitionMultiples();
      else transitionStacked();
    }

    function transitionMultiples() {
      var t = svg.transition().duration(750),
          g = t.selectAll(".group").attr("transform", function (d) { return "translate(0," + y0(d.key) + ")"; });
      g.selectAll("rect")
        .attr("height", function (d) { return y0.rangeBand() - y1(d.value); })
        .attr("y", function (d) { return y1(d.value); });
      g.select(".group-label")
        .attr("y", function (d) { return y1(d.values[0].value / 2); })
        .attr("x", width);
    }

    function transitionStacked() {
      var t = svg.transition().duration(750),
          g = t.selectAll(".group").attr("transform", "translate(0," + y0(y0.domain()[0]) + ")");
      g.selectAll("rect")
          .attr("height", function (d) { return y2(d.value); })
          .attr("y", function (d) { return y2(-d.value - d.valueOffset); });

      g.select(".group-label")
        .attr("y", function (d) {
          return y2(-(d.values[d.values.length - 1].value / 2 + d.values[d.values.length - 1].valueOffset));
        })
    }
  });
