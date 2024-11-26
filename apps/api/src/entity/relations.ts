import { relations } from 'drizzle-orm/relations';
import {
  auctions,
  bids,
  contacts,
  customers,
  deployStatuses,
  employees,
  jobTypes,
  manufacturers,
  notifications,
  series,
  soldStatuses,
  stocks,
  vehicles,
} from './schema.js';

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
  jobType: one(jobTypes, {
    fields: [employees.jobTypeId],
    references: [jobTypes.jobTypeId],
  }),
  notifications: many(notifications),
  contacts: many(contacts),
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

export const manufacturersRelations = relations(manufacturers, ({ many }) => ({
  series: many(series),
}));

export const jobTypesRelations = relations(jobTypes, ({ many }) => ({
  employees: many(employees),
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
