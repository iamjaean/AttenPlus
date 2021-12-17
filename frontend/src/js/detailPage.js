const detailPostCategory = document.querySelector(".postCategory");
const detailCalendar = document.querySelector(".calendar");

detailCalendar.flatpickr({
  onDayCreate: function (dObj, dStr, fp, dayElem) {
    if (Math.random() < 0.15) console.log(dayElem), (dayElem.innerHTML += "<span class='attend'></span>");
    else if (Math.random() > 0.85) dayElem.innerHTML += "<span class='absent'></span>";
  },
  inline: true,
});

fetch("../../public/data/mockData.json")
  .then((response) => response.json())
  .then((data) => {
    //filter로 찾아야함
    detailPostCategory.innerHTML = `<div>${data[5].category}<div/>`;
    console.log(data);
  });
