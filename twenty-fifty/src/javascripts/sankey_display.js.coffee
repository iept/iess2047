class SankeyDisplay
 
  constructor: () ->

  # Below is the slider html. Needs no changes.
  html = """
         <div class="slider_wrap">
         <h3 id="year_head"> Flow of energy through India, year 2047 </h3>
         <div class="toggle_radio">
         <input type="radio" class="toggle_option" id="0_toggle" name="toggle_option">
         <input type="radio" class="toggle_option" id="1_toggle" name="toggle_option">
         <input type="radio" class="toggle_option" id="2_toggle" name="toggle_option">
         <input type="radio" class="toggle_option" id="3_toggle" name="toggle_option">
         <input type="radio" class="toggle_option" id="4_toggle" name="toggle_option">
         <input type="radio" class="toggle_option" id="5_toggle" name="toggle_option">
         <input type="radio" class="toggle_option" id="6_toggle" name="toggle_option">
         <input type="radio" class="toggle_option" checked id="7_toggle" name="toggle_option">

         <label for="0_toggle"><p>2012</p></label>
         <label for="1_toggle"><p>2017</p></label>
         <label for="2_toggle"><p>2022</p></label>
         <label for="3_toggle"><p>2027</p></label>
         <label for="4_toggle"><p>2032</p></label>
         <label for="5_toggle"><p>2037</p></label>
         <label for="6_toggle"><p>2042</p></label>
         <label for="7_toggle"><p>2047</p></label>

         <div class="toggle_option_slider">
         </div>
         </div>
         """
 
  updateResults: (pathway) ->
    @setup() unless @s?

    #curyear is the variable that holds the current year. Defaults to 2047 unless explicitly changed elsewhere.
    @curyear = 2047 unless @curyear?
    data = pathway.sankey[window.twentyfifty.views.sankey.curyear]
    #alert data

    if @drawn == true
      @s.updateData(data)
      @s.redraw()
    else
      @s.setData(data)
      @s.draw()
      @drawn = true
    max_y = @s.boxes['losses'].b()
    # console.log max_y
    @s.redraw()
    if $('#sankey').height() < max_y
      $('#sankey').height(max_y)
      @s.r.setSize($('#sankey').width(),max_y)
      #@s.redraw()

  teardown: () ->
    $('#results').empty()
    $('#slider-wrap').empty()
    @s = null

  setup: () ->
    return false if @s?
    #$('#results').append("<h3 class='sankeytitle'></h3>")
    $('#results').append(html)
    $('#results').append("<div id='sankey'></div>")

    window.snky = @s = new Sankey()

    @s.stack(0, [
      "Small hydro",
      "Electricity Imports",
      "Solar",
      "Wind",
      "Hydro",
      "Nuclear",
      "Coal Reserves",
      "Coal Imports",
      "Oil Reserves",
      "Oil Imports",
      "Gas Reserves",
      "Gas Imports",
      "Agriculture waste/ energy crops",
      "Municipal Waste",
      "Green Building Savings",
    ])

    @s.stack(1, [
      "Solar CSP",
      "Solar PV",
      "Offshore Wind",
      "Onshore Wind",
    ], "Solar")


    @s.stack(1, ["Coal"], "Coal Reserves")
    @s.stack(1, ["Oil"], "Oil Reserves")
    @s.stack(1, ["Natural Gas"], "Gas Reserves")

    @s.stack(1, ["Bio-Conversion"],  "Agriculture waste/ Energy crops")

    @s.stack(2, ["Solid"], "Coal")
    @s.stack(2, ["Liquid"], "Oil")
    @s.stack(2, ["Gas"], "Natural Gas")

    @s.stack(3, [
      "Thermal Generation",
    ], "Nuclear")

    @s.stack(4, [
      "Electricity Grid",
      "Off Grid Renewables"
    ])

