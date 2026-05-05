import "./styles/site.css";

import { initCursorGallery } from "./gallery";
import {
  renderGallery,
  renderHeroBackdrop,
  renderHeroFloats,
  renderHeroMarquee,
} from "./render";

renderHeroBackdrop();
renderHeroFloats();
renderHeroMarquee();
renderGallery();
initCursorGallery();
