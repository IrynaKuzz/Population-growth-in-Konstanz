import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.js";

export function altersgruppen_abs_plot(einwohner_altersgruppen_csv, stt_id, width) {


  // filter two selected stadtteile
  const ts_data = d3.filter(
    einwohner_altersgruppen_csv,
    (r) => stt_id == r.Stadtteil_Nr
  );
  

  return Plot.plot({
    width: width,
    y: { grid: true, label: "Anteil" },
    x: { 
        label: "Jahr"
    },
    color: { legend: true, scheme: "Observable10" },
    marks: [
        Plot.barY(ts_data, {
        x: "Jahr",
        y: "Anteil", 
        fill: "Gruppe",
        title: d => `${d.Gruppe} (${d.Jahr}): ${d.Anteil}` 
        }),
        Plot.ruleY([0]) 
    ]
})
}