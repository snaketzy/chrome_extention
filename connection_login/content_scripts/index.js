(
  () => {
    const div = document.createElement("div");
    div.className = "gather"
    $(".contact-copy").mouseenter((event) => {
      console.log("mouseenter contact-copy")
      event.currentTarget.append(div)
      $(".gather").html("<button class='gather-btn'>采集数据</button> ")
      
      
    })
    $(".contact-copy").mouseleave(() => {
      console.log("mouseleave contact-copy")
      $(".contact-copy .gather").remove()
    })
    $("body").click((event) => {
      if($(event.target).parents(".contact-copy").length > 0) {
        $(event.target).parents(".contact-copy").append(div)
        $(".gather").html("<button class='gather-btn'>采集数据</button> ")
        $(".gather-btn").click(() => {
          chrome.runtime.sendMessage({
            phone: $(".gather").parent().find("span.number").text(),
            age:$(".base-info-single-detial").children()[2].innerText.replaceAll("岁",""),
            city: $(".position-content .job.value").text().split("·")[0].replace(" ",""),
            job: $(".position-content .position-name").text().split("·")[0].replace(" ",""),
            name: $(".name-box").text()
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

