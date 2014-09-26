Highcharts.setOptions({
  chart: {
    borderColor: '#ffffff',
    zoomType: 'xy',
    defaultSeriesType: 'area',
    animation: true,
    spacingTop: 5,
    //spacingBottom: 10,
    spacingBottom: 100,
    spacingLeft: 3,
    spacingRight: 5,
    margin: [45, 10, 16, 60],
      //margin: [45, 0, 20, 35],
    //margin: [45, 0, 150, 35],
    style:  { fontFamily: 'sans-serif' }
  },
  title: { /*margin: 5*/ },
  credits: { enabled: false },
  legend: {
    enabled: false,
    //layout: 'vertical',
    //align: 'left',
    verticalAlign: 'bottom',
    align: 'right',
    floating: true,
    backgroundColor: '#FFFFFF'
  },
  xAxis: {
    //categories: [2010,2015,2020,2025,2030,2035,2040,2045,2050],
    categories: [2012,2017,2022,2027,2032,2037,2042,2047],
    tickWidth: 0,
    title: { enabled: false },
    labels: {
      formatter: function() {
        switch(this.value) {
          case 2012: return 2012; break;
          //case 2017: return 2017; break;
          case 2027: return 2027; break;
          case 2037: return 2037; break;
          // case 2050: return 2050; break;
          case 2047: return 2047; break;
          // default: return this.value - 2000;
        }
      }
    }
  },
  yAxis: {
    labels: {
      formatter: function() {
        return this.value / 1;
      }
    }
  },
  tooltip: {
    formatter: function() {
      var head = this.series.name.split(" ");
      var newhead = [];
      for(var i=0; i< head.length; i++) {
        if(i>0 && (i%3) == 0) {
            newhead.push("<br />");
            //newhead.push("<strong>");
        }
        newhead.push(head[i]);
      }
      return '<b>' + newhead.join(" ")+ '</b><br/>'+
      this.x +': '+ Highcharts.numberFormat(this.y, 0, ',') +' TWh/yr';
    }
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      animation: true,
      lineWidth: 1,
      shadow: false,
      lineColor: '#fff',
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            radius: 5
          }
        }
      }
    },
    line: {
      animation: true,
      shadow: false,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            radius: 5
          }
        }
      }
    }
  }
});
