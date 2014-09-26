class Emissions

  titles_emissions = ['Generation',
                      'Lighting & Appliances',
                      'Industry',
                      'Transport'
                      'Cooking',
                      'Agriculture',
                      'Telecom',
                      'Bio Energy',

  ]

  titles_percapita = [
      "Hydrocarbon fuel power generation",
      "Buildings",
      "Lighting and appliances",
      "Industry",
      "Transport",
      "Cooking",
      "Agriculture",
      "Telecom",
      "Bioenergy",
  ]

  titles = titles_percapita

  constructor: () ->

  setup: () ->
    target = $('#results')
    target.append("<div id='total_emissions_chart' class='chart'></div>")
    target.append("<div id='total_percapita_emissions_chart' class='chart'></div>")
    target.append("<div id='emissions_chart_gdp' class='chart'></div>")
    #target.append("<div id='emissions_chart' class='chart'></div>")

#    @emissions_chart = new Highcharts.Chart({
#      chart: {
#        renderTo: 'emissions_chart',
#        type: 'bar',
#
#        margin: [45, 10, 25, 113],
#      },
#      title: { text: 'CO2 Emissions in 2047' },
#      subtitle: { text: "In multiples of 2012 emission values"},
#      yAxis: { title: null, min: -5, max: 15 },
#      xAxis: {
#
#        labels: formatter: ->
#          @value
#        opposite: false,
#
#        categories: titles_emissions
#      },
#
#      legend: {
#        enabled: true,
#        backgroundColor: 'rgba(0,0,0,0.1)',
#        floating: true,
#        align: 'right',
#        verticalAlign: 'bottom',
#        itemStyle: {
#          font: '8pt sans-serif',
#        },
#        itemDistance: '5pt',
#        layout: 'vertical',
#        left: 20,
#        labelFormatter: ->
#
#          words = @name.split(/[\s]+/).splice(0, 2)
#          numWordsPerLine = 4
#          str = []
#          for word of words
#            str.push "<br>"  if word > 0 and word % numWordsPerLine is 0
#            str.push words[word]
#          str.join " "
#      },
#
#
#      tooltip: {
#        formatter: () ->
#          "<b>#{this.series.name}</b><br/>#{this.x}: #{Highcharts.numberFormat(this.y, 0, ',')} time(s) Base"
#      },
#      series: []
#
#    })




    @total_emissions_chart = new Highcharts.Chart({
      chart: { renderTo: 'total_emissions_chart' },
      title: { text: 'CO2 Emissions' },
      subtitle: { text: "Mil tons CO2 per year"},
      yAxis: { title: null, min: -1000, max: 15000 },
      series: [],
      legend: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.1)',
        floating: true,
        align: 'center',
        verticalAlign: 'middle',
        itemStyle: {
          font: '8pt sans-serif',
        },
        itemDistance: '5pt',
        layout: 'vertical',
        left: 20,
        labelFormatter: ->

          words = @name.split(/[\s]+/).splice(0, 6)
          numWordsPerLine = 4
          str = []
          for word of words
            str.push "<br>"  if word > 0 and word % numWordsPerLine is 0
            str.push words[word]
          str.join " "
      },

      tooltip: {
        formatter: () ->
          "<b>#{this.series.name}</b><br/>#{this.x}: #{Highcharts.numberFormat(this.y, 0, '.')} MtCO2e "
      }
    })

    @total_percapita_emissions_chart = new Highcharts.Chart({
      chart: { renderTo: 'total_percapita_emissions_chart' },
      title: { text: 'Per Capita CO2 Emissions' },
      subtitle: { text: "Tons of CO2/person per year"},
      yAxis:
        title: null,
        min: -2.5,
        max: 18,
#        plotLines: [
#          value: 6.194
#          color: "#ff0000"
#          width: 2
#          zIndex: 4
#          label:
#            text: "China, 2010"
#        ,
#          value: 7.925
#          color: "Blue"
#          width: 2
#          zIndex: 4
#          label:
#            text: "UK, 2010"
#        ,
#          value: 17.564
#          color: "Green"
#          width: 2
#          zIndex: 4
#          label:
#            text: "US, 2010"
#        ]
      ,
      series: [],
      legend: { enabled: false },
      tooltip: {
        formatter: () ->
          "<b>#{this.series.name}</b><br/>#{this.x}: #{Highcharts.numberFormat(this.y, 1, '.')} tCO2/capita "
      }
    })

    @emissions_chart_gdp = new Highcharts.Chart({
      chart: { renderTo: 'emissions_chart_gdp' },
      title: { text: 'Emission Intensity' },
      subtitle: { text: "TCO2/GDP (in Billion USD) per year"},
      yAxis:
        title: null,
        min: -5,
        max: 5,

      series: [],
      legend: { enabled: false },
      tooltip: {
        formatter: () ->
          "<b>#{this.series.name}</b><br/>#{this.x}: #{Highcharts.numberFormat(this.y, 2, '.')} tCO2/Billion USD "
      }
    })

  teardown: () ->
    $('#results').empty()
    @emissions_chart = null
    #@total_emissions_chart = null
    @emissions_chart_gdp = null
    @total_percapita_emissions_chart = null

  updateResults: (@pathway) ->
    #@setup() unless @emissions_chart? && @total_emissions_chart? && @total_percapita_emissions_chart?
    @setup() unless @emissions_chart_gdp? && @total_emissions_chart? && @total_percapita_emissions_chart?
    #@emissions_chart.xAxis.categories = titles

    your_pathway = []
    do_nothing = []
    for title in titles_emissions
      if(@pathway['emissions_do_nothing'][title][0]<0)
        your_pathway.push(-(@pathway['emissions_do_nothing'][title][2]/@pathway['emissions_do_nothing'][title][0]))
        do_nothing.push(-(@pathway['emissions_do_nothing'][title][1]/@pathway['emissions_do_nothing'][title][0]))
      else
        your_pathway.push((@pathway['emissions_do_nothing'][title][2]/@pathway['emissions_do_nothing'][title][0]))
        do_nothing.push((@pathway['emissions_do_nothing'][title][1]/@pathway['emissions_do_nothing'][title][0]))
    #@emissions_chart.addSeries({name: "Base year emissions", data: series_base}, false)
    #@emissions_chart.addSeries({name: "Your Pathway", data: your_pathway}, false)
    #@emissions_chart.addSeries({name: "Do-nothing scenario", data: do_nothing}, false)

