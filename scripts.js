// CV FORM
let fullname = document.getElementById('input-fullname');
let address = document.getElementById('input-address');
let p_number = document.getElementById('input-number');
let email = document.getElementById('input-email');
let linkedin = document.getElementById('input-linkedin');
let github = document.getElementById('input-github');
let summary = document.getElementById('input-summary');
let addSkillsBtn = document.getElementById('btn-add-categories');
let addSkillsLabel = document.querySelector('.skills-title');
let projectTitle0 = document.getElementById('input-proj-title-0');
let projectRole0 = document.getElementById('input-proj-role-0');
let projectDate0 = document.getElementById('input-proj-date-0');
let projectBulletPoint = document.getElementById('input-proj-bullets-0');
let addProjectBtn = document.getElementById('btn-add-project');
// EDUCATION PART
let input_prim_school=  document.getElementById('input-primary-school');
let prim_grad_date =  document.getElementById('input-primary-grad-date');
let input_jhs=  document.getElementById('input-jhs');
let jhs_grad_date =  document.getElementById('input-jhs-grad-date');
let input_shs=  document.getElementById('input-shs');
let input_shs_strand = document.getElementById('input-strand');
let shs_grad_date = document.getElementById('input-shs-grad-date');
let input_tertiary = document.getElementById('input-school');
let tertiary_degree = document.getElementById('input-degree');
let tertiary_grad_date = document.getElementById('input-grad-date');

// CV PREVIEW
let previewName = document.getElementById('preview-fullname');
let previewAddress = document.getElementById('preview-address');
let prevNumber = document.getElementById('preview-number');
let prevEmail = document.getElementById('preview-email');
let prevLinkedIn = document.getElementById('preview-linkedin');
let prevGithub = document.getElementById('preview-github');
let prevSummary = document.getElementById('preview-summary');

// PROJECT EXPERIENCE PART
let prevProject0 = document.getElementById('preview-proj-title-0');
let prevRole0 = document.getElementById('preview-proj-role-0');
let prevProjectDate0 = document.getElementById('preview-proj-date-0');
let prevBulletPoint = document.getElementById('preview-proj-bullets-0');

// EDUCATION
let prev_tertiary =  document.getElementById('preview-school');
let prev_ter_grad =  document.getElementById('preview-grad-date');
let prev_ter_degree =  document.getElementById('preview-degree');
let prev_shs =  document.getElementById('preview-shs');
let prev_shs_grad =  document.getElementById('preview-shs-grad-date');
let prev_shs_strand =  document.getElementById('preview-strand');
let prev_jhs =  document.getElementById('preview-jhs');
let prev_jhs_grad =  document.getElementById('preview-jhs-grad-date');
let prev_primary =  document.getElementById('preview-primary-school');
let prev_prim_grad =  document.getElementById('preview-primary-grad-date');

// Functions 
function inputData(inputs, prev){ // For inputs
    inputs.addEventListener('keyup', function(){
        prev.textContent = inputs.value;
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
            skills.placeholder = "e.g. M.S. Word, English, etc."
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
    inputs.addEventListener('keyup', function(){
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

function addExperience(btn){ // Projects and technical experience
    let expCount = 0;
    btn.addEventListener('click', function(){
        // Increment the expCount
        expCount++;
        
        // Parent element (CV Form)
        let parent = document.getElementById('project-inputs-container');
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
        let container = document.getElementById('preview-projects-list');
        let listExp = document.querySelector('.hidden-entry');
        // Set to visible 
        listExp.removeAttribute('style');
        let cloneExp = listExp.cloneNode(true);
        cloneExp.classList.remove('hidden-entry');
        let elements = cloneExp.querySelectorAll('[id]');
        // Set back to default hidden
        listExp.setAttribute('style', 'display: none');

        // Looping to make dynamic count
        updateIDs(elements, expCount);
        
        // insert the clone elements into descend mode 
        container.prepend(cloneExp);
        
        // Looping to make inputData() function works
        cloneElements.forEach((input, index) => {
            inputData(input, elements[index]);
        });

        // Call the bulletPerLine() function with the args of the last elements of the array
        bulletPerLine(cloneElements[cloneElements.length - 1], elements[elements.length - 1]);

    });
}

// Education

// Info
inputData(fullname, previewName);
inputData(address, previewAddress);
inputData(p_number, prevNumber);
inputData(email, prevEmail);
inputData(linkedin, prevLinkedIn);
inputData(github, prevGithub);

// Summary part
inputData(summary, prevSummary);

// Add skills
addCategory(addSkillsBtn);

// Project/Experience
inputData(projectTitle0, prevProject0);
inputData(projectRole0, prevRole0);
inputData(projectDate0, prevProjectDate0);
bulletPerLine(projectBulletPoint, prevBulletPoint);

// Add Project/Technical skills
addExperience(addProjectBtn);

// EDUCATION
inputData(input_prim_school, prev_primary);
inputData(prim_grad_date, prev_prim_grad);
inputData(input_jhs, prev_jhs);
inputData(jhs_grad_date, prev_jhs_grad);
inputData(input_shs, prev_shs);
inputData(shs_grad_date, prev_shs_grad);
inputData(input_shs_strand, prev_shs_strand);
inputData(input_tertiary, prev_tertiary);
inputData(tertiary_grad_date, prev_ter_grad);
inputData(tertiary_degree, prev_ter_degree);