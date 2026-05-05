import "./styles/site.css";

import { initCursorGallery } from "./gallery";
import {
  renderGallery,
  renderGeneratedAssets,
  renderHeroBackdrop,
  renderHeroFloats,
  renderHeroMarquee,
} from "./render";

renderGeneratedAssets();
renderHeroBackdrop();
renderHeroFloats();
renderHeroMarquee();
renderGallery();
initCursorGallery();
