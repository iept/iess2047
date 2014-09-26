class LandUse



  constructor: () ->

  setup: () ->
    target = $('#results')
    target.append("<div id='land_use' class='chart'></div>")


    #The following lines position the viewmessage box, chart and results
    document.getElementById("land_use").style.width = "100%"
    document.getElementById("results").style.width = "55%"
    document.getElementById("results").style.marginRight = "40px"
    document.getElementById("results").style.overflow = "inherit"
    document.getElementById("viewmessage").style.width = "30%"
    document.getElementById("viewmessage").style.margin = "30px 0px 30px 50px"

    @land_chart = new Highcharts.Chart({
      chart: {
        renderTo: 'land_use',
        type: 'bar',

        margin: [45, 25, 70, 140],
      },
      title: { text: 'Land Footprint of Renewables, Conventionals and Bionergy' },
      subtitle: { text: "In hectares of land"},
      yAxis: { title: null, min: 0, max: 10000000 },
      xAxis: {
        categories: ['Renewables',
                     'Conventional',
                     'Bio Energy'],
        labels: formatter: ->
          @value
      },

      legend: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.1)',
        floating: true,
        align: 'center',
        verticalAlign: 'middle',
        itemStyle: {
          font: '8pt sans-serif',
        },  },

      tooltip: {
        formatter: () ->
          "<b>#{this.series.name}</b><br/>#{this.x}: #{Highcharts.numberFormat(this.y, 3)} ha"
      },

      plotOptions: {
        series: {
          #stacking: 'normal',
          dataLabels: {
            enabled: false,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            formatter: () ->
              " #{Highcharts.numberFormat(this.y, 0, ',')}"
          }
        }
      },

      series: []

    })


  teardown: () ->
    #Return the results box to original position
    document.getElementById("viewmessage").style.display = "none"
    document.getElementById("viewmessage").style.margin = "30px auto"
    document.getElementById("results").style.width = "100%"
    document.getElementById("results").style.marginRight = "0"
    document.getElementById("results").style.overflow = "hidden"
    $('#results').empty()
    @land_chart = null




  updateResults: (@pathway) ->
    @setup() unless @land_chart?


    titles_land_do_nothing = ['Renewables',
				'Conventional',
				'Bio Energy',
                              
                              
    ]

    scenarios = ["Least Effort Scenario","Your Pathway" ]

    i = 0
    #Store values for the textbox, also convert to 1000km2
    dnsum = 0.0
    ypsum = 0.0

    lfs = []
    yourpath = []

    for name in titles_land_do_nothing
      data = @pathway['land_do_nothing'][name]
      dnsum += data[0]
      ypsum += data[1]

      lfs.push parseFloat (data[0]).toFixed(2)
      yourpath.push parseFloat (data[1]).toFixed(2)

    if @land_chart.series[0]?
      @land_chart.series[0].setData(lfs)
      @land_chart.series[1].setData(yourpath)
    else
      @land_chart.addSeries
        name: scenarios[0]
        data: lfs
      , false

      @land_chart.addSeries
        name: scenarios[1]
        data: yourpath
      , false


#      if @land_chart.series[i]?
#
#        @land_chart.series[i].setData jQuery.map(data, (val, i) ->
#          parseFloat (val).toFixed(2)
#          #parseFloat (val / 100000.0).toFixed(2)
#        ), false
#      else
#        #@land_chart.addSeries({name:name,data:data},false)
#        @land_chart.addSeries
#          name: name
#          data: jQuery.map(data, (val, i) ->
#            parseFloat (val).toFixed(2)
#          )
#        ,false
#      i++


    @land_chart.redraw()

    document.getElementById("viewmessage").style.display = "inline-block"

    #Text for viewmessage textbox
    document.getElementById("viewmessage").innerHTML="
          <h3> How much land is that? </h3>
          <p>
            <ul>
                <li> Your chosen energy scenario has a land-area footprint of <b> "+ ypsum.toFixed() + " </b>hectares, or " + (ypsum*0.01*0.001).toFixed(2) + " thousand square km.  </li>

                <li> This is <b>" + (ypsum/148400).toFixed(2) + " </b>times the size of Delhi</li>
                <li> This is <b>" + ((ypsum/328759000).toFixed(2)*100) + " </b>% of India's land area </li>

            </ul>
          </p>
          "



window.twentyfifty.views['map'] = new LandUse
