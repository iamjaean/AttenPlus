let start_date = document.getElementById("start_date");
let end_date = document.getElementById("end_date");
let category = document.getElementById("category");
let submit = document.getElementById("create_submit");
const create_title = document.getElementById("create_title");
const create_introduce = document.getElementById("create_introduce");
const title_length = document.getElementById("title_length");
const introduce_length = document.getElementById("introduce_length");
//글자수 세기
create_title.addEventListener("keyup", (e) => {
  var content = create_title.value;
  if(content.length<=25)
    title_length.innerHTML = content.length + "/25";
})

create_introduce.addEventListener("keyup", (e) => {
  var content = create_introduce.value;
  if(content.length <= 100)
    introduce_length.innerHTML = content.length + "/100";
})

//날짜 선택
function getTodayDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}
const today = getTodayDate();
start_date.min = today;
end_date.min = today;
start_date.value = today;
end_date.value = today;

function date_check(){
  if(start_date.value > end_date.value){
      alert("시작일이 종료일보다 이릅니다. 날짜를 다시 선택해 주세요");
      start_date.value = today;
      return false;
  } 
  return true;
}

// 이미지 미리보기
document.getElementById("uploaded_file").onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("create_img").src = e.target.result;
    };

    reader.readAsDataURL(this.files[0]);
};
