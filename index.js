 const createElements = (arr) => {
    const htmlElement = arr.map((el) => `<span class='btn'>${el}</span>`);
    return(htmlElement.join(' '));
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if(status == true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  } else {
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}
 
 
 const loadLesson = () => { 
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
 };

 const removeActive =()=> {
  const lessonButtons = document.querySelectorAll('.lesson-btn')
  lessonButtons.forEach((btn) => btn.classList.remove('active'));
 }

 const loadLevelWord = (id) => {
  manageSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add('active');
      displayLessonWord(data.data)
    });
    
 };


const loadWordDetail = async (id) => { 
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
   <div class="">
        <h2 class="text-2xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
        </h2>
      </div>
   <div class="">
        <h2 class=" font-bold"> Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class=" font-bold"> Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class=" font-bold">Synonym</h2>
        <div class=''>${createElements(word.synonyms)}</div>
      </div>
  `
  document.getElementById('word_modal').showModal();
}

 

 const displayLessonWord = (words) => {
    // 1. wordContainer
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';
    
    if(words.length == 0) { 
       wordContainer.innerHTML = `
       <div class="text-center col-span-3  rounded-xl py-10 space-y-3">
            <img class='items-center mx-auto' src="assets/alert-error.png" alt="">
            <p class="text-2xl font-semibold w-full">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-xl font-medium">নেক্সট Lesson এ যান</h2>
        </div>
       `;
       manageSpinner(false);
       return;
    }

    // 2 for of words
      words.forEach((word) => { 
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2">
            <h2 class="text-2xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}/ ${word.pronunciation ? word.pronunciation: 'pronunciation পাওয়া যায়নি'}"</div>
            <div class="flex justify-between items-center">
              <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1a91ff80]">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        `
        wordContainer.append(card);
      }) ;
      manageSpinner(false);
 };
       

    


 const displayLesson = (lessons) => {

    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // get into every lessons
    for(let lesson of lessons) { 

        console.log(lesson);
        // 3. create Element

        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
                <button id='lesson-btn-${lesson.level_no}' onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn">
                    <i class="fa-solid fa-book-open"></i> Learn ${lesson.level_no}
                    </button>
        `;
        // 4. append into container
        levelContainer.append(btnDiv);
    }
 };

 loadLesson(); 


 document.getElementById('btn-search').addEventListener('click', ()=> { 
  removeActive()
  const input = document.getElementById('input-search');
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch('https://openapi.programming-hero.com/api/words/all')
  .then((res) => res.json())
  .then((data) => {
    const allWords = data.data;
    console.log(allWords);
    const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue)
  );
  displayLessonWord(filterWords);
  })
 }) 