'use strict';

function getResults() {
    return fetch('/results').then(function (res) {
        return res.json();
    }).then(function (results) {
        return window.results = results;
    });
}

function getDips() {
    return fetch('/guacamoles').then(function (res) {
        return res.json();
    }).then(function (dips) {
        return window.dips = dips;
    });
}

function render() {
    var ctx = document.getElementById("rating-chart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dips.map(function (d) {
                return d.name;
            }),
            datasets: [{
                label: 'Avg Rating',
                data: results.map(function (r) {
                    return r.average;
                }),
                backgroundColor: '#F7941D'
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 3,
                        max: 5
                    }
                }]
            }
        }
    });

    var ctx = document.getElementById("count-chart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dips.map(function (d) {
                return d.name;
            }),
            datasets: [{
                label: 'Rating count',
                data: results.map(function (r) {
                    return r.count;
                }),
                backgroundColor: '#58AAD4'
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 6,
                        max: 18
                    }
                }]
            }
        }
    });

    document.getElementById('results-table').innerHTML = '<thead>\n      <tr><th>criteria</th>' + dips.map(function (d) {
        return '<th>' + d.name + '</th>';
    }).join('') + '</tr>\n    </thead>\n    <tbody>\n      <tr><td>average</td>' + results.map(function (r) {
        return '<td>' + r.average + '</td>';
    }).join('') + '</tr>\n      <tr><td>count</td>' + results.map(function (r) {
        return '<td>' + r.count + '</td>';
    }).join('') + '</tr>\n    </tbody>';
}

getResults().then(getDips).then(render);
