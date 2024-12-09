// import papa from "papaparse";
// import legendItems from "./LegendItems";
// import { features } from "./countries.json";

// class LoadCountryTask {
//   covidUrl =
//     "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";

//   setState = null;

//   load = (setState: any) => {
//     this.setState = setState;

//     papa.parse(this.covidUrl, {
//       download: true,
//       header: true,
//       complete: (result: any) => this.#processCovidData(result.data),
//     });
//   };

//   #processCovidData = (covidCountries: any) => {
//     for (let i = 0; i < features.length; i++) {
//       const country = features[i];
//       //console.log(country);
//       const covidCountry = covidCountries.find(
//         (covidCountry) => country.properties.ISO_A3 === covidCountry.ISO3
//       );

//       country.properties.confirmed = 0;
//       country.properties.confirmedText = 0;

//       if (covidCountry != null) {
//         let confirmed = Number(covidCountry.Confirmed);
//         country.properties.confirmed = confirmed;
//         country.properties.confirmedText =
//           this.#formatNumberWithCommas(confirmed);
//       }
//       this.#setCountryColor(country);
//     }

//     this.setState(features);
//   };

//   #setCountryColor = (country: any) => {
//     console.log("Country: ", country);
//     const legendItem = legendItems.find((item) =>
//       item.isFor(country.properties.confirmed)
//     );

//     if (legendItem != null) country.properties.color = legendItem.color;
//   };

//   #formatNumberWithCommas = (number) => {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };
// }

// export default LoadCountryTask;
