import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.js";

export function altersgruppen_test_plot(einwohner_altersgruppen_csv, stt_id, width) {
  // filter two selected stadtteile
  const ts_data = d3.filter(
    einwohner_altersgruppen_csv,
    (r) => stt_id == r.Stadtteil_Nr
  );
  const filteredData = ts_data.filter(item => item.Gruppe !== "Erwerbsfähige (15 bis 64 Jahre)");
  const erwerbsfaehigeData = ts_data.filter(item => item.Gruppe === "Erwerbsfähige (15 bis 64 Jahre)");

  console.log('erwerbsfaehigeData', erwerbsfaehigeData);

  return Plot.plot({
    width: width,
    y: { grid: true, label: "Anzahl" },
    x: { 
        label: "Jahr"
    },
    color: { legend: true },
    marks: [
        Plot.barY(filteredData, {
        x: "Jahr",
        y: "Anteil", 
        fill: "Gruppe",
        title: d => `${d.Gruppe} (${d.Jahr}): ${d.Anteil}` 
        }),
        Plot.ruleY([0]),
        Plot.lineY(erwerbsfaehigeData, {
            x: "Jahr",
            y: "Anteil",
            stroke: "blue", 
            strokeWidth: 6, 
            curve: "linear",
            title: "Erwerbsfähige (15 bis 64 Jahre)",
            z: 10
        })

    ]
})
}