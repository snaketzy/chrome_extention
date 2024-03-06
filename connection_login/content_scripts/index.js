(
  () => {
    const div = document.createElement("div");
    div.className = "gather"

    // boss后台的dom好像只有body能响应event
    $("body").click((event) => {
      if ($(event.target).parents(".contact-copy").length > 0) {
        $(event.target).parents(".contact-copy").append(div)
        $(".gather").html("<button class='gather-btn'>采集数据</button> ")
        $(".gather-btn").click(() => {
          const params = {
            phone: $(".gather").parent().find("span.number").text(),
            age: $(".base-info-single-detial").children()[2].innerText.replaceAll("岁", ""),
            city: $(".position-content .job.value").text().split("·")[0].replace(" ", ""),
            job: $(".position-content .position-name").text().split("·")[0].replace(" ", ""),
            name: $(".name-box").text()
          }
          pushData(params);
          chrome.runtime.sendMessage({
            params
          }, res => {
            alert(res.name)
            alert(res.phone)
            alert(res.age)
            $(".gather").remove()
          })
        })
      }
    })
  }
)();

// 获取从popup传过来的登录数据
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.info)
  localStorage.setItem("ms_cid", request.info.ms_cid)
  localStorage.setItem("ms_member_token", request.info.ms_member_token)
  localStorage.setItem("supplierId", request.info.supplierId)
  localStorage.setItem("supplierName", request.info.supplierName)
  localStorage.setItem("operatorName", request.info.operatorName)
  
  fetchData()
  sendResponse('我收到了你的信息，popup~')
})

/**测试调用测试环境接口 */
const fetchData = async () => {
  const res = await fetch("https://prerecruit.viphrm.com/roster/weizhi/moa/company/list/%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90%E5%AE%A2%E6%88%B7", {
    method: "post"
  });
  const response = await res.json();

  return alert(response.data.records[0].name)
}

/** 测试数据入库 */
const pushData = async (params) => {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Bearer " + localStorage.getItem("ms_member_token"),
    "Mscid": localStorage.getItem("ms_cid")
  };
  debugger
  const res = await fetch("https://prehmc.viphrm.com/broker/weizhi/callcenter/publicSea/employee/save", {
    method: "post",
    headers: {
      ...headers
    },
    body: {
      positionId: "14001", // 期望岗位
      name: params.name, // 候选人姓名
      phone: params.phone, // 候选人手机
      employeeSource: "2", // 候选人来源
      cardCode: "", // 候选人身份证
      gender: "1", // 候选人性别
      age: params.age,  // 候选人年龄
      demandCity: "110000,110100", // 候选人期望工作地
      recruitChannel: "1", 
      supplierId: localStorage.getItem("supplierId"), // 当前登陆供应商id
      supplierName: localStorage.getItem("supplierName"), // 当前登陆供应商名称
      operatorName: localStorage.getItem("operatorName"), // 当前操作人
      tab: "1"
    }
  });
  const response = await res.json();

  return alert(response.data.records[0].name)
}