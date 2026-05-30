import "./styles/site.css";

import { renderGeneratedAssets } from "./render";
import { renderRecordsPage } from "./recordsRender";
import { initRecordsScroll } from "./recordsScroll";

renderGeneratedAssets();
renderRecordsPage();
initRecordsScroll();
