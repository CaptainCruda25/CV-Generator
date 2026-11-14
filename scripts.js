// CV FORM
let fullname = document.getElementById('input-fullname');
let address = document.getElementById('input-address');
let p_number = document.getElementById('input-number');
let email = document.getElementById('input-email');
let linkedinLink = document.getElementById('input-linkedin-link');
let githubLink = document.getElementById('input-github-link');
let role = document.getElementById('input-role');
let summary = document.getElementById('input-summary');
let addSkillsBtn = document.getElementById('btn-add-categories');
let addSkillsLabel = document.querySelector('.skills-title');
// Professional Experience
let jobTitle0 = document.getElementById('input-job-title-0');
let jobCompany0 = document.getElementById('input-job-company-0');
let jobDate0 = document.getElementById('input-job-date-0');
let jobBulletPoint = document.getElementById('input-job-bullets-0');
let addJobExpBtn = document.getElementById('btn-add-job-exp');
// Technical Experience
let projectTitle0 = document.getElementById('input-proj-title-0');
let projectRole0 = document.getElementById('input-proj-role-0');
let projectDate0 = document.getElementById('input-proj-date-0');
let projectBulletPoint = document.getElementById('input-proj-bullets-0');
let addProjectBtn = document.getElementById('btn-add-project');
// EDUCATION PART
let highest_attainment = document.getElementById('input-school');
let degree = document.getElementById('input-degree');
let grad_date = document.getElementById('input-grad-date');
let project = document.getElementById("input-academic-highlight");

// CV PREVIEW
let previewName = document.getElementById('preview-fullname');
let previewAddress = document.getElementById('preview-address');
let prevNumber = document.getElementById('preview-number');
let prevEmail = document.getElementById('preview-email');
let prevLinkedIn = document.getElementById('preview-linkedin');
let linkedInProfile = document.getElementById('linkedin-link');
let prevGithub = document.getElementById('preview-github');
let githubProfile = document.getElementById('github-link');
let prevRole = document.getElementById('preview-target-role');
let prevSummary = document.getElementById('preview-summary');

// PROFESSIONAL EXPERIENCE PART
let prevJob0 = document.getElementById('preview-exp-title-0');
let prevCompany0 = document.getElementById('preview-exp-role-0');
let prevJobDate0 = document.getElementById('preview-exp-date-0');
let prevJobBulletPoint = document.getElementById('preview-exp-bullets-0');

// TECHNICAL PROJECT PART
let prevProject0 = document.getElementById('preview-proj-title-0');
let prevRole0 = document.getElementById('preview-proj-role-0');
let prevProjectDate0 = document.getElementById('preview-proj-date-0');
let prevBulletPoint = document.getElementById('preview-proj-bullets-0');

// EDUCATION
let prev_highest =  document.getElementById('preview-school');
let prev_grad =  document.getElementById('preview-grad-date');
let prev_degree =  document.getElementById('preview-degree');
let prev_proj =  document.getElementById('preview-acad-highlight');


// Functions 
function inputData(inputs, prev){ // For inputs
    inputs.addEventListener('input', function(){
        prev.textContent = inputs.value;
    });
}

function titleChange(fn, inputs, prev){
    inputs.addEventListener('input', function(){
        const title = document.querySelector('title');
        title.textContent = inputs.value ? inputs.value.toUpperCase() : "Dynamic CV Builder" ;
    });
    fn(inputs, prev);
}

function addLink(input, anc){
    input.addEventListener('input', function(){
        anc.href = input.value;
        anc.title = input.value;
    });
}

function addCategory(btn){ // Category
    btn.addEventListener('click', function(){
        let section = document.querySelector('.skills');
        let form_group = document.createElement('div');
        form_group.classList.add('form-group');
        let category_label = document.createElement('label');
        category_label.textContent = 'Add Skill Title';
        let category_input = document.createElement('input');
        category_input.type = 'text';
        category_input.placeholder = "e.g. Programming Languages, Hardware"
        category_input.classList.add('skills-title');
        section.insertBefore(form_group, btn);
        form_group.appendChild(category_label);
        form_group.appendChild(category_input);
        
        // Call the addSkills() function
        addSkills(category_label, category_input);
    });
}

