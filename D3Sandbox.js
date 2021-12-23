function testD3() {
    let myNodes = [{
        "name": "Luke",
        "affiliation": "jedi",
        "group": 1
    }, {
        "name": "Leia",
        "affiliation": "princess",
        "group": 1
    }, {
        "name": "Darth Vadar",
        "affiliation": "sith",
        "group": 2
    }, {
        "name": "Palpatine",
        "affiliation": "sith",
        "group": 2
    }];

    let myLinks = [{
        'source': 0,
        'target': 1,
    }, {
        'source': 0,
        'target': 2,
    }, {
        'source': 2,
        'target': 3,
    }];

    let width = 1000, height = 700;
    let svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);
    let force = d3.layout.force()
        .gravity(0.1)
        .distance(100)
        .charge(-700)
        .size([width, height]);
    force.nodes(myNodes)
        .links(myLinks)
        .start();
    let link = svg.selectAll('.link')
        .data(myLinks)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke', 'black')
        .style('stroke-width', '2px');

    let node = svg.selectAll('.node')
        .data(myNodes)
        .enter().append('g')
        .attr('class', 'node')
        .call(force.drag);

    node.append('circle')
        .attr('r', 13)
        .attr('fill', function (d) {
            return color(d.group);
        });

    node.append('text')
        .attr('dx', -18)
        .attr('dy', 8)
        .style('font-size', '18px')
        .text(function (d) {
            return d.name;
        });

    function color(group) {
        if (group === 1) {
            return '#aaa';
        } // gray
        if (group === 2) {
            return '#fbc280';
        } // Soft orange
        else {
            return '#405275';
        } // Dark moderate blue
    }

    force.on('tick', function () {
        link.attr('x1', function (d) {
            return d.source.x;
        })
            .attr('y1', function (d) {
                return d.source.y;
            })
            .attr('x2', function (d) {
                return d.target.x;
            })
            .attr('y2', function (d) {
                return d.target.y;
            });
        node.attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
    });

    // try commenting the below line and see how d3 starts :)
    for (let i = 0; i < 300; ++i) {
        force.tick();
    }
}