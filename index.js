 const loadLesson = () => { 
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
 }

 const displayLesson = (lessons) => {

    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // get into every lessons
    for(let lesson of lessons) { 

        console.log(lesson);
        // 3. create Element

        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
                <button href="" class="btn btn-outline btn-primary ">
                    <i class="fa-solid fa-book-open"></i> Learn ${lesson.level_no}
                    </button>
        `;
        // 4. append into container
        levelContainer.append(btnDiv);
    }
 };

 loadLesson();