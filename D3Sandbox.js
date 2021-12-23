let D3nodes = [{
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

let D3links = [{
    'source': 0,
    'target': 1,
}, {
    'source': 0,
    'target': 2,
}, {
    'source': 2,
    'target': 3,
}];

function D3test() {
    let width = 1000, height = 700;
    let D3svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);
    let D3force = d3.layout.force()
        .gravity(0.1)
        .distance(100)
        .charge(-700)
        .size([width, height]);
    D3force.nodes(D3nodes)
        .links(D3links)
        .start();
    let D3linkSvg = D3svg.selectAll('.link')
        .data(D3links)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke', 'black')
        .style('stroke-width', '2px');

    let D3nodeSvg = D3svg.selectAll('.node')
        .data(D3nodes)
        .enter().append('g')
        .attr('class', 'node')
        .call(D3force.drag);

    D3nodeSvg.append('circle')
        .attr('r', 13)
        .attr('fill', function (d) {
            return D3colorNode(d.group);
        });

    D3nodeSvg.append('text')
        .attr('dx', -18)
        .attr('dy', 8)
        .style('font-size', '18px')
        .text(function (d) {
            return d.name;
        });

    function D3colorNode(group) {
        if (group === 1) { return '#aaa'; } // gray
        if (group === 2) { return '#fbc280';} // Soft orange
        else { return '#405275'; } // Dark moderate blue
    }

    D3force.on('tick', function () {
        D3linkSvg.attr('x1', function (d) {
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
        D3nodeSvg.attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
    });

    // try commenting the below line and see how d3 starts :)
    for (let i = 0; i < 300; ++i) { D3force.tick(); }
}