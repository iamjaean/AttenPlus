// 챌린지 상태를 결정하기 위해 쓰는 날자 처리 함수
exports.processDates = function (startdate, enddate) {
  const today = Date.now();

  //startdate 와 enddate의 형태를 Date 형식으로 변경
  const [startYear, startMonth, startDay] = startdate.split("-");
  startTime = new Date(
    Number(startYear),
    Number(startMonth - 1),
    Number(startDay)
  ).valueOf();

  const [endYear, endMonth, endDay] = enddate.split("-");
  endTime = new Date(
    Number(endYear),
    Number(endMonth) - 1,
    Number(endDay) + 1
  ).valueOf();

  // 조건에 따른 챌린지 상태 설정
  let condition = "";
  let value = 1;
  if (today < startTime) {
    condition = "모집중";
    value = 1;
  } else if (today > endTime) {
    condition = "종료";
    value = 3;
  } else {
    condition = "진행중";
    value = 2;
  }

  return { condition, value };
};
