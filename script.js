

const inputfrom = document.querySelector("#input-form");

const btn = document.querySelector("#btn");

const loadingscreen = document.querySelector(".loading-section");

const detailinfo = document.querySelector("#detail-info");

const audioContainer = document.querySelector(".audio");

const notfound = document.querySelector("#not-found");

const APIKey = "9d67faff-8f96-4065-bb1f-02109214d710"

btn.addEventListener("click", function(e){
    e.preventDefault();

    // jaise he humlog ko v word ka name search kar lete ha uske bd humlog koi aur word search kar ta ha to jo mera jo previous data ha wo remove ho jana chaiye

    audioContainer.innerHTML = '';
    notfound.innerText = ''
    detailinfo.innerText = ''

    const wordinput = inputfrom.value;

    if(wordinput === ''){
        alert("The input filed Cannot be empty");
        return;
    }

    fetchData(wordinput);

})


 async function fetchData(wordinput){

    loadingscreen.classList.toggle("hidden");

    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${wordinput}?key=${APIKey}`);


    const data = await response.json();

    if(!data.length){
        loadingscreen.classList.toggle("hidden");
        notfound.innerText = 'No result found';
        return;
    }

    // if the result is suggetions so for check that we have to check that the 0 index is a string if it is the string then it is a suggesstion but how we can comfurm that so if we enter the correct word we get object from the api and in data at 0 index we do not get string we get the object

    if(typeof data[0] === 'string'){

        loadingscreen.classList.toggle("hidden");
        let heading = document.createElement('h3');
        heading.style.textAlign = "center"
        heading.innerText = 'Did You mean?'

        // ya ho heading ha usko humlog not-found ko append kar denge
        notfound.append(heading);

        // and ya data ek array ha jisme humlog ka suggesstion ha to humlog ek kar ke loop lageye ga and insert kar ta jaye ga suggestion ko
        data.forEach(element=>{

            // humlog sub se phele ek span create kare ge
            const spanelement = document.createElement("span");

            


            // ab humlog ko style v add kar na ha to humlog class add kar ge suggestion ka style wala
            spanelement.classList.add('suggestionstyle');

            // spanelement.style.textAlign= "center"

            // ab humlog ya span text insert kare ge span ka under
            spanelement.innerText = element;

            // ab humlog ya span ko insert kar denge notfound ka section ka under
            notfound.append(spanelement);
        })

        return;
    }


    // if we get the data correctly means the user has enter a correct english word then we call the fucntion updatesection this function will update the content 
    updateSection(data);
}


function updateSection(data){
    loadingscreen.classList.toggle("hidden");
    let difination = data[0].shortdef[0];

    const soundname = data[0].hwi.prs[0].sound.audio;

    if(soundname){
        renderSound(soundname);
    }

    // console.log(difination);

    // after getting the defination of the word we will insert the meaning inside the  detail-info section

    detailinfo.innerText = difination;

}

function renderSound(soundName){
    // https://media.merriam-webster.com/soundc11

    // humlog ko ya first letter dega mera jo string ka ha
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${APIKey}`;

    // sub se phele humlog ko ek audio tag create kar na ho ga jo mera html me present hai
    let aud = document.createElement("audio");

// uske bd humlog audio tag hai uska humlog src set kar diye
    aud.src = soundSrc;

    // aud.controls true kar na ka mtlub ha ke humlog chate ha ke mera jo control ha audio tag ka usko enable kar na chate ha 
    aud.controls = true;

    audioContainer.appendChild(aud);

}