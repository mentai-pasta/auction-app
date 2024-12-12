import { z } from '@hono/zod-openapi';
import { PostVehicleBodySchema } from '../../application/schemas/VehicleSchema.js';
import { db } from '../helper/db.js';
import { vehicles } from '../entity/schema.js';
type PostVehicleBodySchema = z.infer<typeof PostVehicleBodySchema>;

export class VehicleRepository {
  async createVehicle(vehicle: PostVehicleBodySchema) {
    const { series_id, employee_id } = vehicle;

    return await db.transaction(async (trx) => {
      const response = await trx
        .insert(vehicles)
        .values({
          seriesId: series_id,
          employeeId: employee_id,
        })
        .returning({
          insertId: vehicles.vehicleId,
        });

      return {
        vehicle_id: response[0].insertId,
      };
    });
  }
}
