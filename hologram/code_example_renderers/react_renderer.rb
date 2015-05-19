require "uuidtools"

Hologram::CodeExampleRenderer::Factory.define('react') do
  example_template 'react_example_template'

  lexer { Rouge::Lexer.find(:html) }

  rendered_example do |code|
    uuid = UUIDTools::UUID.random_create
    "
    <div id='#{uuid}'></div>
    <script type='text/jsx'>
      var node = document.getElementById('#{uuid}');
      #{code.split('---').first}
      React.render(
        #{code.split('---').last}
        , node);
    </script>"
  end
end
