class PrimaryEnergy

  constructor: () ->

  setup: () ->
    target = $('#results')
    target.append("<div id='demand_chart' class='chart'></div>")
    target.append("<div id='supply_chart' class='chart'></div>")
    target.append("<div id='dependency_chart' class='chart'></div>")
    #The following lines position the viewmessage box, chart and results
    document.getElementById("demand_chart").style.width = "24%"
    document.getElementById("supply_chart").style.width = "24%"
    document.getElementById("dependency_chart").style.width = "24%"
    document.getElementById("results").style.overflow = "inherit"
    document.getElementById("viewmessage").style.width = "15%"
    document.getElementById("viewmessage").style.margin = "1% 0% 1% 1%"

    @final_energy_chart = new Highcharts.Chart({
      chart: { renderTo: 'demand_chart' },
      title: { text: 'Energy Demand' },
      subtitle: { text: "TWh/yr of final energy"},
      yAxis: { title: null, min: 0, max: 40000 },
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
          if @name.toLowerCase() == "energy demand in least effort scenario"
            return "Least effort"
          words = @name.split(/[\s]+/).splice(0, 6)
          numWordsPerLine = 4
          str = []
          for word of words
            str.push "<br>"  if word > 0 and word % numWordsPerLine is 0
            str.push words[word]
          str.join " "
      }
    })
    @primary_energy_chart = new Highcharts.Chart({
      chart: { renderTo: 'supply_chart' },
      title: { text: 'Energy Supply' },
      subtitle: { text: "TWh/yr of primary energy"},
      yAxis: { title: null, min: 0, max: 40000 },
      series: []
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
          if @name.toLowerCase() == "energy supply in least effort scenario"
            return "Least effort"
          words = @name.split(/[\s]+/).splice(0, 6)
          numWordsPerLine = 4
          str = []
          for word of words
            str.push "<br>"  if word > 0 and word % numWordsPerLine is 0
            str.push words[word]
          str.join " "
      }
    })

    @dependency_chart = new Highcharts.Chart({
      chart: {
        renderTo: 'dependency_chart',
        type: 'line',
        #events:
        #  load: () ->
        #    @renderer.text("80% reduction on 1990" ,60,170).css({color: '#fff',fill: '#fff', 'font-size': '0.75em'}).attr({zIndex:10}).add()

      },
      title: { text: 'Import Dependence' },
      subtitle: { text: "Percentage of fossil fuels imported"},
      yAxis: { title: null, min: 0, max: 100 },
      xAxis: {

        labels: formatter: ->

          switch @value
            when 2012
              return 2012

            when 2027
              return 2027
            when 2037
              return 2037
            when 2047
              return 2047


        value: (148400),
        dashStyle: 'longdashdot'
      },
      legend: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.1)',
        floating: true,
        align: 'right',
        verticalAlign: 'bottom',
        itemStyle: {
          font: '8pt sans-serif',
        },
        itemDistance: '5pt',
        layout: 'vertical',
        left: 20,
        labelFormatter: ->
          words = @name.split(/[\s]+/).splice(0, 2)
          numWordsPerLine = 4
          str = []
          for word of words
            str.push "<br>"  if word > 0 and word % numWordsPerLine is 0
            str.push words[word]
          str.join " "
      },
      tooltip: {
        formatter: () ->
          "<b>#{this.series.name}</b><br/>#{this.x}: #{Highcharts.numberFormat(this.y, 0, ',')} % Imported"
      },
      series: []

    })

  teardown: () ->
    document.getElementById("viewmessage").style.display = "none"
    $('#results').empty()
    @final_energy_chart = null
    @primary_energy_chart = null
    @dependency_chart = null

  updateResults: (@pathway) ->
    @setup() unless @dependency_chart? && @final_energy_chart? && @primary_energy_chart?

    titles_dependency = ['Coal Imports',
                         'Oil Imports',
                        'Gas Imports',
                        'Overall Import Dependence',
    ]

    i = 0
    for name in titles_dependency
      data = @pathway['dependency'][name]

      # data contains 0.1 for 10%, so multiply by 100 for charting
      data = ((d*100) for d in data)

      if @dependency_chart.series[i]?
        @dependency_chart.series[i].setData(data,false)
      else
        @dependency_chart.addSeries({name:name,data:data},false)
      i++

    # The fourth in the series is the total, so we want to make it blacker, thicker and more dotted
    # than the other lines
    @dependency_chart.series[3].color = "#000000"
    @dependency_chart.series[3].options.lineWidth = 3
    @dependency_chart.series[3].options.dashStyle = "longdashdot"

    titles = ["Telecom","Transport","Industry","Cooking","Lighting & Appliances","Agriculture",
    ]
    i = 0
    for name in titles
      data = @pathway['final_energy_demand'][name]
      if @final_energy_chart.series[i]?
        @final_energy_chart.series[i].setData(data,false)
      else
        @final_energy_chart.addSeries({name:name,data:data},false)
      i++

    # Set this in the context of the do nothing total
    data = @pathway['demand_do_nothing']["Do-nothing Scenario"]
    if @final_energy_chart.series[i]?
      @final_energy_chart.series[i].setData(data,false)
    else
      @final_energy_chart.addSeries({type: 'line', name: 'Energy demand in least effort scenario',data:data, lineColor: '#FF0000', color: '#FF0000',lineWidth:2,dashStyle:'Dot', shadow: false},false)
    i++

    data = @pathway['final_energy_demand']["Scenario Demand"]
    if @final_energy_chart.series[i]?
      @final_energy_chart.series[i].setData(data,false)
    else
      @final_energy_chart.addSeries({type: 'line', name: 'Total demand in your chosen scenario',data:data, lineColor: '#000', color: '#000',lineWidth:2, shadow: false},false)
    i++

    #titles = ["Renewables and Clean Energy", "Electricity oversupply (imports)", "Environmental heat", "Bio Energy", "Coal", "Oil", #"Natural gas"]
    titles =["Bio Energy","Renewables and Clean Energy","Electricity oversupply (imports)","Coal","Oil","Natural gas",]
    i = 0
    for name in titles
      data = @pathway['primary_energy_supply'][name]
      if @primary_energy_chart.series[i]?
        @primary_energy_chart.series[i].setData(data,false)
      else
        @primary_energy_chart.addSeries({name:name,data:data},false)
      i++
    
    # Set this in the context of the do nothing total
    data = @pathway['supply_do_nothing']["Do-nothing Scenario"]
    if @primary_energy_chart.series[i]?
      @primary_energy_chart.series[i].setData(data,false)
    else
      @primary_energy_chart.addSeries({type: 'line', name: 'Energy supply in least effort scenario',data:data, lineColor: '#FF0000', color: '#FF0000',lineWidth:2,dashStyle:'Dot', shadow: false},false)
    i++

    data = @pathway['primary_energy_supply']["Total Primary Supply"]
    if @primary_energy_chart.series[i]?
      @primary_energy_chart.series[i].setData(data,false)
    else
      @primary_energy_chart.addSeries({type: 'line', name: 'Total supply in your chosen scenario',data:data, lineColor: '#000', color: '#000',lineWidth:2, shadow: false},false)
    i++
    @dependency_chart.redraw()
    @final_energy_chart.redraw()
    @primary_energy_chart.redraw()
    document.getElementById("viewmessage").style.display = "inline-block"

    #Text for viewmessage textbox
    document.getElementById("viewmessage").innerHTML="
                 <h3> Is this scenario over-generating electricity ?  </h3>
                  <p>
                     Your chosen energy scenario creates a maximum of <b> "+ Math.round(Math.abs(Math.min(@pathway['electricity']['electricity_exports']["Electricity exports"][0],@pathway['electricity']['electricity_exports']["Electricity exports"][1], @pathway['electricity']['electricity_exports']["Electricity exports"][2], @pathway['electricity']['electricity_exports']["Electricity exports"][3], @pathway['electricity']['electricity_exports']["Electricity exports"][4], @pathway['electricity']['electricity_exports']["Electricity exports"][5], @pathway['electricity']['electricity_exports']["Electricity exports"][6], @pathway['electricity']['electricity_exports']["Electricity exports"][7])))  + " </b>
                     TWh/year of excess electricity, potentially available for exports. <br>
                    <br> If your energy choices lead to exports, you may want to bring down conventional and/or renewable energy supplies a notch, or ramp up energy demand.



                  </p>
                  "

window.twentyfifty.views['primary_energy_chart'] = new PrimaryEnergy
