"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPage = exports.createHeader = void 0;
var details_ts_1 = require("./details.ts");
console.log('happening');
/* API call  */
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, results_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://restcountries.com/v3.1/all')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Network response was not ok: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    results_1 = [];
                    // Process the data
                    data.forEach(function (obj) {
                        //   console.log(obj.name)
                        var countryFlag = obj.flags.png;
                        var countryFlagAlt = obj.flags.alt;
                        var countryName = obj.name.common;
                        var countryPopulation = obj.population;
                        var countryRegion = obj.region;
                        var countryCapital = obj.capital && (obj.capital[0] || obj.capital[1]);
                        var countrySubRegion = obj.subregion;
                        var countryTopLevelDomain = obj.tld && (obj.tld[0] || obj.tld[0]);
                        var countryCurrency = obj.currencies ? obj.currencies[Object.keys(obj.currencies)[0]].name : 'NO CURRENCY AVAILABLE IN API';
                        var countryLanguage = obj.languages ? obj.languages[Object.keys(obj.languages)[0]] : 'No LANGUAGE AVAILABLE';
                        var countryBorder = obj.borders;
                        results_1.push({
                            countryFlag: countryFlag,
                            countryFlagAlt: countryFlagAlt,
                            countryName: countryName,
                            countryPopulation: countryPopulation,
                            countryRegion: countryRegion,
                            countryCapital: countryCapital,
                            countrySubRegion: countrySubRegion,
                            countryTopLevelDomain: countryTopLevelDomain,
                            countryCurrency: countryCurrency,
                            countryLanguage: countryLanguage,
                            countryBorder: countryBorder
                        });
                    });
                    return [2 /*return*/, results_1];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/*creating the container that will hold the search bar,
 filter bar and countries */
