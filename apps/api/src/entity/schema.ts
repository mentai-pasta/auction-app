import {
  foreignKey,
  interval,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const soldStatuses = pgTable('sold_statuses', {
  soldStatusId: uuid('sold_status_id').primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const manufacturers = pgTable('manufacturers', {
  manufacturerId: uuid('manufacturer_id').primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const auctions = pgTable(
  'auctions',
  {
    auctionId: uuid('auction_id').primaryKey().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
    employeeId: uuid('employee_id').notNull(),
    duration: interval().notNull(),
    beginTime: timestamp('begin_time', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      auctionsEmployeeIdFkey: foreignKey({
        columns: [table.employeeId],
        foreignColumns: [employees.employeeId],
        name: 'auctions_employee_id_fkey',
      }),
    };
  },
);

export const stocks = pgTable(
  'stocks',
  {
    stockId: uuid('stock_id').primaryKey().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
    auctionId: uuid('auction_id').notNull(),
    vehicleId: uuid('vehicle_id').notNull(),
    soldStatusId: uuid('sold_status_id').notNull(),
    beginTime: timestamp('begin_time', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      stocksAuctionIdFkey: foreignKey({
        columns: [table.auctionId],
        foreignColumns: [auctions.auctionId],
        name: 'stocks_auction_id_fkey',
      }),
      stocksVehicleIdFkey: foreignKey({
        columns: [table.vehicleId],
        foreignColumns: [vehicles.vehicleId],
        name: 'stocks_vehicle_id_fkey',
      }),
      stocksSoldStatusIdFkey: foreignKey({
        columns: [table.soldStatusId],
        foreignColumns: [soldStatuses.soldStatusId],
        name: 'stocks_sold_status_id_fkey',
      }),
    };
  },
);

export const vehicles = pgTable(
  'vehicles',
  {
    vehicleId: uuid('vehicle_id').primaryKey().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
    seriesId: uuid('series_id').notNull(),
    employeeId: uuid('employee_id').notNull(),
  },
  (table) => {
    return {
      vehiclesSeriesIdFkey: foreignKey({
        columns: [table.seriesId],
        foreignColumns: [series.seriesId],
        name: 'vehicles_series_id_fkey',
      }),
      vehiclesEmployeeIdFkey: foreignKey({
        columns: [table.employeeId],
        foreignColumns: [employees.employeeId],
        name: 'vehicles_employee_id_fkey',
      }),
    };
  },
);

export const series = pgTable(
  'series',
  {
    seriesId: uuid('series_id').primaryKey().notNull(),
    name: varchar({ length: 255 }),
    manufacturerId: uuid('manufacturer_id').notNull(),
  },
  (table) => {
    return {
      seriesManufacturerIdFkey: foreignKey({
        columns: [table.manufacturerId],
        foreignColumns: [manufacturers.manufacturerId],
        name: 'series_manufacturer_id_fkey',
      }),
    };
  },
);

export const employees = pgTable(
  'employees',
  {
    employeeId: uuid('employee_id').primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    jobTypeId: uuid('job_type_id').notNull(),
  },
  (table) => {
    return {
      employeesJobTypeIdFkey: foreignKey({
        columns: [table.jobTypeId],
        foreignColumns: [jobTypes.jobTypeId],
        name: 'employees_job_type_id_fkey',
      }),
    };
  },
);

export const jobTypes = pgTable('job_types', {
  jobTypeId: uuid('job_type_id').primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const notifications = pgTable(
  'notifications',
  {
    notificationId: uuid('notification_id').primaryKey().notNull(),
    title: varchar({ length: 255 }).notNull(),
    body: varchar({ length: 255 }),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
    employeeId: uuid('employee_id').notNull(),
    deploySchedule: timestamp('deploy_schedule', { mode: 'string' }),
    deployStatusId: uuid('deploy_status_id'),
  },
  (table) => {
    return {
      notificationsEmployeeIdFkey: foreignKey({
        columns: [table.employeeId],
        foreignColumns: [employees.employeeId],
        name: 'notifications_employee_id_fkey',
      }),
      notificationsDeployStatusIdFkey: foreignKey({
        columns: [table.deployStatusId],
        foreignColumns: [deployStatuses.deployStatusId],
        name: 'notifications_deploy_status_id_fkey',
      }),
    };
  },
);

export const deployStatuses = pgTable('deploy_statuses', {
  deployStatusId: uuid('deploy_status_id').primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const contacts = pgTable(
  'contacts',
  {
    contactId: uuid('contact_id').primaryKey().notNull(),
    customerId: uuid('customer_id').notNull(),
    title: varchar({ length: 255 }).notNull(),
    body: varchar({ length: 255 }).notNull(),
    employeeId: uuid('employee_id'),
    createdAt: timestamp('created_at', { mode: 'string' }),
    updatedAt: timestamp('updated_at', { mode: 'string' }),
  },
  (table) => {
    return {
      contactsEmployeeIdFkey: foreignKey({
        columns: [table.employeeId],
        foreignColumns: [employees.employeeId],
        name: 'contacts_employee_id_fkey',
      }),
      contactsCustomerIdFkey: foreignKey({
        columns: [table.customerId],
        foreignColumns: [customers.customerId],
        name: 'contacts_customer_id_fkey',
      }),
    };
  },
);

export const bids = pgTable(
  'bids',
  {
    bidId: uuid('bid_id').primaryKey().notNull(),
    customerId: uuid('customer_id').notNull(),
    stockId: uuid('stock_id').notNull(),
    price: numeric(),
    createdAt: timestamp('created_at', { mode: 'string' }),
  },
  (table) => {
    return {
      bidsStockIdFkey: foreignKey({
        columns: [table.stockId],
        foreignColumns: [stocks.stockId],
        name: 'bids_stock_id_fkey',
      }),
      bidsCustomerIdFkey: foreignKey({
        columns: [table.customerId],
        foreignColumns: [customers.customerId],
        name: 'bids_customer_id_fkey',
      }),
    };
  },
);

export const customers = pgTable('customers', {
  customerId: uuid('customer_id').primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  prefecture: varchar({ length: 255 }),
  city: varchar({ length: 255 }),
  address: varchar({ length: 255 }),
  postCode: varchar('post_code', { length: 7 }),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
});
