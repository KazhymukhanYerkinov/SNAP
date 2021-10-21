import { Button } from './Button';
import { create } from 'react-test-renderer';

describe("Button component tests", () => {
  test("Check appearance type", () => {
    const component = create(<Button appearance = 'primary'> Edit </Button>);
    const root = component.root;

    const button = root.findAllByType("button");
    expect(button.length).toBe(1);
  });
})