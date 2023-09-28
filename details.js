"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageDetails = void 0;
var index_ts_1 = require("./index.ts");
function createPageElements(countryFlagArg, countryFlagAltArg, countryNameArgs, countryPopulationArgs, countryRegionArgs, countryCapitalArgs, countrySubRegionArgs, countryTldArgs, countryCurrencyArgs, countryLanguageArgs) {
    var pageContainer = document.createElement('div');
    var backButtonWrapper = document.createElement('div');
    var contentWrapper = document.createElement('div');
    var details = document.createElement('div');
    var backButton = document.createElement('button');
    var flagWrpper = document.createElement('div');
    var flag = document.createElement('img');
    var backArrowBlack = document.createElement('img');
    var backArrowWhite = document.createElement('img');
    pageContainer.classList.add('flow_layout_column');
    contentWrapper.classList.add('flow_layout_row');
    details.id = 'details';
    contentWrapper.id = 'content_wrapper';
    backButtonWrapper.id = 'back_button_wrapper';
    backButton.id = 'back_button';
    backButton.textContent = 'Back';
    flag.src = countryFlagArg;
    flag.alt = countryFlagAltArg;
    flag.id = 'details_flag';
    backArrowBlack.src = './back-black.svg';
    backArrowWhite.src = './back-white.svg';
    flagWrpper.append(flag);
    details.append(countryNameArgs, countryPopulationArgs, countryRegionArgs, countrySubRegionArgs, countryCapitalArgs, countryTldArgs, countryCurrencyArgs, countryLanguageArgs);
    backButton.prepend(backArrowBlack);
    backButtonWrapper.append(backButton);
    contentWrapper.append(flagWrpper);
    contentWrapper.append(details);
    // JAvaScript version
    // backButton.addEventListener('click', function () {
    //     const content = document.getElementById('content');
    //     content.textContent = '';
    //     createHeader()
    //     createPage()
    // })
    var backButtonEl = document.getElementById('backButton');
    if (backButtonEl) {
        backButton.addEventListener('click', function () {
            var content = document.getElementById('content');
            if (content) {
                content.textContent = '';
                (0, index_ts_1.createHeader)();
                (0, index_ts_1.createPage)();
            }
        });
    }
    pageContainer.append(backButtonWrapper);
    pageContainer.append(contentWrapper);
    return pageContainer;
}
function createPageDetails(countryDetailsTransfer) {
    var countryFlag = countryDetailsTransfer.countryFlag;
    var countryFlagArg = countryDetailsTransfer.countryFlagAlt;
    var countryName = countryDetailsTransfer.countryNameEl;
    var countryPopulation = countryDetailsTransfer.population;
    var countryRegion = countryDetailsTransfer.region;
    var countryCapital = countryDetailsTransfer.capital;
    var countrySubRegion = countryDetailsTransfer.subRegion;
    var countryLanguage = countryDetailsTransfer.language;
    var countryTld = countryDetailsTransfer.tld;
    var countryCurrency = countryDetailsTransfer.currency;
    var content = document.getElementById('content');
    // content.textContent = '';
    // content.append(createHeader());
    // content.append(countryDetailsTransfer.countryNameEl);
    if (content !== null) {
        content.textContent = '';
        content.append((0, index_ts_1.createHeader)());
        content.append(countryDetailsTransfer.countryNameEl);
        //   content.append(createPageElements(countryFlag));
        content.append(createPageElements(countryFlag, countryFlagArg, countryName, countryPopulation, countryRegion, countryCapital, countrySubRegion, countryTld, countryCurrency, countryLanguage));
    }
}
exports.createPageDetails = createPageDetails;
