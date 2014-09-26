class Electricity

  setup: () ->
    target = $('#results')
    target.append("<div id='demand_chart' class='chart'></div>")
      .append("<div id='supply_chart' class='chart'></div>")
      .append("<div id='electricity_exports' class='chart'></div>")

    #The following lines position the viewmessage box, chart and results
    document.getElementById("demand_chart").style.width = "24%"
    document.getElementById("supply_chart").style.width = "24%"
    document.getElementById("electricity_exports").style.width = "24%"
    document.getElementById("results").style.overflow = "inherit"
    document.getElementById("viewmessage").style.width = "15%"
    document.getElementById("viewmessage").style.margin = "1% 0% 1% 1%"


    @demand_chart = new Highcharts.Chart({
      chart: { renderTo: 'demand_chart' },
      title: { text: 'Electricity demand' },
      subtitle: { text: "TWh/yr of electricity"},
      yAxis: { title: null, min: 0, max: 10000 },
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
          words = @name.split(/[\s]+/).splice(0, 4)
          numWordsPerLine = 4
          str = []
          for word of words
            str.push "<br>"  if word > 0 and word % numWordsPerLine is 0
            str.push words[word]
          str.join " "
      },

      series: []
    })

    @supply_chart = new Highcharts.Chart({
      chart: { renderTo: 'supply_chart' },
      title: { text: 'Electricity supply' },
      subtitle: { text: "TWh/yr of electricity"},
      yAxis: { title: null, min: 0, max: 10000 },
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
          words = @name.split(/[\s]+/).splice(0, 2)
          numWordsPerLine = 4
          str = []
          for word of words
            str.push "<br>"  if word > 0 and word % numWordsPerLine is 0
            str.push words[word]
          str.join " "
      },
      series: []
    })

    @electricity_exports = new Highcharts.Chart({
      chart: {
        renderTo: 'electricity_exports',
        type: 'line',
      #events:
      #  load: () ->
      #    @renderer.text("80% reduction on 1990" ,60,170).css({color: '#fff',fill: '#fff', 'font-size': '0.75em'}).attr({zIndex:10}).add()

      },
      title: { text: 'Over-generation / Exports' },
      subtitle: { text: "TWh/yr of electricity available for exports "},
      yAxis: { title: null, min: 0, max: 8000, reversed: false, },
      #xAxis: {
      #  labels: formatter: ->
       #   @value
        #value: (148400),
        #dashStyle: 'longdashdot'
      #},

      tooltip: {
        formatter: () ->
          "<b>#{this.series.name}</b><br/>#{this.x}: #{Highcharts.numberFormat(this.y, 0, ',')} TWh"
      },
      series: []

    })



  teardown: () ->
    document.getElementById("viewmessage").style.display = "none"
    #document.getElementById("viewmessage").style.margin = "30px auto"
    $('#results').empty()
    @demand_chart = null
    @supply_chart = null
    @electricity_exports = null


  updateResults: (@pathway) ->
    @setup() unless @demand_chart? && @supply_chart?  && @electricity_exports?


      
    # Demand for electricity
    titles = ['Transport','Industry','Cooking','Lighting & appliances','Telecom','Agriculture',]
    i = 0
    for name in titles
      data = @pathway['electricity']['demand'][name]
      if @demand_chart.series[i]?
        @demand_chart.series[i].setData(data,false)
      else
        @demand_chart.addSeries({name:name,data:data},false)
      i++

    data = @pathway['electricity']['demand']['Total']
    if @demand_chart.series[i]?
      @demand_chart.series[i].setData(data,false)
    else
      @demand_chart.addSeries({type: 'line', name: 'Electricity demand in chosen scenario',data:data, lineColor: '#000', color: '#000',lineWidth:2,dashStyle:'Dot', shadow: false},false)
    i++

    titles = ["Gas Power Stations","Coal power stations","Carbon Capture Storage (CCS)","Electricity Balancing Requirement","Nuclear power","Hydro Power Generation","Solar PV","Solar CSP","Onshore Wind","Offshore Wind","Small Hydro","Biomass Based Electricity& Biogas","Waste to Electricity","Electricity imports",]
    # ["Gas Power Stations","Coal power stations","Carbon Capture Storage (CCS)","Electricity Balancing Requirement","Nuclear power","Hydro Power Generation","Solar PV","Solar thermal","Onshore Wind","Offshore Wind","Small Hydro","Biomass Based Electricity& Biogas","Waste to Electricity","Electricity imports"]
    i = 0
    for name in titles
      data = @pathway['electricity']['supply'][name]
      if @supply_chart.series[i]?
        @supply_chart.series[i].setData(data,false)
      else
        @supply_chart.addSeries({name:name,data:data},false)
      i++

    data = @pathway['electricity']['supply']['Total generation supplied to grid']
    if @supply_chart.series[i]?
      @supply_chart.series[i].setData(data,false)
    else
      @supply_chart.addSeries({type: 'line', name: 'Electricity supply in chosen scenario',data:data, lineColor: '#000', color: '#000',lineWidth:2,dashStyle:'Dot', shadow: false},false)
    i++
    # Supply of electricity
    electricity_titles = ["Electricity exports"]
    #exports = []
    i = 0
    for name in electricity_titles
      data = (@pathway['electricity']['electricity_exports'][name])
      console.log(@pathway['electricity']['electricity_exports'][name])

      #Convert to positive
      data = data.map((x) ->
        Math.abs x
      )

      if @electricity_exports.series[i]?
        @electricity_exports.series[i].setData(data,false)
        #series.push(-@pathway['electricity']['electricity_exports'][name])
      else
        @electricity_exports.addSeries({name:name,data:data},false)
        #series.push(-@pathway['electricity']['electricity_exports'][name])
      i++



    @demand_chart.redraw()
    @supply_chart.redraw()
    @electricity_exports.redraw()
    #@emissions_chart.redraw()

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
    
window.twentyfifty.views['electricity'] = new Electricity
