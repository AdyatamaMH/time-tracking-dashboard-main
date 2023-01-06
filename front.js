let currentTimeFrame = "weekly";
let globalData = [];

const updateData = () => {
    let data = {};

    fetch('./js/data.json')
        .then(resp => resp.json())
        .then(jsonData => {
            jsonData.forEach(element => {
                container.insertAdjacentHTML('end', 
                    createRegularCard(element, timeframe));
            });
            jsonData.forEach(element => {
                data[element.title] = element.timeframes;
            });
            regularCards = document.querySelectorAll('.regular-card');
        });
    }

const initilizePage = () => {
    updateData();
    updatePage(currentTimeFrame);
  
    Array.from(timeframes).forEach(function (button) {
      button.addEventListener("click", function () {
        updateDashboards(button.innerHTML.toLowerCase());
      });
    });
  };
  
  initilizePage();

const updatePage = (timeframe) => {
  const message = {
    'daily': "Yesterday",
    'weekly': "Last Week",
    'monthly': "Last Month",
  };

  let data = distillData(timeframe);

  data.forEach((category) => {
    document.getElementById(
      `${category.title.toLowerCase().replace(/ +/g, "")}-current`
    ).innerHTML = `${category.timeslot["current"]}hrs`;
    document.getElementById(
      `${category.title.toLowerCase().replace(/ +/g, "")}-previous`
    ).innerHTML = `${message[timeframe]} - ${category.timeslot["previous"]}hrs`;
    return;
  });
};

const updateDashboards = (timeframe) => {
    highlightTimeFrame(timeframe);
    updatePage(timeframe);
  };