onmessage = function (e) {
  console.log("Worker: Message received from main script");
  const result = performHeavyCalculation();
  postMessage(result);
  console.log("Worker: Posting message back to main script");
};

function performHeavyCalculation() {
  let sum = 0;
  for (let i = 0; i < 10000000; i++) {
    sum += Math.sqrt(i) * Math.sqrt(i);
  }
  return sum;
}
