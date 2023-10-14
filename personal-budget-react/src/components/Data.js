export const budget = {
    myBudget: [
      {
          title: 'Eat out',
          budget: 30
      },
      {
          title: 'Rent',
          budget: 350
      }, 
      {
          title: 'Groceries',
          budget: 90
      },
      {
          title: 'Entertainment',
          budget: 50
      },
      {
          title: 'Healthcare',
          budget: 70
      },
      {
          title: 'Housing',
          budget: 500
      },
      {
          title: 'Medicine',
          budget: 100
      }, 
    ]
  };

  const dataSource = {
    labels: [
        'Eat out',
        'Rent',
        'Groceries', 
        'Entertainment',
        'Healthcare',
        'Housing',
        'Medicine'
    ],
    datasets: [{
        label: 'Budget',
        data: [30, 350, 90, 50, 70, 500, 100],
        backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
        ],
        hoverOffset: 4
     }]
 };

 function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: dataSource
    });
 }

 function getBudget(){
    axios.get('/budget')
    .then(function (res){
        console.log(res.data);
        for(var i = 0; i < res.data.myBudget.length; i++){
            dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
            dataSource.labels[i] = res.data.myBudget[i].title;
        }
        createChart();
    })
 }
 getBudget();