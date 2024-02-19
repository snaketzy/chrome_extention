(
  () => {
    const div = document.createElement("div");
    div.className = "gather"
    $(".company-job-item").mouseenter((event) => {
      console.log("mouseenter company-job-item")
      event.currentTarget.append(div)
      $(".gather").html("<button class='gather-btn'>采集数据</button> ")
      
      $(".gather-btn").click(() => {
        const target = event.currentTarget;
        chrome.runtime.sendMessage({
          info: $(target).find(".salary")[0].innerText
        }, res => {
            alert(res)
        })
      })
    })
    $(".company-job-item").mouseleave(() => {
      console.log("mouseleave company-job-item")
      $(".company-job-item .gather").remove()
    })
  }
  
)();

