import { render, screen } from '@testing-library/react';
import { HomeBlock } from '..';

describe('<HomeBlock /> test suite', () => {
  let component;
  let props;
  beforeEach(() => {
    props = {
      backgroundColor: '#fff',
      blockTitle: 'Eventos',
      children: 'List of events',
      showMore: 'Events',
    };

    component = render(<HomeBlock {...props} />);
  });

  test('Renders component', () => {
    expect(component).toBeDefined();
  });

  test('Sets block background from props', () => {
    const element = screen.getByRole('block-wrapper');
    expect(element).toHaveStyle(`background-color: ${props.backgroundColor}`);
  });

  test('Sets block title from props', () => {
    const element = screen.getByRole('heading', { name: props.blockTitle });
    expect(element).toHaveTextContent(props.blockTitle);
  });

  test('Sets block content from props', () => {
    const element = screen.getByText(props.children);
    expect(element).toBeDefined();
  });

  test('Sets "show more" button visible', () => {
    const element = screen.getByRole('show-more');
    expect(element).toBeDefined();
  });
});