function addSkills(s_label, inputs){ // Skills
    inputs.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            // Parent element
            let form_group = inputs.parentElement; 

            // Preview section
            let p_holder = document.querySelector('.placeholder'); // placeholder text
            let prevSkills = document.getElementById('preview-skills'); // <ul></ul> element
            let list = document.createElement('li'); // Create <li></li> element
            let strong_title = document.createElement('strong'); // Making the label in bold font format
            let span = document.createElement('span');
            span.id = inputs.value.split(" ").join("-").toLowerCase();
            strong_title.textContent = `${inputs.value}: `; // Skill category title in bold format
            prevSkills.appendChild(list); // append to the preview skills list
            list.appendChild(strong_title); // append to the list element
            list.appendChild(span); // append to the list element

            // New input
            let label = document.createElement('label'); // Technical skills label
            let skills = document.createElement('input'); // User Skills input 
            skills.type = 'text'; // field type
            skills.id = inputs.value.split(" ").join('-').toLowerCase(); // field id
            skills.placeholder = "e.g. M.S. Word, English, AutoCAD"
            label.id = inputs.value; // label id 
            label.textContent = inputs.value; // label text

            // Check if p_holder still exists or not 
            if(p_holder){
                // Removing and appending new element
                p_holder.remove();
            }
            s_label.remove(); // remove the add skills label 
            inputs.remove(); // remove the add skills input and replace by new skills input field
            form_group.appendChild(label); // append to the parent element(form_group) 
            form_group.appendChild(skills); // append to the parent element(form_group) 

            
            inputData(skills, span);
        }
    });
}

function bulletPerLine(inputs, prev){
    inputs.addEventListener('input', function(){
        prev.innerHTML = "";
        let b_points = inputs.value.split(/\r?\n/)
                   .filter(line => line.trim() !== "").map(line => {
            let list = document.createElement('li');
            list.textContent = line.trim();
            prev.appendChild(list);

        });
    });
}

// Dynamic updating Ids
function updateIDs(name, count){
    name.forEach(element => {
        element.id = element.id.replace(/-\d+$/, `-${count}`);
    });
}

function addExperience(btn, type){ // Projects and technical experience
    let expCount = 0;
    btn.addEventListener('click', function(){
        // Increment the expCount
        expCount++;
        
        // Parent element (CV Form)
        let parent = document.getElementById(`${type}-inputs-container`);
        let card = document.querySelector('.hidden');
        card.removeAttribute("style");
        let clone = card.cloneNode(true);
        let cloneElements = clone.querySelectorAll('[id]');
        // Back to hidden
        card.setAttribute('style', 'display: none');

        // Looping to make dynamic id count
        updateIDs(cloneElements, expCount);

        // Append the form
        parent.appendChild(clone);

        // Parent element (Preview Side)
        let container = document.getElementById(`preview-${type}-list`);
        let listExp = document.querySelector(`.hidden-${type}-entry`);
        // Set to visible 
        listExp.removeAttribute('style');
        let cloneExp = listExp.cloneNode(true);
        cloneExp.classList.remove(`hidden-${type}-entry`);
        let elements = cloneExp.querySelectorAll('[id]');
        // Set back to default hidden
        listExp.setAttribute('style', 'display: none');

        // Looping to make dynamic count
        updateIDs(elements, expCount);
        
        // Insert the clone elements into descend mode 
        container.prepend(cloneExp);
        
        // Looping to make inputData() function works
        cloneElements.forEach((input, index) => {
            inputData(input, elements[index]);
        });

        // Call the bulletPerLine() function with the args of the last elements of the array
        bulletPerLine(cloneElements[cloneElements.length - 1], elements[elements.length - 1]);

    });
}

// Include Exp
function includeExp(id, classes){
    document.getElementById(id).addEventListener('change', function(e){
        const isChecked = e.target.checked;
        let expSection = document.querySelectorAll(`.${classes}`).forEach((element) =>  {
            element.style.display = isChecked ? 'block' : 'none';
        });

    });
}

// Info
titleChange(inputData, fullname, previewName);
inputData(address, previewAddress);
inputData(p_number, prevNumber);
inputData(email, prevEmail);
inputData(linkedinLink, prevLinkedIn);
addLink(linkedinLink, linkedInProfile);
inputData(githubLink, prevGithub);
addLink(githubLink, githubProfile);
inputData(role, prevRole);

// Summary part
inputData(summary, prevSummary);

// Add skills
addCategory(addSkillsBtn);

// Professional Summary 
includeExp('toggle-p_summary', 'p_summary');
// With Professional Exp or without
includeExp('toggle-experience', 'experience');
// Education 
includeExp('toggle-education', 'education');

// Professional Experience
inputData(jobTitle0, prevJob0);
inputData(jobCompany0, prevJobDate0);
inputData(jobDate0, prevJobDate0);
bulletPerLine(jobBulletPoint, prevJobBulletPoint);

// Technical Project
inputData(projectTitle0, prevProject0);
inputData(projectRole0, prevRole0);
inputData(projectDate0, prevProjectDate0);
bulletPerLine(projectBulletPoint, prevBulletPoint);

// Add Project/Technical skills
addExperience(addJobExpBtn, 'exp'); // Professional Experience
addExperience(addProjectBtn, 'project'); // Technical Projects
// EDUCATION
inputData(highest_attainment, prev_highest);
inputData(grad_date, prev_grad);
inputData(degree, prev_degree);
bulletPerLine(project, prev_proj);