import { eq } from 'drizzle-orm';
import { customers } from '../entity/schema.js';
import { db } from '../helper/db.js';

export class CustomerRepository {
  async getCustomerById(customerId: string) {
    return await db.query.customers.findFirst({
      where: eq(customers.customerId, customerId),
    });
  }

  async getCustomerByEmail(email: string) {
    return await db.query.customers.findFirst({
      where: eq(customers.email, email),
    });
  }
}
