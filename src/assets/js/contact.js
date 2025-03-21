document.addEventListener('DOMContentLoaded', () => {
    // Hide the alert box initially
    const alertBox = document.getElementById('alert-form');
    alertBox.style.display = 'none';

    const loadingSpinner = document.getElementById('loading-btn');
    loadingSpinner.style.display = 'none';
    
});

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the alert and spinner element
    const alertBox = document.getElementById('alert-form');
    const loadingSpinner = document.getElementById('loading-btn');

    loadingSpinner.style.display = 'block';
    loadingSpinner.innerHTML = `
                      <div class="spinner-border text-primary m-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>`;
    
    // Build the payload from form inputs
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        recaptchaToken: document.getElementById('recaptchaToken').value
    };

    try {
        const response = await fetch('https://edtorrapim.azure-api.net/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show success alert
            loadingSpinner.style.display = 'none';
            loadingSpinner.innerHTML = '';
            alertBox.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show"><strong>Brilliant!</strong> Your message was successfully submitted to the vortex of the universe. 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
            `;

            console.log(response);
        } else {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
    } catch (error) {
        // Show error alert
        loadingSpinner.innerHTML = '';
        alertBox.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show mb-0"><strong>I'm Sorry, I'm So Sorry</strong> Something went a bit wibbly-wobbly. Tweak a few bits and try submitting again.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
        `;
    }

    // Display the alert box
    alertBox.style.display = 'block';
});