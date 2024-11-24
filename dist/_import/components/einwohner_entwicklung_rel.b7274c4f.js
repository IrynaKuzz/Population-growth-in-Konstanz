import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.js";

export function relativ_plot(einwohner_csv, stt_id, compare_id, width) {


  // filter two selected stadtteile
  const ts_data = d3.filter(
    einwohner_csv,
    (r) => [stt_id, compare_id].includes(r.STT_ID)
  );

  return Plot.plot({
    width: width,
    x: {
      label: "Jahr",
      tickFormat: "",
    },
    y: {
      label: "Wachstum (% im Vergleich zum Vorjahr)",
      grid: true,
      tickFormat: d => d.toLocaleString(),
    },
    marks: [
      Plot.lineY(ts_data,{
        x: "Jahr",
        y: "Wachstum",
        stroke: "STT",
      }),
    ],
    color: {legend: true},
  },
  )}
