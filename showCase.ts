function mainFunction() {
  console.log("Start mainFunction")
  function levelOne() {
    console.log("Inside levelOne")
    function levelTwo() {
      console.log("Inside levelTwo")
      function levelThree() {
        console.log("Inside levelThree")
        function levelFour() {
          console.log("Inside levelFour")
          function levelFive() {
            console.log("Inside levelFive")
            function recursiveFunction(depth: number) {
              if (depth > 10) {
                console.log("Max recursion depth reached")
                return
              }
              console.log("Recursive call, depth:", depth)
              recursiveFunction(depth + 1)
            }
            recursiveFunction(1)
          }
          levelFive()
        }
        levelFour()
      }
      levelThree()
    }
    levelTwo()
  }

  function complexLoop() {
    console.log("Starting complexLoop")
    for (let i = 0; i < 5; i++) {
      console.log("Outer loop iteration:", i)
      for (let j = 0; j < 3; j++) {
        console.log("  Inner loop iteration:", j)
      }
    }
  }

  levelOne()
  complexLoop()
}

mainFunction()