#    @s.stack(5, [
#      "T&D losses"
#    ],"Electricity Grid")

    @s.stack(5, [
      "Commercial Cooking",
      "Commercial Lighting & Appliances",
      "Household Cooking",
      "Household Lighting & Appliances",
      "Passenger Transport",
      "Freight Transport",
      "Industry",
      "Agriculture",
      "Telecom",
      "Over Generation/Exports",
      "T&D losses",
      "Losses"
    ])
    
    # Nudge Losses to the bottom
    @s.nudge_boxes_callback = () ->
      this.boxes["losses"].y =  this.boxes["municipal waste"].b() - this.boxes["losses"].size()

    @s.setColors({
      "Coal Reserves":"#8F6F38",
      "Coal":"#8F6F38",
      "Coal Imports":"#8F6F38",

      "Oil Reserves":"#A99268",
      "Oil":"#A99268",
      "Oil Imports":"#A99268",

      "Gas Reserves":"#DDD4C4",
      "Natural Gas":"#DDD4C4",
      "Gas Imports":"#DDD4C4",

      "Solar":"#F6FF00",
      "Solar CSP":"#F6FF00",
      "Solar PV":"#F6FF00",

      "Agriculture waste/ energy crops":"#30FF00",
      "Bio-Conversion":"#30FF00",
      "Marine Algae":"#30FF00",
      "Agricultural 'Waste'":"#30FF00",
      "Municipal Waste":"#30FF00",
      "Biomass Imports":"#30FF00",
      "Biofuel Imports":"#30FF00",

      "Solid":"#557731",
      "Liquid":"#7D9763",
      "Gas":"#BCC2AD",

      "Electricity Grid":"#CCEEFF",
      "Thermal Generation":"#CCEEFF",
      "cHP":"#FF0000",
      "nuclear":"#E2ABDB",

      "district heating":"#FF0000",
      "pumped heat":"#FF0000",
      "useful district heat":"#FF0000",
      "cHP Heat":"#FF0000",

      "electricity imports":"#CCEEFF",
      "wind":"#C7E7E6",
      "onshore wind":"#C7E7E6",
      "offshore wind":"#C7E7E6",
      "tidal":"#C7E7E6",
      "wave":"#C7E7E6",
      "geothermal":"#C7E7E6",
      "Small Hydro":"#C7E7E6",

      "h2 conversion":"#FF6FCF",
      "final electricity":"#CCEEFF",
      "over generation / exports":"#CCEEFF",
      "h2":"#FF6FCF",
      "T&D losses":"#FF6FCF"
    })
    @s.nudge_colours_callback = () ->
      @recolour(@boxes["losses"].left_lines,"#ddd")
      @recolour(@boxes["t&d losses"].left_lines,"#ddd")
      @recolour(@boxes["electricity grid"].left_lines,"#CCEEFF")

    pixels_per_TWh = $('#sankey').height() / 100000

    @s.y_space = 25 #Math.round(1000 * pixels_per_TWh)
    @s.right_margin = 250
    @s.left_margin = 150
   
    @s.convert_flow_values_callback = (flow) ->
      return flow * pixels_per_TWh # Pixels per TWh

    @s.convert_flow_labels_callback = (flow) ->
      return Math.round(flow)
    
    @s.convert_box_value_labels_callback = (flow) ->
      return (""+Math.round(flow)+" TWh/y")

    # We inserted the html. Most of the following css is to make the slider work, and map 0-7 to 2012-2047
    # This also updates the text on the title
    $(".toggle_option_slider").css "left", 7 * 100
    $(".toggle_option").click ->
      myyear = $(this).attr("id").split("_")[0]
      $(".toggle_option_slider").css "left", myyear * 100
      myyear = myyear*5 + 2012
      $('#year_head').text "Flow of energy through India, year " + myyear
      window.twentyfifty.views.sankey.curyear = myyear
      # TRIED a synchronous call for the data, still no luck.
      $.ajax
        url: window.location.pathname.split("/").slice(0, 3).join("/") + "/data"
        dataType: "json"
        async: false
        success: (data) ->
          #alert data.sankey[window.twentyfifty.views.sankey.curyear]
          #alert window.twentyfifty.views.sankey.curyear
          window.snky.updateData(data.sankey[window.twentyfifty.views.sankey.curyear])
          window.snky.redraw()
          #window.sankeydata = data
          #alert(sankeydata.sankey[window.twentyfifty.views.sankey.curyear])
          #window.twentyfifty.views["sankey"].updateResults sankeydata
          return

    return
    

window.twentyfifty.views['sankey'] = new SankeyDisplay
