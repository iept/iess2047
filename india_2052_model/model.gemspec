begin
  # If the model has already been compiled, we can check it for its version number
  require_relative 'lib/model'

  version = ModelStructure.instance.reported_calculator_version[/\d+\.\d+\.\d+/]
rescue LoadError => e
  # Otherwise we need to take it from the changes file
  version = IO.readlines(File.join(File.dirname(__FILE__),"CHANGES")).join[/#\s*(\d+\.\d+\.\d+)\b/,1]
end

if `git status --porcelain | wc -l`.to_i > 0
  version = version + "pre"
end

Gem::Specification.new do |s|
  s.name = "india_2052_model"
  s.required_ruby_version = ">1.9.1"
  s.version = version
  s.add_dependency('ffi','>= 1.0.11')
  s.add_development_dependency('excel_to_code')
  s.author = "Planning Commission India"
  s.email = "tom@counsell.org"
  s.homepage = "http://github.com/decc/india_2052_model"
  s.platform = Gem::Platform::RUBY
  s.summary = "TBD"
  s.description = File.read(File.join(File.dirname(__FILE__), 'README.markdown'))
  s.license = "MIT"
  s.files = ["LICENSE", "README.markdown", "{lib}/**/*.rb",'ext/**/*.{c,h,rb}','test/**/*'].map{|p| Dir[p]}.flatten
  s.extensions = ['ext/Rakefile']
  s.has_rdoc = false
end
