class ModelChoice
  
  attr_accessor :number, :name, :type, :descriptions, :long_descriptions
  
  def initialize(number,name,type,descriptions,long_descriptions)
    @number, @name, @type, @descriptions, @long_descriptions = number, name, type, descriptions, long_descriptions
  end
  
  def incremental_or_alternative
    'incremental'
  end
  
  def levels
    1.upto(type.to_i)
  end

  NUMBER_TO_DOC_MAP = {
    0 => 'GAS BASED GENERATION_JANFINALpdf',
    2 => 'Domestic coal productionpdf',
    3 => 'coal_power_stationspdf',
    4 => 4,#Not used
    5 => 'CCS-updated JANFINALpdf',
    6 => 6,
    7 => 'NUCLEAR POWER-updatedpdf2',
    8 => 'LARGE HYDROELECTRIC POWER-updatedpdf',
    9 => 'SOLAR PHOTOVOLTAIC POWER-JANfinal1pdf',
    10 => 'CONCENTRATED SOLAR POWER-JANfinalpdf',
    11 => 'WIND ONSHORE-JANFINALpdf',
    12 => 'OFFSHORE WIND POWER-JANfinal1pdf',
    13 => 'SMALL HYDROELECTRIC POWER-updatedJANFINALpdf',
    14 => 'one pager-Electricity Imports JANFINALpdf',
    #15 => 13,#Not used
    16 => 'Bioenergy 1 pager  - Biomass Residue Production and End-Usage JANFINAL2',
    17 => 'Bioenergy 1 pager  - Biomass Residue Production and End-Usage JANFINAL2',
    18 => 'Bioenergy 1 pager - First and Second Generation BiofuelsJANFINALpdf2',
    19 => 'Bioenergy 1 pager - Advanced BiofuelsJANFINALpdf',
    20 => 'WASTE TO ENERGY-JANfinalpdf',
    21 => 19,#Not used
    22 => 'DOMESTIC GAS PRODUCTION_JANFINALPDF',
    23 => 'Efficiency of coal power stationspdf',
    24 => 'CRUDE OIL PRODUCTION IN INDIA-janfinalpdf',
    26 => 24,#Not used
    27 => 'Domestic Passenger Transport Demandpdf',
    28 => 'Domestic Passenger Transport Modepdf',
    29 => 'Domestic Passenger Transport Modepdf', #No pdf
    30 => 'Domestic Passenger Transport Modepdf', #No pdf
    32 => 'Domestic Freight Transport Demandpdf',
    33 => 'Domestic Freight Transport Modepdf',
    34 => 'Energy Demand for Cookingpdf',
    36 => 'Efficiency of Residential LandApdf',
    37 => 'Building envelope optimizationpdf',
    38 => 'INDUSTRYpdf',
    39 => 'Energy Demand for Cookingpdf',
    41 => 'Commercial Lighting and Appliancespdf',
    42 => 'Building envelope optimizationpdf',
    44 => 'Energy Demand from Irrigation and mech pdf',
    45 => "Choice of fuel for irrigationpdf",
    46 => 'Replacement of diesel in telecompdf',
    48 => 'T&d LOSSES-JANFINALpdf',
    #50 => 47,
    #51 => 48
  }

  def doc
    #"#{NUMBER_TO_DOC_MAP[number] || number}.html"
    "#{NUMBER_TO_DOC_MAP[number] || number}.pdf"
  end
end
