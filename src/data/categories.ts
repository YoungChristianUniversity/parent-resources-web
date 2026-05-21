export const formats = [
  "book",
  "podcast",
  "newsletter",
  "website",
  "app",
  "video/course",
] as const;

export type Format = (typeof formats)[number];

export const topics = [
  "faith & devotionals",
  "relationships & dating",
  "mental health",
  "technology & screen time",
  "character & values",
  "college & career prep",
  "parenting skills",
] as const;

export type Topic = (typeof topics)[number];

export interface Resource {
  name: string;
  description: string;
  url: string;
  formats: Format[];
  topics: Topic[];
}
