(
  () => {
    $(".logintitle").mouseenter(() => {
      console.log("mouseenter")
      const div = document.createElement("div");
      div.className = "gather"
      $(".logintitle").append(div)
      $(".gather").html("<button class='btn'>采集数据</button> ")
    })
    $(".logintitle").mouseleave(() => {
      console.log("mouseleave")
      // $(".gather").remove();
    })
  }
)();