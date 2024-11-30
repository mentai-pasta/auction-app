import { sql } from 'drizzle-orm';
import {
  foreignKey,
  interval,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const customers = pgTable('customers', {
  customerId: uuid('customer_id').defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  prefecture: varchar({ length: 255 }),
  city: varchar({ length: 255 }),
  address: varchar({ length: 255 }),
  postCode: varchar('post_code', { length: 7 }),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const deployStatuses = pgTable('deploy_statuses', {
  deployStatusId: uuid('deploy_status_id').defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const soldStatuses = pgTable('sold_statuses', {
  soldStatusId: uuid('sold_status_id').defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const auctions = pgTable(
  'auctions',
  {
    auctionId: uuid('auction_id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
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
    stockId: uuid('stock_id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
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
    vehicleId: uuid('vehicle_id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
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

export const notifications = pgTable(
  'notifications',
  {
    notificationId: uuid('notification_id').defaultRandom().primaryKey().notNull(),
    title: varchar({ length: 255 }).notNull(),
    body: varchar({ length: 255 }),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
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

export const contacts = pgTable(
  'contacts',
  {
    contactId: uuid('contact_id').defaultRandom().primaryKey().notNull(),
    customerId: uuid('customer_id').notNull(),
    title: varchar({ length: 255 }).notNull(),
    body: varchar({ length: 255 }).notNull(),
    employeeId: uuid('employee_id'),
    createdAt: timestamp('created_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: timestamp('updated_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
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

export const series = pgTable(
  'series',
  {
    seriesId: uuid('series_id').defaultRandom().primaryKey().notNull(),
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
    employeeId: uuid('employee_id').defaultRandom().primaryKey().notNull(),
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
  jobTypeId: uuid('job_type_id').defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const bids = pgTable(
  'bids',
  {
    bidId: uuid('bid_id').defaultRandom().primaryKey().notNull(),
    customerId: uuid('customer_id').notNull(),
    stockId: uuid('stock_id').notNull(),
    price: numeric(),
    createdAt: timestamp('created_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
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

export const manufacturers = pgTable('manufacturers', {
  manufacturerId: uuid('manufacturer_id').defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const auctionsRelations = relations(auctions, ({ one, many }) => ({
  employee: one(employees, {
    fields: [auctions.employeeId],
    references: [employees.employeeId],
  }),
  stocks: many(stocks),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  auctions: many(auctions),
  vehicles: many(vehicles),
  notifications: many(notifications),
  contacts: many(contacts),
  jobType: one(jobTypes, {
    fields: [employees.jobTypeId],
    references: [jobTypes.jobTypeId],
  }),
}));

export const stocksRelations = relations(stocks, ({ one, many }) => ({
  auction: one(auctions, {
    fields: [stocks.auctionId],
    references: [auctions.auctionId],
  }),
  vehicle: one(vehicles, {
    fields: [stocks.vehicleId],
    references: [vehicles.vehicleId],
  }),
  soldStatus: one(soldStatuses, {
    fields: [stocks.soldStatusId],
    references: [soldStatuses.soldStatusId],
  }),
  bids: many(bids),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  stocks: many(stocks),
  series: one(series, {
    fields: [vehicles.seriesId],
    references: [series.seriesId],
  }),
  employee: one(employees, {
    fields: [vehicles.employeeId],
    references: [employees.employeeId],
  }),
}));

export const soldStatusesRelations = relations(soldStatuses, ({ many }) => ({
  stocks: many(stocks),
}));

export const seriesRelations = relations(series, ({ one, many }) => ({
  vehicles: many(vehicles),
  manufacturer: one(manufacturers, {
    fields: [series.manufacturerId],
    references: [manufacturers.manufacturerId],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  employee: one(employees, {
    fields: [notifications.employeeId],
    references: [employees.employeeId],
  }),
  deployStatus: one(deployStatuses, {
    fields: [notifications.deployStatusId],
    references: [deployStatuses.deployStatusId],
  }),
}));

export const deployStatusesRelations = relations(deployStatuses, ({ many }) => ({
  notifications: many(notifications),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  employee: one(employees, {
    fields: [contacts.employeeId],
    references: [employees.employeeId],
  }),
  customer: one(customers, {
    fields: [contacts.customerId],
    references: [customers.customerId],
  }),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  contacts: many(contacts),
  bids: many(bids),
}));

export const manufacturersRelations = relations(manufacturers, ({ many }) => ({
  series: many(series),
}));

export const jobTypesRelations = relations(jobTypes, ({ many }) => ({
  employees: many(employees),
}));

export const bidsRelations = relations(bids, ({ one }) => ({
  stock: one(stocks, {
    fields: [bids.stockId],
    references: [stocks.stockId],
  }),
  customer: one(customers, {
    fields: [bids.customerId],
    references: [customers.customerId],
  }),
}));