#    if @emissions_chart.series[0]?
#      @emissions_chart.series[0].setData(do_nothing, false)
#    else
#      @emissions_chart.addSeries({name: "Do-nothing scenario, 2047", data: do_nothing}, false)
#
#    if @emissions_chart.series[1]?
#      @emissions_chart.series[1].setData(your_pathway, false)
#    else
#      @emissions_chart.addSeries({name: "Your Pathway, 2047", data: your_pathway}, false)


    i = 0
    for name in titles
      data = @pathway['emissions_absolute'][name]
      if @total_emissions_chart.series[i]?
        @total_emissions_chart.series[i].setData(data,false)
      else
        @total_emissions_chart.addSeries({name:name,data:data},false)
      i++

    data = @pathway['emissions_absolute']['Total']
    if @total_emissions_chart.series[i]?
      @total_emissions_chart.series[i].setData(data,false)
    else
      @total_emissions_chart.addSeries({type: 'line', name: 'Total emissions in chosen scenario',data:data, lineColor: '#000', color: '#000',lineWidth:2,dashStyle:'Dot', shadow: false},false)


    i = 0
    for name in titles_percapita
      data = @pathway['emissions_percapita'][name]
      if @total_percapita_emissions_chart.series[i]?
        @total_percapita_emissions_chart.series[i].setData(data,false)
      else
        @total_percapita_emissions_chart.addSeries({name:name,data:data},false)
      i++

    data = @pathway['emissions_percapita']['Total']
    if @total_percapita_emissions_chart.series[i]?
      @total_percapita_emissions_chart.series[i].setData(data,false)
    else
      @total_percapita_emissions_chart.addSeries({type: 'line', name: 'Percapita emissions in chosen scenario',data:data, lineColor: '#000', color: '#000',lineWidth:2,dashStyle:'Dot', shadow: false},false)
      @total_percapita_emissions_chart.addSeries({type: 'scatter', name: "China 2010 emissions", data: [6.194], color: '#ff0000'})
      @total_percapita_emissions_chart.addSeries({type: 'scatter', name: "US 2010 emissions", data: [17.564], color: 'Green'})
      @total_percapita_emissions_chart.addSeries({type: 'scatter', name: "UK 2010 emissions", data: [7.925], color: 'Blue'})


    GDP = [4170367,6416627,9872775,14506346,20345901,28536178,38187844,51103949]
    GDP_USD = [695, 1069, 1645, 2418, 3391, 4756, 6365, 8517]

    for name in titles
      dat = @pathway['emissions_absolute'][name]
      data = []
      j = 0
      while j < GDP_USD.length
        data.push dat[j]/GDP_USD[j]
        j++

      if @emissions_chart_gdp.series[i]?
        @emissions_chart_gdp.series[i].setData(data,false)
      else
        @emissions_chart_gdp.addSeries({name:name,data:data},false)
      i++

    dat = @pathway['emissions_absolute']['Total']
    data = []
    j = 0
    while j < GDP_USD.length
      data.push dat[j]/GDP_USD[j]
      j++
    if @emissions_chart_gdp.series[i]?
      @emissions_chart_gdp.series[i].setData(data,false)
    else
      @emissions_chart_gdp.addSeries({type: 'line', name: 'Emissions intensity in chosen scenario', data:data, lineColor: '#000', color: '#000',lineWidth:2,dashStyle:'Dot', shadow: false},false)
      #@emissions_chart_gdp.addSeries({type: 'scatter', name: "China 2010 emissions/GDP, World Bank", data: [8286892*1000/51468754.0533], color: '#ff0000'})
      #@emissions_chart_gdp.addSeries({type: 'scatter', name: "US 2010 emissions/GDP, World Bank", data: [5433057*1000/101626217], color: 'Green'})
      #@emissions_chart_gdp.addSeries({type: 'scatter', name: "UK 2010 emissions/GDP, World Bank", data: [493505*1000/15463478.0158], color: 'Blue'})


    #@emissions_chart.redraw()
    @emissions_chart_gdp.redraw()
    @total_emissions_chart.redraw()
    @total_percapita_emissions_chart.redraw()



window.twentyfifty.views['emissions'] = new Emissions
