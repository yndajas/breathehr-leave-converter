// ==UserScript==
// @name         BreatheHR leave calculator: hours and minutes to days
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Show an estimation of available leave in days when it's calculated in hours
// @author       yndajas (they)
// @license      MIT
// @match        https://hr.breathehr.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=breathehr.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const calculateDays = () => {
    return hours / dailyHours;
  };

  const updateDailyHoursValue = (newDailyHours) => {
    console.log("updateDailyHoursValue", newDailyHours);
    dailyHours = parseFloat(newDailyHours, 10);
    days = calculateDays();
    updateDaysValue();
  };

  const updateDaysValue = () => {
    daysElement.innerText = `~${days.toFixed(2)} days`;
  };

  const leaveMetricElementSelector =
    "#tab-my-dashboard > div > div:nth-child(1) > div.card-body > div.big-metric";

  const timeElement = document.querySelector(
    `${leaveMetricElementSelector} > strong`
  );
  const hoursAndMinutes = timeElement.innerText
    .split(" ")
    .map((time) => time.substring(0, time.length - 1));
  const hours = parseFloat(hoursAndMinutes[0], 10) + (hoursAndMinutes[1] ? hoursAndMinutes[1] / 60 : 0);

  let dailyHours = 7.75;
  let days = calculateDays();

  const leaveMetricElement = document.querySelector(leaveMetricElementSelector);

  const arrowElement = document.createElement("span");
  arrowElement.classList.add("metric-subheading");
  arrowElement.innerText = "↓";
  arrowElement.style.margin = "0.5rem 0";

  const daysElement = document.createElement("span");
  daysElement.classList.add("metric-subheading");
  updateDaysValue();

  const dailyHoursInputWrapper = document.createElement("div");
  dailyHoursInputWrapper.style.display = "flex";
  dailyHoursInputWrapper.style.justifyContent = "center";

  const dailyHoursInputLabel = document.createElement("label");
  dailyHoursInputLabel.classList.add("metric-subheading");
  dailyHoursInputLabel.for = "dailyHours";
  dailyHoursInputLabel.innerText = "Hours per day:";
  dailyHoursInputLabel.style.marginBottom = "0";
  dailyHoursInputLabel.style.marginRight = "0.5rem";

  const dailyHoursInput = document.createElement("input");
  dailyHoursInput.classList.add("metric-subheading");
  dailyHoursInput.name = "dailyHours";
  dailyHoursInput.style.width = "3rem";
  dailyHoursInput.value = dailyHours;
  dailyHoursInput.addEventListener("keyup", (e) => {
    const newDailyHours = e.target.value;
    console.log("e.target.value:", newDailyHours);
    updateDailyHoursValue(newDailyHours);
  });

  dailyHoursInputWrapper.append(dailyHoursInputLabel, dailyHoursInput);

  leaveMetricElement.append(arrowElement, daysElement, dailyHoursInputWrapper);
})();
