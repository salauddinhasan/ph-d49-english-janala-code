const createElements = (arr) => {
    const htmlElement = arr.map((el) => `<span class='btn'>${el}</span>`);
    console.log(htmlElement.join(' '));
};

const Synonyms = ['hello', 'hi', 'who'];
createElements(Synonyms);