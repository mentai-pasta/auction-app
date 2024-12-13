import { type RouteHandler } from '@hono/zod-openapi';
import { VehicleRepository } from '../../infra/repository/VehicleRepository.js';
import { postVehiclesRoute } from '../routes/VehicleRoute.js';

// 車両新規登録用ハンドラ
export const postVehiclesHandler: RouteHandler<typeof postVehiclesRoute> = async (c) => {
  const json = c.req.valid('json');

  try {
    const vehicleRepo = new VehicleRepository();
    const result = await vehicleRepo.createVehicle(json);

    return c.json(
      {
        message: 'ok',
        vehicle_id: result.vehicle_id,
      },
      200,
    );
  } catch (e: unknown) {
    return c.json(
      {
        message: e instanceof Error ? e.message : 'Unknown error',
        stackTrace: e instanceof Error ? e.stack : undefined,
      },
      400,
    );
  }
};
