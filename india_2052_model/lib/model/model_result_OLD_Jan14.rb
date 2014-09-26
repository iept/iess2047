require_relative '../model'

class ModelResult < ModelUtilities  
  attr_accessor :excel, :pathway
  
  def initialize
    @excel = ModelShim.new
  end
  
  def self.calculate_pathway(code)
    new.calculate_pathway(code)
  end
  
  def calculate_pathway(code)
    Thread.exclusive do 
      reset
      @pathway = { _id: code, choices: set_choices(code) }
      sankey_table
      primary_energy_tables #DONE
      electricity_tables #DONE
      #heating_choice_table - #Removed
      #cost_components_table  #Removed
      map_table #
      energy_imports #DONE
      #energy_diversity Non priority
      air_quality #YES        6
      dependency
      emissions_do_nothing
    end
    return pathway
  end
      
  def sankey_table
    s = [] 
    #(6..94).each do |row| 
    (6..68).each do |row|
      s << [r("flows_c#{row}"),r("flows_m#{row}"),r("flows_d#{row}")] #changed n to m (2052 to 2047)
    end
    pathway[:sankey] = s
  end
  
  def primary_energy_tables
    pathway[:ghg] = table 198, 210 #194, 206 #182, 192
    pathway[:final_energy_demand] = table 7, 22 #7, 18 #13, 18
    pathway[:primary_energy_supply] = table 248, 264 #308, 321 #283, 296 India - > N.01 to Total Primary supply
    #pathway[:ghg][:percent_reduction_from_1990] = (r("intermediate_output_bh155") * 100).round  #not done for India version
  end
  
  def electricity_tables
    e = {}
    e[:demand] = table 287, 293 #347, 353 #322, 326
    e[:supply] = table 111, 129 #107, 125 #96, 111  Note : We need to add in Row 126 -> Share of Renewables and incorporate that somewhere
    e[:emissions] = table 200, 210 #295, 298 #270, 273  -> Emissions reclassified
    e[:capacity] = table 135, 150 #131, 146 #118, 132 -> GW installed capacity

    #e['automatically_built'] = r("intermediate_output_bh120") Not used
    #e['peaking'] = r("intermediate_output_bh145") #Not used
    pathway['electricity'] = e
  end

  # NOT REQUIRED -----------------------------------------------------------------
  def heating_choice_table
    h = {'residential' => {}, 'commercial' => {}}

    (332..344).each do |row|
      h['residential'][r("intermediate_output_d#{row}")] = r("intermediate_output_e#{row}")
      h['commercial'][r("intermediate_output_d#{row}")] = r("intermediate_output_f#{row}")
    end

    pathway[:heating] = h
  end
  # -----------------------------------------------------------------
  
  def cost_components_table
    t = {}
    low_start_row = 3
    point_start_row = 57
    high_start_row = 112
    number_of_components = 45
    #Last three rows not required. 
    #Already synchronized/mapped
    
    # Normal cost components
    (0..number_of_components).to_a.each do |i|
            
      name          = r("costpercapita_b#{low_start_row+i}")
      
      low           = r("costpercapita_as#{low_start_row+i}")
      point         = r("costpercapita_as#{point_start_row+i}")
      high          = r("costpercapita_as#{high_start_row+i}")
      range         = high - low
      
      finance_low   = 0 # r("costpercapita_cp{low_start_row+i}") # Bodge for the zero interest rate at low
      finance_point = r("costpercapita_cp#{point_start_row+i}")
      finance_high  = r("costpercapita_cp#{high_start_row+i}")
      finance_range = finance_high - finance_low
      
      costs = {low:low,point:point,high:high,range:range,finance_low:finance_low,finance_point:finance_point,finance_high:finance_high,finance_range:finance_range}
      if t.has_key?(name)
        t[name] = sum(t[name],costs)
      else
        t[name] = costs
      end
    end
    
    # Merge some of the points
    t['Coal'] = sum(t['Indigenous fossil-fuel production - Coal'],t['Balancing imports - Coal'])
    t.delete 'Indigenous fossil-fuel production - Coal'
    t.delete 'Balancing imports - Coal'
    t['Oil'] = sum(t['Indigenous fossil-fuel production - Oil'],t['Balancing imports - Oil'])
    t.delete 'Indigenous fossil-fuel production - Oil'
    t.delete 'Balancing imports - Oil'
    t['Gas'] = sum(t['Indigenous fossil-fuel production - Gas'],t['Balancing imports - Gas'])
    t.delete 'Indigenous fossil-fuel production - Gas'
    t.delete 'Balancing imports - Gas'
    
    # Finance cost
    name          = "Finance cost"
    
    low           = 0 # r("costpercapita_cp#{low_start_row+number_of_components+1}") # Bodge for the zero interest rate at low
    point         = r("costpercapita_cp#{point_start_row+number_of_components+1}")
    high          = r("costpercapita_cp#{high_start_row+number_of_components+1}")
    range         = high - low
    
    finance_low   = 0 # r("costpercapita_cp{low_start_row+i}") # Bodge for the zero interest rate at low
    finance_point = 0
    finance_high  = 0
    finance_range = finance_high - finance_low
    
    t[name] = {low:low,point:point,high:high,range:range,finance_low:finance_low,finance_point:finance_point,finance_high:finance_high,finance_range:finance_range}
  
    pathway['cost_components'] = t
  end
  
  def map_table
    m = {}
    #m['wave'] = r("land_use_q28") NOT USED
    #[6..12,16..19,23..24,32..37].each do |range|
    #[6..20,26..27].each do |range|
    #[37..41].each do |range|
    [37..41].each do |row|
      m[r("land_use_d#{row}")] = [r("land_use_j#{row}"), r("land_use_k#{row}"), r("land_use_l#{row}")]
    end
    pathway['map'] = m
  end
  
  def energy_imports
    i = {}
    [
      #["Coal",37,39],
      ["Coal",41,43],

      #["Oil",41,43],
      #["Oil",41,42],
      ["Oil",45,46],

      #["Gas",44,46],
      #["Gas",43,45],
      ["Gas",47,49],

      #["Bioenergy",35,36], -> not part of India version
      #["Uranium",23,23],-> not part of India version

      #["Electricity",110,111],
      #["Electricity",123,125],
      ["Electricity",127,129],

      #["Primary energy",297,296]
      #["Primary energy",322,321]
      ["Primary energy",262,261]
    ].each do |vector|
      imported = r("intermediate_output_bg#{vector[1]}").to_s.to_f
      imported = imported > 0 ? imported.round : 0
      total = r("intermediate_output_bg#{vector[2]}").to_s.to_f
      proportion = total > 0 ? "#{((imported/total) * 100).round}%" : "0%"
      #i[vector[0]] = { '2050' => {quantity: imported, proportion: proportion} }
      i[vector[0]] = { '2047' => {quantity: imported, proportion: proportion} }
      imported = r("intermediate_output_f#{vector[1]}").to_s.to_f
      imported = imported > 0 ? imported.round : 0
      total = r("intermediate_output_f#{vector[2]}").to_s.to_f
      proportion = total > 0 ? "#{((imported/total) * 100).round}%" : "0%"
      i[vector[0]]['2007'] = { quantity: imported, proportion: proportion }
    end
    pathway['imports'] = i
  end


  def energy_diversity
    d = {}
    #total_2007 = r("intermediate_output_f296").to_f
    total_2007 = r("intermediate_output_ay321").to_f
    #total_2050 = r("intermediate_output_bh296").to_f
    total_2047 = r("intermediate_output_bg321").to_f
    #(283..295).each do |row|
    #(308..320).each do |row|
    (248..260).each do |row|
      d[r("intermediate_output_d#{row}")] = { 
        '2007' => "#{((r("intermediate_output_ay#{row}").to_f / total_2007)*100).round}%",
        '2047' => "#{((r("intermediate_output_bg#{row}").to_f / total_2047)*100).round}%"
      }
    end
    pathway['diversity'] = d
  end

  def air_quality
    pathway['air_quality'] = {}
    pathway['air_quality']['low'] = r("aq_outputs_f6")
    pathway['air_quality']['high'] = r("aq_outputs_f5")
  end

  def dependency
    dep = {}
    (72..75).each do |row|
      dep[label("charts", row)] = annual_data("charts", row)
    end
    pathway['dependency'] = dep
  end

  def emissions_do_nothing
    t = {}
    (164..171).each do |row|
      t[label("charts", row)] = [r("charts_ay#{row}"),r("charts_az#{row}"),r("charts_ba#{row}")]
    end
    pathway['emissions_do_nothing'] = t
  end
  
  # Helper methods
  
  def table(start_row,end_row)
    t = {}
    (start_row..end_row).each do |row|
      t[label("intermediate_output", row)] = annual_data("intermediate_output",row)
    end
    t
  end
  
  def label(sheet,row)
    r("#{sheet}_d#{row}").to_s
  end
  
  def annual_data(sheet,row)
    ['ay','az','ba','bb','bc','bd','be','bf','bg' #,' bh'
    ].map { |c| r("#{sheet}_#{c}#{row}") }
  end
  
  def sum(hash_a,hash_b)
    return nil unless hash_a && hash_b
    summed_hash = {}
    hash_a.each do |key,value|
      summed_hash[key] = value + hash_b[key]
    end
    return summed_hash
  end
  
end

if __FILE__ == $0
  g = ModelResult.new

  tests = 100
  t = Time.now
  a = []
  tests.times do
    a << g.calculate_pathway(ModelResult::CONTROL.map { rand(4)+1 }.join)
  end
  te = Time.now - t
  puts "#{te/tests} seconds per run"
  puts "#{tests/te} runs per second"
end
