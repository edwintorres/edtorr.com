---
layout: layouts/readme.njk
title: Contáctame
author: Edwin Torres
date: 2025-03-04
description: Edwin Torres
toc: false
tocIntro: ""
headerImage: 
headerImageAlt: 
eleventyNavigation:
  key: Contáctame
  parent: es
  order: 4
locale: es
translation: /en/pages/contact-me/
templateClass: tmpl-post
---

<div id="alert-form" >
</div>
<form id="contactForm">
    <!-- Hidden input to store the reCAPTCHA token -->
    <input id="recaptchaToken" name="recaptchaToken" type="hidden" />
    <div class="row mt-2">
        <div class="col-md-6">
            <div class="mb-3">
                <label class="form-label">Nombre: <span class="text-danger">*</span></label>
                <div class="form-icon position-relative">
                    <i data-feather="user" class="fea icon-sm icons"></i>
                    <input name="name" id="name" type="text" class="form-control ps-5" placeholder="Tu nombre..." required>
                </div>
            </div>
        </div><!--end col-->
        <div class="col-md-6">
            <div class="mb-3">
                <label class="form-label">Correo: <span class="text-danger">*</span></label>
                <div class="form-icon position-relative">
                    <i data-feather="mail" class="fea icon-sm icons"></i>
                    <input name="email" id="email" type="email" class="form-control ps-5" placeholder="Tu correo..."
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required>
                </div>
            </div> 
        </div><!--end col-->
        <div class="col-md-12">
            <div class="mb-3">
                <label class="form-label">Comentarios: <span class="text-danger">*</span></label>
                <div class="form-icon position-relative">
                    <i data-feather="message-circle" class="fea icon-sm icons"></i>
                    <textarea name="message" id="message" rows="4" class="form-control ps-5" placeholder="Tu mensaje..." required></textarea>
                </div>
            </div>
        </div>
    </div><!--end row-->
    <div class="row">
        <div class="col-sm-12">
            <input type="submit" id="submit" name="send" class="btn btn-primary" value="{{ collections.t[locale].sendMessage }}">
        </div><!--end col-->
    </div><!--end row-->
</form>


<script>

    document.addEventListener('DOMContentLoaded', () => {
        // Hide the alert box initially
        const alertBox = document.getElementById('alert-form');
        alertBox.style.display = 'none';
    });

    document.getElementById('contactForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get the alert element
        const alertBox = document.getElementById('alert-form');
        
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Show success alert
                alertBox.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show"><strong>Well done!</strong> You successfully read this important alert message.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
                `;
            } else {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
        } catch (error) {
            // Show error alert
            alertBox.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show mb-0"><strong>Oh snap!</strong> Change a few things up and try submitting again.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>
            `;
        }

        // Display the alert box
        alertBox.style.display = 'block';
    });

</script>