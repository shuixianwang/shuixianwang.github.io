import "./styles/site.css";

import { initCursorGallery } from "./gallery";
import {
  renderGallery,
  renderGeneratedAssets,
  renderHeroBackdrop,
  renderHeroFloats,
  renderHeroMarquee,
} from "./render";
import { initRelationshipCounter } from "./relationshipCounter";

renderGeneratedAssets();
renderHeroBackdrop();
renderHeroFloats();
renderHeroMarquee();
initRelationshipCounter();
renderGallery();
initCursorGallery();
