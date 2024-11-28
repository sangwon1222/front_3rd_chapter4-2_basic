onmessage = function (e) {
  console.log("Worker received:", e.data);
  const result = performHeavyCalculation();
  postMessage(result);
};

function performHeavyCalculation() {
  let sum = 0;
  for (let i = 0; i < 10000000; i++) {
    sum += Math.sqrt(i) * Math.sqrt(i);
  }
  return sum;
}
