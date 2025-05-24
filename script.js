let butt = document.querySelector(".tog");
let headd = document.querySelector("nav");
// let hh = document.querySelector(".hh");
let gg = document.querySelector("#coverimage")

console.log("cover:  "+gg.src)

butt.addEventListener("click", function(e) {
    headd.classList.toggle('check');
    // hh.classList.toggle('disap')
})


let texts = ["web developer", "designer", "gamer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentText = texts[index];
    let displayText = currentText.substring(0, charIndex);
    document.getElementById("writer").textContent = displayText;

    if (!isDeleting) {
        if (charIndex < currentText.length) {
            charIndex++;
        } else {
            isDeleting = true;
            setTimeout(typeEffect, 2000); // pause before deleting
            return;
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
        } else {
            isDeleting = false;
            index = (index + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100); // speed: typing vs deleting
}

typeEffect();


window.addEventListener("load", () => {
    const loader = document.querySelector(".all");
    loader.style.display = "none";
    
})


window.addEventListener('scroll', () => {
    const skills = document.querySelectorAll('.progress');
    skills.forEach(skill => {
    const rect = skill.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
        skill.style.width = skill.getAttribute('style').replace('width: 0', '');
    }
    });
});



////////////// projects //////////////

let all = document.querySelector("#all")
let python = document.querySelector("#python")
let html = document.querySelector("#css")
let js = document.querySelector("#js")
const buttons = document.querySelectorAll("button");

let showprojects = document.querySelector(".showprojects") 

function loadProjects(category) {
    showprojects.innerHTML = ""; // clear previous

    fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            let projectsToShow = [];

            if (category === "all") {
                projectsToShow = [...data.python, ...data.js];
            } else {
                projectsToShow = data[category];
            }

            projectsToShow.forEach(project => {
                let card = document.createElement("div");
                card.className = "card";
                
                let image = document.createElement("img");
                image.src = project.image;
                // image.className = "";

                let title = document.createElement("h2");
                title.textContent = project.title;

                let description = document.createElement("p");
                description.textContent = project.description;

                let link = document.createElement("a");
                link.href = project.link;
                link.textContent = "View Project";
                link.target = "_blank";

                card.appendChild(image);
                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(link);

                showprojects.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selected = button.id;
        loadProjects(selected);
    });
});


window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#all")?.classList.add("active"); 
    loadProjects("all");
});

