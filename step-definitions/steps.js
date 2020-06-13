import { Given, Then, When } from 'cucumber';
import { client } from 'nightwatch-api';
let chai = require('chai');
const selectorData = require('./selector.js')
const testData = require('./test-data.js')
var expect = chai.expect;

Given(/^I am on the Gist page$/, async () => {
  await client
  .url('https://gist.github.com/')
  .waitForElementVisible('body', 1000);
});

Then(/^the title is "(.*?)"$/, async (data) => {
  await client.assert.title(testData[data]);
});

When(/^I choose "([^"]*)" from dropdown "([^"]*)"$/, async (categoryName, categoryIcon) => {
  // var categoryNamePage = categoryName+'_title'
  await client
  .moveToElement(selectorData[categoryIcon], 10, 10)
  .click(selectorData[categoryIcon])
  .useXpath()
  .click(selectorData[categoryName])
  .useCss()
  .waitForElementPresent(selectorData.page_title);
});

When(/^I click "([^"]*)" button$/, async (data) => {
  await client
  .click(selectorData[data])
  .pause(1000);
});

Then(/^the "([^"]*)" page exists$/, async (data) => {
  await client
  .pause(2000)
  .waitForElementVisible('body', 1000)
  .waitForElementPresent(selectorData.page_title)
  .getText(selectorData.page_title, function(result) {
    expect(result.value).to.equal(testData[data]);
    console.log("Result -> "+result.value);
  });
});

When(/^I scroll down to "([^"]*)"$/, async (data) => {
  await client
  .moveToElement(selectorData[data], 10, 10)
  .pause(2000);
});

When(/^I choose the "([^"]*)" from "([^"]*)" filter$/, async(filterData, filterType) => {
  await client
  .moveToElement(selectorData[filterType], 10, 10)
  .click(selectorData[filterType])
  .click(selectorData[filterData]);
});

When(/^I set the range price from "([^"]*)" to "([^"]*)" filter$/, async(min_price, max_price) => {
 await client
 .setValue(selectorData.min_price_input, min_price)
 .setValue(selectorData.max_price_input, max_price)
});

When(/^the filtered product will appear$/, async() => {
  await client
  .elements('css selector', selectorData.filtered_product_1, function(result) {
    console.log(result.value)
  });
});

When(/^I set text "([^"]*)" in the "([^"]*)" field$/, async(data, fieldElement) => {
  await client
  // .setValue(selectorData[fieldElement], testData[data]);
  .setValue(selectorData[fieldElement], data);

});

When(/^I select dropdown "([^"]*)" from dropdown "([^"]*)"$/, async(dropdownValue, dropdownButton) => {
  await client
  .pause(2000)
  .click(selectorData[dropdownButton])
  .keys(testData[dropdownValue])
  // .elements('css selector', 'option', function(elements) {
  //   client.elementIdClick(elements.value[11].ELEMENT); //can use any index here as long as you know which one you are looking for
  // });
  // .click('select[id="gh-cat"] option[value="58058"]')

  ;
});

Then(/^I verify the page has finished loading$/, async() => {
  var exitCode
  await client
  .execute("return document.readyState;", function(result) {
    if (result.value === "complete") {
      console.log(result.value)
      console.log('Page Is Completely Loaded !')
    } else if (result.value === "interactive") {
      throw Error('Page Is Not Completely Loaded !')
    } else {
      throw Error('Page Is Not Loaded !')
    }
    });
});

Then(/^the product contains "([^"]*)" will appear$/, async(data) => {
  await client
  .pause(3000)
  .getText(selectorData.first_product_after_search, function(result) {
    expect(result.value.toLowerCase()).to.contains(testData[data].toLowerCase());
    console.log("Result -> "+result.value.toLowerCase());
  });
});

Then(/^the element "([^"]*)" is exist$/, async(data) => {
  await client
  .pause(3000)
  .elements('css selector', selectorData[data], function(result) {
    console.log(result.value)
  });
});

When(/^I wait for "([^"]*)" second$/, async(data) => {
  await client
  .pause(data*1000);
});


Then(/^My gist has been created with the "([^"]*)" name$/, async(data) => {
 await client
 .pause(3000)
 .getText(selectorData.file_name_after_created, function(result) {
  expect(result.value).to.equal(testData[data]);
  console.log("Result -> "+result.value);
});
});

Then(/^I can see my gists list$/, async() => {
  await client
  .pause(3000)
  .elements('css selector', selectorData.first_list, function(result) {
    console.log(result.value)
  });
});

Then(/^I click OK in alert modal$/, async() =>  {
  await client
  .pause(3000)
  .acceptAlert();
});

When(/^I click in "([^"]*)" button$/, async (data) => {
  await client
  .click(selectorData[data])
  .moveToElement('.selectorData[data]', 0, 0)
  .mouseButtonClick(0)
  .pause(1000);
});



