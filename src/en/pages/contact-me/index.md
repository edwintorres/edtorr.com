---
layout: layouts/readme.njk
title: Contact me
author: Edwin Torres
date: 2025-03-04
description: Edwin Torres
toc: false
tocIntro: ""
headerImage: 
headerImageAlt: 
eleventyNavigation:
  key: Contact me
  parent: en
  order: 4
locale: en
translation: /es/pages/contactame/
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
                <label class="form-label">Name: <span class="text-danger">*</span></label>
                <div class="form-icon position-relative">
                    <i data-feather="user" class="fea icon-sm icons"></i>
                    <input name="name" id="name" type="text" class="form-control ps-5" placeholder="Your name..." required>
                </div>
            </div>
        </div><!--end col-->
        <div class="col-md-6">
            <div class="mb-3">
                <label class="form-label">Email: <span class="text-danger">*</span></label>
                <div class="form-icon position-relative">
                    <i data-feather="mail" class="fea icon-sm icons"></i>
                    <input name="email" id="email" type="email" class="form-control ps-5" placeholder="Your email..."
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required>
                </div>
            </div> 
        </div><!--end col-->
        <div class="col-md-12">
            <div class="mb-3">
                <label class="form-label">Comments: <span class="text-danger">*</span></label>
                <div class="form-icon position-relative">
                    <i data-feather="message-circle" class="fea icon-sm icons"></i>
                    <textarea name="message" id="message" rows="4" class="form-control ps-5" placeholder="Your message..." required></textarea>
                </div>
            </div>
        </div>
    </div><!--end row-->
    <div class="row">
        <div class="col-sm-12" >
            <div class="d-flex align-items-center">
                <div>
                    <input type="submit" id="submit" name="send" class="btn btn-primary" value="{{ collections.t[locale].sendMessage }}">
                </div>
                <div id="loading-btn">
                    <div class="spinner-border text-primary m-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div><!--end col-->
    </div><!--end row-->

</form>
<script src="{{ '/assets/js/contact.js' | hash }}"></script>

