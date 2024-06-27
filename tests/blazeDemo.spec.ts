import { test, expect } from '@playwright/test';
import { bookingPage } from '../POM/bookingPage';
import { BasePage } from '../POM/basePage';

test('test for blazeDemo', async ({ page }) => {

  const base = new BasePage(page);
  const bookings = new bookingPage(page);
  await base.loadWeb('https://blazedemo.com/');
  await bookings.selectDestiny();
  await bookings.fillPersonalInfo();
  await bookings.confirmationBooking();
  
});