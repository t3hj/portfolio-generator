document.getElementById('addExperience').addEventListener('click', function() {
    const experienceList = document.getElementById('experienceList');
    const newExperience = document.createElement('div');
    newExperience.innerHTML = `
        <input type="text" placeholder="Job Title (e.g., Junior Accountant)">
        <input type="text" placeholder="Company (e.g., ABC Company, Marseilles, France)">
        <input type="text" placeholder="Duration (e.g., Jan 2017 – Sept 2019)">
        <textarea placeholder="Description"></textarea>
    `;
    experienceList.appendChild(newExperience);
});

document.getElementById('addEducation').addEventListener('click', function() {
    const educationList = document.getElementById('educationList');
    const newEducation = document.createElement('div');
    newEducation.innerHTML = `
        <input type="text" placeholder="Degree (e.g., Degree in Accounting and Finance)">
        <input type="text" placeholder="Institution (e.g., University of Bordeaux, France)">
        <input type="text" placeholder="Year (e.g., Sept 2014 – June 2017)">
    `;
    educationList.appendChild(newEducation);
});

document.getElementById('generatePortfolio').addEventListener('click', function() {
    const profileImageInput = document.getElementById('profileImage');
    const profileImage = profileImageInput.files[0];
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const languages = document.getElementById('languages').value;
    const hobbies = document.getElementById('hobbies').value;
    const summary = document.getElementById('summary').value;
    const certificates = document.getElementById('certificates').value;

    const experienceList = Array.from(document.getElementById('experienceList').children).map(exp => `
        <div class="box">
            <h3>${exp.children[0].value}</h3>
            <p><strong>Company:</strong> ${exp.children[1].value}</p>
            <p><strong>Duration:</strong> ${exp.children[2].value}</p>
            <p>${exp.children[3].value}</p>
        </div>
    `).join('');

    const educationList = Array.from(document.getElementById('educationList').children).map(edu => `
        <div class="box">
            <h3>${edu.children[0].value}</h3>
            <p><strong>Institution:</strong> ${edu.children[1].value}</p>
            <p><strong>Year:</strong> ${edu.children[2].value}</p>
        </div>
    `).join('');

    const reader = new FileReader();
    reader.onload = function(e) {
        const portfolioContent = `
            <div class="box personal-info">
                <div>
                    <h3 style="background-color: #007bff; color: #fff; padding: 5px;">Personal Information</h3>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <div class="social-media-box">
                        <h3>Social Media</h3>
                        <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                        <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
                    </div>
                </div>
                <img id="portfolioImage" src="${e.target.result}" alt="Profile Image" style="max-width: 150px;">
            </div>
            <div class="box">
                <h3>Profile Summary</h3>
                <p>${summary}</p>
            </div>
            <div class="box">
                <h3>Professional Experience</h3>
                ${experienceList}
            </div>
            <div class="box">
                <h3>Education</h3>
                ${educationList}
            </div>
            <div class="box">
                <h3>Skills & Interests</h3>
                <p><strong>Languages:</strong> ${languages}</p>
                <p><strong>Hobbies:</strong> ${hobbies}</p>
            </div>
            <div class="box">
                <h3>Certificates</h3>
                <p>${certificates}</p>
            </div>
        `;

        document.getElementById('portfolioContent').innerHTML = portfolioContent;
        document.getElementById('portfolioDisplay').classList.remove('hidden');
        document.getElementById('portfolioName').innerText = name; // Ensure the name is set here
    };

    if (profileImage) {
        reader.readAsDataURL(profileImage);
    } else {
        reader.onload({ target: { result: '' } });
    }
});

document.getElementById('downloadPortfolio').addEventListener('click', function() {
    const element = document.getElementById('portfolioDisplay');
    const downloadButton = document.getElementById('downloadPortfolio');
    downloadButton.style.display = 'none'; // Hide the button before generating the PDF
    html2pdf().from(element).save('portfolio.pdf').then(() => {
        downloadButton.style.display = 'block'; // Show the button again after generating the PDF
    });
});
