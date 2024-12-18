import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";

export function absolut_plot(einwohner_csv, stt_id, width) {
    const ts_data = d3.filter(einwohner_csv, (r) => r.STT_ID == stt_id);

    return Plot.plot({        
        width: width,
        x: {
            tickFormat: "",
        },
        y: {
            tickFormat: d => d.toLocaleString(),
        },
        marks: [
            Plot.rectY(ts_data, 
                { 
                x: "Jahr",
                y: "Einwohner", 
                fill: "var(--theme-foreground-focus)",  
                title: d => `Einwohner: ${d.Einwohner.toLocaleString()}` 
                }),          
        
            Plot.text(ts_data, {
                x: d => d.Jahr, 
                y: d => d.Einwohner, 
                text: d => `${d.Wachstum.toLocaleString(undefined, {maximumFractionDigits: 2})} %`, 
                textAnchor: "middle",
                dy: -15, 
                fill: d => d.Wachstum >= 0 ? "var(--theme-green)" : "var(--theme-red)",
            }),
        ]  
    })    
}
    
