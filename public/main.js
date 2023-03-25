// Functions to show and remove "Loading..."
function showLoading() {
  document.querySelector(".loading").classList.add("show-loading");
}

function removeLoading() {
  document.querySelector(".loading").classList.remove("show-loading");
}

// Function to calculate complexity of given algorithm
async function requestComplexityCalculation(algorithmName) {
  try {
    showLoading();

    const response = await fetch("/openai/calculatecomplexity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ algorithmName }),
    });

    if (!response.ok) {
      removeLoading();
      throw new Error("Complexity cannot be calculated");
    }

    const dataObject = await response.json();

    const answer = dataObject.data;

    document.querySelector("#answer").textContent = answer;

    removeLoading();
  } catch (error) {
    document.querySelector(".loading").textContent = "Error: " + error.message;
  }
}

// Function for submitting form
function onSubmit(e) {
  e.preventDefault();

  document.querySelector("#answer").textContent = "";

  const algorithmName = document.querySelector("#algorithm").value;

  if (algorithmName === "") {
    alert("Please enter some text");
    return;
  }

  requestComplexityCalculation(algorithmName);
}

document.querySelector("#form").addEventListener("submit", onSubmit);
