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
//Dark or light theme
var darkMode = document.getElementById('theme_mode');
var imgElement = darkMode === null || darkMode === void 0 ? void 0 : darkMode.querySelector("img");
darkMode === null || darkMode === void 0 ? void 0 : darkMode.addEventListener('click', function () {
    var body = document.body;
    // const searchBar = document.getElementById('search_input');
    // const region = document.getElementById('region-select'); 
    // searchBar?.classList.toggle('theme');
    // region?.classList.toggle('theme');
    // Get the parent element with id "search-elements"
    var searchElements = document.getElementById('search-elements');
    if (searchElements) {
        // Get all the children elements of the parent
        var children = searchElements.children;
        // Loop through the children and add the class "theme" to each
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            child.classList.add('theme');
        }
    }
    darkMode.textContent = darkMode.textContent === "Dark Mode"
        ? "Light Mode" : "Dark Mode";
    body.classList.toggle("dark-theme");
    if (darkMode.textContent == 'Light Mode') {
        imgElement.src = './white-mode.svg';
        darkMode.prepend(imgElement);
        darkMode.classList.add('theme_mode_light');
    }
    if (darkMode.textContent == 'Dark Mode') {
        imgElement.src = './dark-mode.svg';
        darkMode.prepend(imgElement);
        darkMode.classList.remove('theme_mode_light');
    }
});
// Function to fetch data from the API
function fetchAllCountryData() {
    return __awaiter(this, void 0, void 0, function () {
        var loadingScreen, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'block';
                    }
                    return [4 /*yield*/, fetch('https://restcountries.com/v3.1/all')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Network response was not ok: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    // Hide the loading screen
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                    }
                    return [2 /*return*/, processData(data)];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching country data:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to process the raw data into an array of Country objects
function processData(data) {
    return data.map(function (obj) {
        var countryFlag = obj.flags.png;
        var countryFlagAlt = obj.flags.alt;
        var countryName = obj.name.common;
        var countryPopulation = obj.population;
        var countryRegion = obj.region;
        var countryCapital = obj.capital && (obj.capital[0] || obj.capital[1]);
        var countrySubRegion = obj.subregion;
        var countryTopLevelDomain = obj.tld && (obj.tld[0] || obj.tld[0]);
        var countryCurrency = obj.currencies ? obj.currencies[Object.keys(obj.currencies)[0]].name : 'NO CURRENCY AVAILABLE IN API';
        var countryLanguage = obj.languages
            ? obj.languages[Object.keys(obj.languages)[0]]
            : 'No LANGUAGE AVAILABLE';
        var countryBorder = obj.borders;
        return {
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
            countryBorder: countryBorder,
        };
    });
}
// Function to fetch data by Region from the API
function fetchCountriesByRegion(region) {
    return __awaiter(this, void 0, void 0, function () {
        var loadingScreen, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'block';
                    }
                    return [4 /*yield*/, fetch("https://restcountries.com/v3.1/region/".concat(region))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Network response was not ok: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    // Hide the loading screen
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                    }
                    return [2 /*return*/, processData(data)];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error fetching country data by region:', error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to create a country element
function createCountryElement(country) {
    var countryElement = document.createElement('div');
    countryElement.innerHTML = "\n  <div id='country'>\n    <div id=\"country_image\">\n      <img src=\"".concat(country.countryFlag, "\" alt=\"").concat(country.countryFlagAlt, "\">\n    </div>\n    <div id=\"country_details\">\n      <h1 class=\"country_name\">").concat(country.countryName, "</h1>\n      <p class=\"population\"><b>Population:</b> ").concat(country.countryPopulation, "</p>\n      <p class=\"region\"><b>Region:</b> ").concat(country.countryRegion, "</p>\n      <p class=\"capital\"><b>Capital:</b> ").concat(country.countryCapital, "</p>\n    </div>\n  </div>\n    ");
    // Add a click event listener to the country element
    countryElement.addEventListener('click', function () {
        var countryName = country.countryName;
        fetchCountryDataByName(countryName);
    });
    return countryElement;
}
// Function to create filter element
function createFilterElement() {
    var filtersWrapper = document.createElement('div');
    filtersWrapper.id = 'search-elements';
    ;
    var filters = "\n          <div class=\"search-elements\">\n                <div class=\"search-container\">\n                    <div id=\"search_bar\">\n                            <img src=\"./search-thin.svg\" alt=\"search.svg\" id=\"search_img\"> <input type=\"text\" class=\"search-input\" id=\"search_input\" placeholder=\"Search...\">\n                    </div>\n                </div>\n            \n                <div id=\"filter\">\n                        <select id='region-select'>\n                            <option value=\"africa\">Africa</option>\n                            <option value=\"americas\">Americas</option>\n                            <option value=\"oceania\">Oceania</option>\n                            <option value=\"europe\">Europe</option>\n                            <option value=\"asia\">Asia</option>\n                        </select>\n                </div>\n            </div>";
    filtersWrapper.innerHTML = filters;
    var searchInput = filtersWrapper.querySelector('#search_input');
    var regionSelect = filtersWrapper.querySelector('#region-select');
    searchInput.addEventListener('keydown', function (event) {
        var searchInput = event.target;
        var searchQuery = searchInput.value.trim().toLowerCase();
        if (event.key === 'Enter') {
            handleSearchInput(searchQuery);
        }
    });
    // // Add the event listener once the DOM is loaded
    regionSelect.addEventListener('change', function () {
        var selectedRegion = regionSelect.value;
        handleRegionSelection(selectedRegion);
    });
    return filtersWrapper;
}
// Display All Countries
function displayCountries() {
    return __awaiter(this, void 0, void 0, function () {
        var docContent, countriesWrapper, filterElements, countryData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    docContent = document.getElementById('content');
                    countriesWrapper = document.createElement('div');
                    countriesWrapper.id = 'all-countries';
                    try {
                        filterElements = createFilterElement();
                        docContent === null || docContent === void 0 ? void 0 : docContent.append(filterElements);
                    }
                    catch (_b) {
                        console.error('obinnkererenke filter');
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchAllCountryData()];
                case 2:
                    countryData = _a.sent();
                    countryData.forEach(function (country) {
                        var countryElement = createCountryElement(country);
                        countriesWrapper.appendChild(countryElement);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('An error occurred while fetching country data:', error_3);
                    return [3 /*break*/, 4];
                case 4:
                    docContent === null || docContent === void 0 ? void 0 : docContent.append(countriesWrapper);
                    return [2 /*return*/];
            }
        });
    });
}
displayCountries();
function handleSearchInput(countryName) {
    fetchCountryDataByName(countryName);
}
function handleRegionSelection(regionName) {
    return __awaiter(this, void 0, void 0, function () {
        var countriesWrapper, countryDataByRegion, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    countriesWrapper = document.getElementById('all-countries');
                    if (!countriesWrapper) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchCountriesByRegion(regionName)];
                case 2:
                    countryDataByRegion = _b.sent();
                    // Clear the current content
                    countriesWrapper.innerHTML = '';
                    countryDataByRegion.forEach(function (country) {
                        var countryElement = createCountryElement(country);
                        // Append the country element to the wrapper
                        countriesWrapper.appendChild(countryElement);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    console.log('An error occurred in handleRegionSelection function');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to fetch data by name from the API
function fetchCountryDataByName(countryName) {
    return __awaiter(this, void 0, void 0, function () {
        var loadingScreen, response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'block';
                    }
                    return [4 /*yield*/, fetch("https://restcountries.com/v3.1/name/".concat(countryName))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Network response was not ok: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    // Hide the loading screen
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                    }
                    return [2 /*return*/, processDataByName(data)];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error fetching country data:', error_4);
                    throw error_4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to process the raw data by Name
function processDataByName(data) {
    var countryName = data[0].name.common;
    var countryFlag = data[0].flags.png;
    var countryFlagAlt = data[0].flags.alt;
    var countryPopulation = data[0].population;
    var countryRegion = data[0].region;
    var countrySubRegion = data[0].subregion;
    var countryCapital = data[0].capital[0];
    var countryTld = data[0].tld[0];
    var countryLanguages = data[0].languages;
    var firstLanguage = countryLanguages ? Object.values(countryLanguages)[0] : 'No LANGUAGE AVAILABLE';
    var countryCurrency = data[0].currencies[Object.keys(data[0].currencies)[0]].name;
    var countryBorders = data[0].borders;
    displayCountriesByName(countryName, countryFlag, countryFlagAlt, countryPopulation, countryRegion, countrySubRegion, countryCapital, countryTld, countryCurrency, firstLanguage, countryBorders);
}
// Display Countriy by name
function displayCountriesByName(countryName, countryFlag, countryFlagAlt, countryPopulation, countryRegion, countrySubRegion, countryCapital, countryTld, countryCurrency, firstLanguage, countryBorders) {
    var docContent = document.getElementById('content');
    docContent.innerHTML = '';
    var countryDetails = "\n     <div id=\"full_country_display\">\n     <button id='backbtn'><b>Back</b> </button>\n     \n        <div id=\"flag-and-details\">\n            <div id=\"image\">\n                <img src=\"".concat(countryFlag, "\" alt=\"").concat(countryFlagAlt, "\">\n            </div>\n            <div class=\"details\">\n                <h1>").concat(countryName, "</h1>\n                <p><b>Population:</b> ").concat(countryPopulation, "</p>\n                <p><b>Region:</b> ").concat(countryRegion, "</p>\n                <p><b>Sub Region:</b> ").concat(countrySubRegion, "</p>\n                <p><b>Capital:</b> ").concat(countryCapital, "</p>\n                <p><b>Top Level Domain:</b> ").concat(countryTld, "</p>\n                <p><b>Currency:</b> ").concat(countryCurrency, "</p>\n                <p><b>Language:</b> ").concat(firstLanguage, "</p>\n            </div>\n        </div>\n        \n        <div id=\"borders\">\n            <h1>Border Countries</h1>\n            <div id=\"border-elements\">\n                ").concat(countryBorders && countryBorders.length > 0
        ? "<ul>".concat(countryBorders.map(function (border) { return "<li>".concat(border, "</li>"); }).join(''), "</ul>")
        : 'No bordering countries', "\n            </div>\n        </div>\n    </div>\n  ");
    docContent.innerHTML = countryDetails;
    var backbtn = document.getElementById('backbtn');
    backbtn === null || backbtn === void 0 ? void 0 : backbtn.addEventListener('click', function () {
        var docContent = document.getElementById('content');
        docContent.innerHTML = '';
        displayCountries();
    });
}
