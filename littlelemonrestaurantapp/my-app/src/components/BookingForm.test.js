import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm HTML5 validation', () => {
  test('renders date input with required attribute', () => {
    render(<BookingForm availableTimes={[]} submitForm={() => {}} dispatch={() => {}} />);
    const dateInput = screen.getByLabelText(/Choose date/i);
    expect(dateInput).toBeRequired();
  });

  test('renders time select with required attribute', () => {
    render(<BookingForm availableTimes={['12:00']} submitForm={() => {}} dispatch={() => {}} />);
    const timeSelect = screen.getByLabelText(/Choose time/i);
    expect(timeSelect).toBeRequired();
  });

  test('renders guests input with min and max attributes', () => {
    render(<BookingForm availableTimes={[]} submitForm={() => {}} dispatch={() => {}} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('renders occasion select with required attribute', () => {
    render(<BookingForm availableTimes={[]} submitForm={() => {}} dispatch={() => {}} />);
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    expect(occasionSelect).toBeRequired();
  });
});

describe('BookingForm validation logic', () => {
  test('disables submit button if guests input is less than 1', () => {
    render(<BookingForm availableTimes={['12:00']} submitForm={() => {}} dispatch={() => {}} />);
    
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByRole('button', { name: /submit reservation/i });

    fireEvent.change(guestsInput, { target: { value: '0' } });
    expect(submitButton).toBeDisabled(); // Button should be disabled for invalid input
  });

  test('disables submit button if form is incomplete', () => {
    render(<BookingForm availableTimes={['12:00']} submitForm={() => {}} dispatch={() => {}} />);
    
    const submitButton = screen.getByRole('button', { name: /submit reservation/i });
    expect(submitButton).toBeDisabled(); // Button should be disabled initially

    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2024-10-22' } });

    const timeSelect = screen.getByLabelText(/Choose time/i);
    fireEvent.change(timeSelect, { target: { value: '12:00' } });

    const guestsInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '5' } });

    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

    expect(submitButton).not.toBeDisabled(); // Button should be enabled when form is valid
  });

  test('shows error messages when fields are invalid', () => {
    render(<BookingForm availableTimes={[]} submitForm={() => {}} dispatch={() => {}} />);
    
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '11' } });
    
    const errorMessage = screen.getByText(/Guests must be between 1 and 10/i);
    expect(errorMessage).toBeInTheDocument(); // Error message should appear for invalid input
  });
});
