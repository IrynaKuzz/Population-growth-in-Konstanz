import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.js";

export function altersgruppen_rel_plot(einwohner_altersgruppen_csv, stt_id, width) {


  // filter two selected stadtteile
  const ts_data = d3.filter(
    einwohner_altersgruppen_csv,
    (r) => stt_id == r.Stadtteil_Nr
  );
  console.log('ts_data', ts_data);

  return Plot.plot({
    width: width,
    y: { grid: true, label: "Anzahl" },
    x: { 
        label: "Jahr"
    },
    color: { legend: true },
    marks: [
        Plot.areaY(ts_data, {
        x: "Jahr",
        y: "Anzahl", 
        fill: "Gruppe",
        title: d => `${d.Gruppe} (${d.Jahr}): ${d.Anzahl}` 
        }),
        Plot.ruleY([0]) 
    ]
})

/*
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
        y: "Anteil",
        stroke: "Gruppe",
      }),
    ],
    color: {legend: true},
  },
)*/
}