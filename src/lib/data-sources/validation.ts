import { z } from "zod";

import {
  dataSourceAllowedUses,
  dataSourceRiskLevels,
  dataSourceStatuses,
  dataSourceTypes,
} from "./types";

const secretPattern = /(api[_-]?key|access[_-]?token|refresh[_-]?token|secret|password|bearer\s+[a-z0-9._-]+)/i;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phonePattern = /(\+?\d[\d\s().-]{7,}\d)/;

export function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function safeText(min: number, max: number) {
  return z.string().transform(cleanText).superRefine((value, context) => {
    if (value.length < min) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Must be at least ${min} characters.` });
    }

    if (value.length > max) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Must be at most ${max} characters.` });
    }

    if (secretPattern.test(value)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: "Secrets or tokens are not allowed." });
    }

    if (emailPattern.test(value)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: "Raw email addresses are not allowed." });
    }

    if (phonePattern.test(value)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: "Raw phone numbers are not allowed." });
    }
  });
}

const optionalSafeText = (max: number) =>
  z.union([safeText(0, max), z.literal("")]).optional().transform((value) => {
    if (!value || value.length === 0) return undefined;
    return value;
  });

export const createDataSourceSchema = z.object({
  name: safeText(2, 120),
  type: z.enum(dataSourceTypes),
  description: optionalSafeText(500),
  sourceOwner: optionalSafeText(120),
  riskLevel: z.enum(dataSourceRiskLevels).default("medium"),
  allowedUse: z.enum(dataSourceAllowedUses).default("unknown_needs_review"),
  status: z.enum(dataSourceStatuses).default("needs_review"),
});

export const updateDataSourceSchema = createDataSourceSchema.partial().refine(
  (input) => Object.keys(input).length > 0,
  "At least one field is required."
);

export const dataSourceFilterSchema = z.object({
  status: z.enum(dataSourceStatuses).optional(),
  riskLevel: z.enum(dataSourceRiskLevels).optional(),
  type: z.enum(dataSourceTypes).optional(),
  search: z.string().transform(cleanText).optional(),
});

export type CreateDataSourceInput = z.infer<typeof createDataSourceSchema>;
export type UpdateDataSourceInput = z.infer<typeof updateDataSourceSchema>;
export type DataSourceFilters = z.infer<typeof dataSourceFilterSchema>;
