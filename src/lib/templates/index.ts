import { restaurantTemplate } from "@/lib/templates/restaurant";
import { salonTemplate } from "@/lib/templates/salon";
import { consultantTemplate } from "@/lib/templates/consultant";
import { eventTemplate } from "@/lib/templates/event";
import { productLaunchTemplate } from "@/lib/templates/product-launch";
import { ecommerceTemplate } from "@/lib/templates/ecommerce";
import { makeupArtistTemplate } from "@/lib/templates/makeup-artist";
import { fitnessTemplate } from "@/lib/templates/fitness";
import { realEstateTemplate } from "@/lib/templates/real-estate";
import { fashionDesignerTemplate } from "@/lib/templates/fashion-designer";
import type { Template } from "@/lib/templates/types";

export const templates: Template[] = [
  restaurantTemplate,
  salonTemplate,
  consultantTemplate,
  eventTemplate,
  productLaunchTemplate,
  ecommerceTemplate,
  makeupArtistTemplate,
  fitnessTemplate,
  realEstateTemplate,
  fashionDesignerTemplate,
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((template) => template.id === id);
}

export type { Template, TemplateBlock } from "@/lib/templates/types";
