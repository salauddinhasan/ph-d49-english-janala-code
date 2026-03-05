 const loadLesson = () => { 
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
 };


 const loadLevelWord = (id) => {
    const url = ` https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessonWord(data.data));
    
 };

 const displayLessonWord = (words) => {
    // 1. wordContainer
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    // 2 for of words
      words.forEach((word) => { 
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium">"${word.meaning}/ ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        `
        wordContainer.append(card);
      }) ;
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
                <button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary ">
                    <i class="fa-solid fa-book-open"></i> Learn ${lesson.level_no}
                    </button>
        `;
        // 4. append into container
        levelContainer.append(btnDiv);
    }
 };

 loadLesson();