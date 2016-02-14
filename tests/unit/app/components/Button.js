import React from 'React/lib/ReactWithAddons';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';

// Component to test
import Button from '../../../../lib/app/components/Button';

const TestUtils = React.addons.TestUtils;
const test = addAssertions(tape, {jsxEquals});

test('Component::Button', (t) => {

  // Shallow rendering: Render React element only *one* level deep
  const component = createComponent.shallow(<Button label="share" />);

  // Test component props and content
  t.equal(component.props.className, 'default-class', 'ClassName props of component should equal "share"');
  t.equal(component.text, 'share', 'Label props of component should be rendered as Button text "share"');

  // Test rendered output
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Button label="share" />);
  const result = shallowRenderer.getRenderOutput();
  t.jsxEquals(result, <div className="default-class">share</div>);

  t.end();
});