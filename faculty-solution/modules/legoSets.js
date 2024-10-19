const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map(setElement => {
        let themeName = themeData.find(themeElement => themeElement.id == setElement.theme_id)?.name;
        return { ...setElement, theme: themeName || "Unknown" };
      });
      resolve();
    } catch (error) {
      reject(`Error initializing Lego sets: ${error.message}`);
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    if (sets.length > 0) {
      resolve(sets);
    } else {
      reject("No Lego sets found");
    }
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    let foundSet = sets.find(s => s.set_num === setNum);
    
    if (foundSet) {
      resolve(foundSet);
    } else {
      reject(`Unable to find requested set: ${setNum}`);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    let foundSets = sets.filter(s => s.theme.toUpperCase().includes(theme.toUpperCase()));
    
    if (foundSets.length > 0) {
      resolve(foundSets);
    } else {
      reject(`Unable to find sets for the requested theme: ${theme}`);
    }
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
