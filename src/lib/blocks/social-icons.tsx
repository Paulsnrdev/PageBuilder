import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export const socialIconByPlatform: Record<string, IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  website: FaGlobe,
};
