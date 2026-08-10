export type LeadContext = {
  siteId: string;
  /** Path to redirect back to after a successful submit, e.g. "/s/my-site". */
  basePath: string;
  submittedBlockId?: string;
  whatsappHref?: string;
};
