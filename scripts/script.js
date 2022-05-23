"use strict";

// SELECTING ALL DOM ELEMENTS

const searchBarEl = document.querySelector("#search-bar");
const removeIconEl = document.querySelectorAll(".remove-icon");
const clearBtnEl = document.querySelector(".clear");
const containerEl = document.querySelector(".container");
const searchesContainerEl = document.querySelector(".searches-container");

//  FUNCTIONS TO FETCH AND RENDER DATA
const publishRightInfo = function (singleObject) {
  // selecting right info element
  const rightInfoEl = document.querySelector(`[data-right-${singleObject.id}]`);

  // storing & inserting all languages
  const lang = singleObject.languages;
  lang.forEach(function (language) {
    const langHTML = `<span class="languages">${language}</span>`;
    rightInfoEl.insertAdjacentHTML("beforeend", langHTML);
  });

  // storing & inserting all tools
  const tools = singleObject.tools;
  tools.forEach(function (tool) {
    const toolHTML = `<span class="tools">${tool}</span>`;
    rightInfoEl.insertAdjacentHTML("beforeend", toolHTML);
  });
};

// FUNCTION TO RENDER ALL DATA TO HTML

const publishInfo = function (singleObject) {
  //
  const individualJobHTML = `<div class="job-list">
        <div class="jobs ${singleObject.featured ? "job-border-left" : ""}">
          <div class="logo">
          <img src="${singleObject.logo}" alt="company logo" />
          </div>
          <div class="all-info">
            <div class="left-info">
              <div class="first-row row">
                <span class="company-name">${singleObject.company}</span>
                <span class="new ${singleObject.new ? "show" : "hidden"}">${
    singleObject.new ? "new!" : ""
  }</span>
                <span class="feature ${
                  singleObject.featured ? "show" : "hidden"
                }">${singleObject.featured ? "featured!" : ""}</span>
              </div>
              <div class="second-row row">
                <a href="#" class="position">${singleObject.position}</a>
              </div>
              <div class="third-row row">
                <span class="time-posted">${
                  singleObject.postedAt
                }</span> &#x2022;
                <span class="job-type">${singleObject.contract}</span> &#x2022;
                <span class="where">${singleObject.location}</span>
              </div>
            </div>
            <div class="right-info" data-right-${singleObject.id}>
              <span class="role">${singleObject.role}</span>
              <span class="level">${singleObject.level}</span>
            </div>
          </div>
        </div>
      </div>`;

  // inserting created HTML to the container
  containerEl.insertAdjacentHTML("beforeend", individualJobHTML);

  publishRightInfo(singleObject);
};

const iterateJSONArray = function (infoArray) {
  // iterating json array and sending objects from it
  infoArray.forEach(function (infoObject) {
    publishInfo(infoObject);
  });
};

const getJsonData = async function () {
  //   const getData = await (await fetch("scripts/data.json")).json();
  const getData = await fetch("scripts/data.json");
  const storeData = await getData.json();
  iterateJSONArray(storeData);
};

getJsonData();

/////////////////////////////////////////////////////////////////////////

// function to render selected tags

// storing selected tags in set
let selectedTagsArray = [];

const addElementInSearchBar = function (toBeInserted) {

  console.log(toBeInserted);
  // removing hidden class from search-bar in atleast one tag is selected
  if (selectedTagsArray.length > 0) {
    searchBarEl.classList.remove("hidden");
    searchBarEl.classList.add("show");
  } else {
    searchBarEl.classList.remove("show");
    searchBarEl.classList.add("hidden");
  }

  // adding element in search-bar element

  const addSearchesHTML = `<span class="searches"
          ><p>${toBeInserted}</p>
          <span class="remove-btn">
            <img
              src="images/icon-remove.svg"
              alt="remove icon"
              class="remove-icon" /></span
        ></span>`;

  searchesContainerEl.insertAdjacentHTML('beforeend',addSearchesHTML);      

  return;
};

const storeSelectedTagsArray = function (receiveTag) {

  // guard condition -> if already selected then preventing it from getting selected again
  if (selectedTagsArray.find((item) => item === receiveTag)) return;
  
  // storing clicked tag's
  selectedTagsArray.push(receiveTag);
  console.log(selectedTagsArray);

  // changing search bar class
  addElementInSearchBar(receiveTag);
};

// EVENTLISTENER ON CONTAINER ELEMENT

containerEl.addEventListener("click", function (res) {
  res.preventDefault();

  //    guard condition -> only allows eventlistener on right tags
  if (
    !res.target.classList.contains("role") &&
    !res.target.classList.contains("languages") &&
    !res.target.classList.contains("level") &&
    !res.target.classList.contains("tools")
  )
    return;

  // sending selected tag's content
  storeSelectedTagsArray(res.target.textContent);
});
