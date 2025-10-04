const contactConfig = window.contactFormConfig || {};
const CONTACT_ENDPOINT = contactConfig.endpoint || '/api/contact.php';
const RECAPTCHA_SITE_KEY = contactConfig.recaptchaSiteKey || '';

const form = document.getElementById('contactForm');
const alertBox = document.getElementById('alert-form');
const loadingSpinner = document.getElementById('loading-btn');
const recaptchaInput = document.getElementById('recaptchaToken');

const spinnerMarkup = `
    <div class="spinner-border text-primary m-2" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;

function toggleSpinner(show) {
    if (!loadingSpinner) return;

    if (show) {
        loadingSpinner.style.display = 'block';
        loadingSpinner.innerHTML = spinnerMarkup;
    } else {
        loadingSpinner.style.display = 'none';
        loadingSpinner.innerHTML = '';
    }
}

function renderAlert(type, message) {
    if (!alertBox) return;

    const variants = {
        success: {
            strong: 'Brilliant!',
            body: message || 'Your message was successfully submitted to the vortex of the universe.'
        },
        danger: {
            strong: "I'm Sorry, I'm So Sorry",
            body: message || 'Something went a bit wibbly-wobbly. Tweak a few bits and try submitting again.'
        }
    };

    const copy = variants[type] || variants.danger;
    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mb-0">
            <strong>${copy.strong}</strong> ${copy.body}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertBox.style.display = 'block';
}

function refreshRecaptchaToken(action = 'contact') {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha || !recaptchaInput) {
        return Promise.resolve('');
    }

    return new Promise((resolve) => {
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(RECAPTCHA_SITE_KEY, { action })
                .then((token) => {
                    recaptchaInput.value = token || '';
                    resolve(token || '');
                })
                .catch((error) => {
                    console.error('reCAPTCHA execution failed', error);
                    recaptchaInput.value = '';
                    resolve('');
                });
        });
    });
}

async function initialize() {
    if (alertBox) {
        alertBox.style.display = 'none';
        alertBox.innerHTML = '';
    }
    toggleSpinner(false);

    if (RECAPTCHA_SITE_KEY) {
        await refreshRecaptchaToken();
    }
}

document.addEventListener('DOMContentLoaded', initialize);

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        alertBox && (alertBox.style.display = 'none');
        toggleSpinner(true);

        await refreshRecaptchaToken();

        const requestPayload = {
            name: form.querySelector('#name')?.value?.trim() || '',
            email: form.querySelector('#email')?.value?.trim() || '',
            message: form.querySelector('#message')?.value?.trim() || '',
            recaptchaToken: recaptchaInput ? recaptchaInput.value : ''
        };

        try {
            const response = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestPayload)
            });

            const text = await response.text().catch(() => '');
            const isJson = response.headers.get('content-type')?.includes('application/json');
            let parsedPayload = {};

            if (isJson && text) {
                try {
                    parsedPayload = JSON.parse(text);
                } catch (parseError) {
                    console.error('Failed to parse response JSON', parseError, text);
                }
            }

            if (!response.ok || parsedPayload.status !== 'ok') {
                const errorMessage = parsedPayload?.error || (isJson ? `Request failed: ${response.status}` : text || `Request failed: ${response.status}`);
                throw new Error(errorMessage);
            }

            form.reset();
            renderAlert('success');
        } catch (error) {
            console.error('Contact form submission failed', error);
            const message = error?.message && error.message !== '[object Object]' ? error.message : '';
            renderAlert('danger', message);
        } finally {
            toggleSpinner(false);
            await refreshRecaptchaToken();
        }
    });
}
