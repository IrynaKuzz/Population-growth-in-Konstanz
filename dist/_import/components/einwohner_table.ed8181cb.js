import { jsx, jsxs } from "../../_npm/react@18.3.1/jsx-runtime._esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";
export function Table({ einwohner_csv, einwohner_famStd_csv, einwohner_staatsangehoerigkeit_csv, id, width } = {}) {
  const maxYear = Math.max(...einwohner_csv.map((obj) => obj.Jahr));
  const previousYear = maxYear - 1;
  const ts_data = d3.filter(einwohner_csv, (r) => r.STT_ID == id);
  const maxValue = Math.max(...ts_data.map((d) => d.Einwohner));
  const minValue = Math.min(...ts_data.map((d) => d.Einwohner));
  const maxValueJahrEntries = ts_data.filter((d) => d.Einwohner === maxValue);
  const maxValueJahr = maxValueJahrEntries.map((d) => d.Jahr);
  const minValueJahrEntries = ts_data.filter((d) => d.Einwohner === minValue);
  const minValueJahr = minValueJahrEntries.map((d) => d.Jahr);
  const einwohnerMaxYear = ts_data.filter((obj) => obj.Jahr === maxYear);
  const einwohnerPreviousYear = ts_data.filter((obj) => obj.Jahr === previousYear);
  const wachstum = (einwohnerMaxYear[0].Einwohner - einwohnerPreviousYear[0].Einwohner) * 100 / einwohnerPreviousYear[0].Einwohner;
  const growthColor = wachstum > 0 ? "green" : "red";
  const growth = wachstum > 0 ? "\u2197\uFE0E" : " \u2198\uFE0E";
  const famStd_maxYear = einwohner_famStd_csv.filter((d) => d.STT_ID === id && d.Jahr === maxYear);
  const transformedData = famStd_maxYear.flatMap((item) => {
    const total = item.Fam_Stand_Geschieden_LP_aufgehoben + item.Fam_Stand_Verheiratet_Lebenspartnerschaft + item.Fam_Stand_Verwitwet_LP_gestorben + item.Fam_Stand_ledig + item.Fam_Stand_unbekannt;
    const year = item.Jahr;
    return [
      { year, status: "Geschieden", prozent: item.Fam_Stand_Geschieden_LP_aufgehoben / total, absolut: item.Fam_Stand_Geschieden_LP_aufgehoben },
      { year, status: "Verheiratet", prozent: item.Fam_Stand_Verheiratet_Lebenspartnerschaft / total, absolut: item.Fam_Stand_Verheiratet_Lebenspartnerschaft },
      { year, status: "Verwitwet", prozent: item.Fam_Stand_Verwitwet_LP_gestorben / total, absolut: item.Fam_Stand_Verwitwet_LP_gestorben },
      { year, status: "Ledig", prozent: item.Fam_Stand_ledig / total, absolut: item.Fam_Stand_ledig },
      { year, status: "Unbekannt", prozent: item.Fam_Stand_unbekannt / total, absolut: item.Fam_Stand_unbekannt }
    ];
  });
  const staatsAHK_maxYear = einwohner_staatsangehoerigkeit_csv.filter((d) => d.STT_ID === id && d.Jahr === maxYear);
  const transformedData_sahk = staatsAHK_maxYear.flatMap((item) => {
    const total = item.Deutsch + item.Nichtdeutsch;
    const year = item.Jahr;
    return [
      { year, status: "Deutsch", prozent: item.Deutsch / total, absolut: item.Deutsch },
      { year, status: "Sonstige", prozent: item.Nichtdeutsch / total, absolut: item.Nichtdeutsch }
    ];
  });
  return /* @__PURE__ */ jsxs("div", { width, children: [
    /* @__PURE__ */ jsxs("h1", { class: "ort_name_card", children: [
      " ",
      einwohnerMaxYear.STT,
      " "
    ] }),
    /* @__PURE__ */ jsx("div", { class: "card", children: /* @__PURE__ */ jsxs("table", { style: { tableLayout: "fixed", width: "100%" }, children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: "Gesamt der Einwohner:" }),
        /* @__PURE__ */ jsxs("td", { children: [
          " ",
          einwohnerMaxYear[0].Einwohner.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
          " "
        ] })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsxs("td", { children: [
          "Wachstum im Vergleich zu $",
          previousYear,
          ":"
        ] }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("span", { children: [
          " ",
          wachstum.toFixed(2).replace(".", ","),
          " % ",
          growth
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: "Maximale Einwohnerzahl: " }),
        /* @__PURE__ */ jsxs("td", { children: [
          maxValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
          " im Jahr ",
          maxValueJahr
        ] })
      ] }),
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: "Manimale Einwohnerzahl:" }),
        /* @__PURE__ */ jsxs("td", { children: [
          " ",
          minValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
          " im Jahr ",
          minValueJahr
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { class: "card", children: /* @__PURE__ */ jsx("table", { style: { tableLayout: "fixed", width: "100%" }, children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: "Familienstand (EinwohnerInnen ab 18 Jahre):" }),
      /* @__PURE__ */ jsx("td", { children: transformedData.map(
        (item) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { children: [
            item.status,
            ": "
          ] }),
          /* @__PURE__ */ jsx("span", { children: item.absolut.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") }),
          /* @__PURE__ */ jsxs("span", { children: [
            " (",
            (item.prozent * 100).toFixed(1).replace(".", ","),
            "%) "
          ] })
        ] })
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { class: "card", children: /* @__PURE__ */ jsx("table", { style: { tableLayout: "fixed", width: "100%" }, children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { children: "Staatsangeh\xF6rigkeit:" }),
      /* @__PURE__ */ jsx("td", { children: transformedData_sahk.map((item) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          item.status,
          ":"
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          " ",
          item.absolut.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          " (",
          (item.prozent * 100).toFixed(1).replace(".", ","),
          "%)"
        ] })
      ] })) })
    ] }) }) })
  ] });
}
