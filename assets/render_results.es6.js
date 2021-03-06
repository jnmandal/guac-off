function getResults() {
    return fetch('/results')
        .then(res => res.json())
        .then(results => window.results = results);
}

function getDips() {
    return fetch('/guacamoles')
        .then(res => res.json())
        .then(dips => window.dips = dips);
}

function render() {
    var ctx = document.getElementById("rating-chart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dips.map(d => d.name),
            datasets: [{
                label: 'Avg Rating',
                data: results.map(r => r.average),
                backgroundColor: '#F7941D'
            }, ]
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
            labels: dips.map(d => d.name),
            datasets: [{
                label: 'Rating count',
                data: results.map(r => r.count),
                backgroundColor: '#58AAD4'
            }, ]
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

    document.getElementById('results-table').innerHTML =
        `<thead>
      <tr><th>criteria</th>${dips.map(d => `<th>${d.name}</th>`).join('')}</tr>
    </thead>
    <tbody>
      <tr><td>average</td>${results.map(r => `<td>${r.average}</td>`).join('')}</tr>
      <tr><td>count</td>${results.map(r => `<td>${r.count}</td>`).join('')}</tr>
    </tbody>`
}

getResults()
  .then(getDips)
  .then(render);