function pageBody() {
    return __awaiter(this, void 0, void 0, function () {
        var container, topNav, data, countryFxnWrapper_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = document.createElement('div');
                    container.classList.add('flow_layout_column');
                    topNav = document.createElement('div');
                    topNav.classList.add('flow_layout_row');
                    topNav.id = 'top_nav';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchData()];
                case 2:
                    data = _a.sent();
                    countryFxnWrapper_1 = document.createElement('div');
                    countryFxnWrapper_1.classList.add('flow_layout_row');
                    countryFxnWrapper_1.id = 'country_fxn';
                    // Iterate through the fetched data and create country elements
                    data.forEach(function (el) {
                        var country = createCountry(el.countryFlag, el.countryFlagAlt, el.countryName, el.countryPopulation, el.countryRegion, el.countryCapital, el.countrySubRegion, el.countryTopLevelDomain, el.countryCurrency, el.countryLanguage, el.countryBorder);
                        countryFxnWrapper_1.append(country);
                    });
                    container.append(countryFxnWrapper_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error fetching data:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, container];
            }
        });
    });
}
/*creating the country element i think country funcitons may have arguments that will contain
the details and Flag if the individual countries and it will be run for each time there is a country probably with the forEach loop
each time it is run, it will be added to the container div that contains the search and filter bar*/
function createCountry(countryFlagArg, countryFlagAltArg, countryNameArg, countryPopulationArg, countryRegionArg, countryCapitalArg, countrySubRegionArg, countryTLDArg, countryCurrArg, countryLangArg, border) {
    var countryWrapper = document.createElement('div'); /*Individual country wrapper */
    var countryFlagWrapper = document.createElement('div'); /* Flag countainer in the country wrapper */
    var flag = document.createElement('img');
    var countryDetails = document.createElement('div'); /* container for the country short details */
    var countryName = document.createElement('h3'); /*Holds the country name */
    var countryPopulationDetail = document.createElement('div'); /*wrapper for country population details */
    var countryPopulationText = document.createElement('h4');
    var countryPopulationValue = document.createElement('p');
    var countryRegionDetail = document.createElement('div'); /*wrapper for country region details */
    var countryRegionText = document.createElement('h4');
    var countryRegionValue = document.createElement('p');
    var countryCapitalDetail = document.createElement('div'); /*wrapper for country capital details */
    var countryCapitalText = document.createElement('h4');
    var countryCapitalValue = document.createElement('p');
    var countrySubRegionDetail = document.createElement('div'); /*wrapper for country Sub Region details */
    var countrySubRegionText = document.createElement('h4');
    var countrySubRegionValue = document.createElement('p');
    var countryTLDDetail = document.createElement('div'); /*wrapper for country Time line Domain details */
    var countryTLDText = document.createElement('h4');
    var countryTLDValue = document.createElement('p');
    var countryCurrencyDetail = document.createElement('div'); /*wrapper for country Currency  details */
    var countryCurrencyText = document.createElement('h4');
    var countryCurrencyValue = document.createElement('p');
    var countryLanguageDetail = document.createElement('div'); /*wrapper for country Language details */
    var countryLanguageText = document.createElement('h4');
    var countryLanguageValue = document.createElement('p');
    countryWrapper.classList.add('flow_layout_column');
    countryDetails.classList.add('flow_layout_column');
    countryPopulationDetail.classList.add('flow_layout_row');
    countryRegionDetail.classList.add('flow_layout_row');
    countryCapitalDetail.classList.add('flow_layout_row');
    countrySubRegionDetail.classList.add('flow_layout_row');
    countryTLDDetail.classList.add('flow_layout_row');
    countryCurrencyDetail.classList.add('flow_layout_row');
    countryLanguageDetail.classList.add('flow_layout_row');
    countryFlagWrapper.id = 'country_flag_wrapper';
    flag.id = 'flag';
    countryWrapper.id = 'country_wrapper';
    countryDetails.id = 'country_details';
    countryPopulationDetail.id = 'country_population';
    countryPopulationText.id = 'population_value';
    countryRegionDetail.id = 'country_region';
    countryCapitalDetail.id = 'country_capital';
    flag.src = countryFlagArg;
    flag.alt = countryFlagAltArg;
    countryPopulationText.textContent = 'Population:';
    countryRegionText.textContent = 'Region:';
    countryCapitalText.textContent = 'Capital:';
    countrySubRegionText.textContent = 'Sub Region:';
    countryTLDText.textContent = 'Time Line Domain:';
    countryCurrencyText.textContent = 'Currency:';
    countryLanguageText.textContent = 'Language:';
    countryName.textContent = countryNameArg;
    countryPopulationValue.textContent = countryPopulationArg;
    countryRegionValue.textContent = countryRegionArg;
    countryCapitalValue.textContent = countryCapitalArg;
    countryTLDValue.textContent = countrySubRegionArg;
    countrySubRegionValue.textContent = countryTLDArg;
    countryCurrencyValue.textContent = countryCurrArg;
    countryLanguageValue.textContent = countryLangArg;
    countryFlagWrapper.append(flag);
    countryPopulationDetail.append(countryPopulationText);
    countryPopulationDetail.append(countryPopulationValue);
    countryRegionDetail.append(countryRegionText);
    countryRegionDetail.append(countryRegionValue);
    countryCapitalDetail.append(countryCapitalText);
    countryCapitalDetail.append(countryCapitalValue);
    countryTLDDetail.append(countryTLDText);
    countryTLDDetail.append(countryTLDValue);
    countrySubRegionDetail.append(countrySubRegionText);
    countrySubRegionDetail.append(countrySubRegionValue);
    countryCurrencyDetail.append(countryCurrencyText);
    countryCurrencyDetail.append(countryCurrencyValue);
    countryLanguageDetail.append(countryLanguageText);
    countryLanguageDetail.append(countryLanguageValue);
    countryDetails.append(countryName);
    countryDetails.append(countryPopulationDetail);
    countryDetails.append(countryRegionDetail);
    countryDetails.append(countryCapitalDetail);
    // countryDetails.append(countryTLDDetail);    
    // countryDetails.append(countrySubRegionDetail);    
    // countryDetails.append(countryCurrencyDetail);    
    // countryDetails.append(countryLanguageDetail);    
    countryWrapper.append(countryFlagWrapper);
    countryWrapper.append(countryDetails);
    // console.log(bordersArgs)
    // creating objects for the elements and value i need in the second page
    var countryDetailsTransfer = {
        countryFlag: countryFlagArg,
        countryFlagAlt: countryFlagAltArg,
        population: countryPopulationDetail,
        capital: countryCapitalDetail,
        tld: countryTLDDetail,
        subRegion: countrySubRegionDetail,
        currency: countryCurrencyDetail,
        language: countryLanguageDetail,
        countryNameEl: countryName,
        region: countryRegionDetail
    };
    //adding event listener to each flag to return its object 
    countryWrapper.addEventListener('click', function () {
        (0, details_ts_1.createPageDetails)(countryDetailsTransfer);
    });
    return countryWrapper;
}
// creating the Header component...
function createHeader() {
    var header = document.createElement('header'); /*The header to contain search bar and filter */
    var themeMode = document.createElement('div'); /*a clickable to change between dark mode and light ode for the document */
    var title = document.createElement('h2');
    var themeText = document.createElement('p');
    var darkModeImg = document.createElement('img');
    var whiteModeImg = document.createElement('img');
    darkModeImg.id = 'dark_mode_img';
    whiteModeImg.id = 'white_mode_img';
    header.id = 'header_id';
    title.id = 'title_id';
    header.classList.add('flow_layout_row');
    title.textContent = 'Where in the world?';
    themeText.textContent = 'Dark Mode';
    darkModeImg.src = './dark-mode.svg';
    whiteModeImg.src = './white-mode.svg';
    themeMode.addEventListener('click', function () {
        if (themeMode.contains(darkModeImg))
            themeMode.removeChild(darkModeImg);
        if (themeMode.contains(whiteModeImg))
            themeMode.removeChild(whiteModeImg);
        var body = document.body;
        themeText.textContent = themeText.textContent === 'Dark Mode'
            ? 'Light Mode' : 'Dark Mode';
        body.classList.toggle("dark-theme");
        themeMode.classList.toggle('theme_mode_light');
        if (themeText.textContent == 'Light Mode')
            themeMode.prepend(whiteModeImg);
        if (themeText.textContent == 'Dark Mode')
            themeMode.prepend(darkModeImg);
    });
    themeMode.id = 'theme_mode';
    themeMode.append(darkModeImg);
    themeMode.append(themeText);
    header.append(title);
    header.append(themeMode);
    return header;
}
exports.createHeader = createHeader;
//appending the elements to the page.
// function createPage() {
//     const content = document.getElementById('content');
//     content.append(createHeader());
//     //calling the page body using immediatly invoked functions
//     (async function renderCountries() {
//         const pageContent = await pageBody();
//         content.append(pageContent);
//     }())
// }
function createPage() {
    var content = document.getElementById('content');
    if (content) {
        content.append(createHeader());
        // Calling the page body using immediately invoked functions
        (function () {
            return __awaiter(this, void 0, void 0, function () {
                var pageContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, pageBody()];
                        case 1:
                            pageContent = _a.sent();
                            return [2 /*return*/, content.append(pageContent)];
                    }
                });
            });
        })();
    }
}
exports.createPage = createPage;
createPage();
