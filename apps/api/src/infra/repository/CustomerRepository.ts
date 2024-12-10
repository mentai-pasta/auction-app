import { z } from '@hono/zod-openapi';
import { createHash } from 'crypto';
import { eq } from 'drizzle-orm';
import { PostCustomerBodySchema } from '../../application/schemas/CustomerSchema.js';
import { customers } from '../entity/schema.js';
import { db } from '../helper/db.js';
type PostCustomerBodySchema = z.infer<typeof PostCustomerBodySchema>;

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

  async createCustomer(customer: PostCustomerBodySchema) {
    const { name, email, password, prefecture, city, address, postcode } = customer;

    return await db.transaction(async (trx) => {
      const result = await trx.select().from(customers).where(eq(customers.email, email));

      if (result.length > 0) {
        throw new Error('email already exists');
      }

      const response = await trx
        .insert(customers)
        .values({
          name: name,
          email: email,
          passwordHash: createHash('sha1').update(password).digest('hex'),
          prefecture: prefecture,
          city: city,
          address: address,
          postCode: postcode,
        })
        .returning({
          insertId: customers.customerId,
          name: customers.name,
          email: customers.email,
        });

      return {
        customer_id: response[0].insertId,
        name: response[0].name,
        email: response[0].email,
      };
    });
  }
}
