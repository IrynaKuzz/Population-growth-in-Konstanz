import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";

export function staatsangehoerigkeit_plot(einwohner_staatsAHK_csv, stt_id, width) {

    const ts_data = d3.filter(einwohner_staatsAHK_csv, (r) => r.STT_ID == stt_id);

    const transformedData = ts_data.flatMap(item => {
      const total = item.Deutsch + item.Nichtdeutsch;
      const jahr = item.Jahr;
      return [
        { jahr, status: "Deutsch", value: item.Deutsch / total },
        { jahr, status: "Sonstige", value: item.Nichtdeutsch / total}
      ];
    });

    return Plot.plot({
      width: width,
      color: { scheme: "Observable10", legend: true },
      x: {
        label: "Jahr",
        tickFormat:"",
      },
      y: {
        label: "Prozent",
        tickFormat: x => `${x * 100}%`,
      },
      marks: [
        Plot.barY(transformedData, {x: "jahr", y: "value", fill: "status"}),
        Plot.ruleY([0])
      ]
    })
}

