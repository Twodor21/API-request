const getData = async () => {
  const responsesArray = [];
  const responses = Promise.all([
    await fetch(`https://meowfacts.herokuapp.com/?id=1`),
    await fetch(`https://meowfacts.herokuapp.com/?id=2`),
    await fetch(`https://meowfacts.herokuapp.com/?id=3`),
  ]).then((responsePromises) =>
    Promise.all(responsePromises.map((res) => res.json()))
  );
  const parsedResponses = await responses;
  for (let response of parsedResponses) {
    responsesArray.push(response.data[0]);
  }
  return responsesArray;
};

const showData = async function () {
  const container = document.querySelector(".container");

  function createElement(element, innerText) {
    if (!innerText) {
      innerText = "";
    }
    const documentElement = document.createElement(`${element}`);
    documentElement.innerHTML = innerText;

    return documentElement;
  }

  function addElement(input, count) {
    if (!count) {
      count = "";
    }
    const x = `Meow Quote ${count}`;
    const divElement = createElement("div");
    const description = createElement("p", x);
    const receivedInput = createElement("p", input);
    divElement.appendChild(description);
    divElement.appendChild(receivedInput);

    divElement.classList.add("item");

    container.appendChild(divElement);
  }

  try {
    const outputDataArray = await getData();
    for (let i = 0; i < outputDataArray.length; i++) {
      addElement(outputDataArray[i], i + 1);
    }
  } catch (err) {
    console.log(err);
  }
};

showData();
