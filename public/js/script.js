// Row design
let rowDesign = document.querySelector('.row-content-wrapper-design');


// Upload Design
    const previewImageUploadDesign = document.getElementById('image-upload-design-preview');
    const inputFileUploadDesign = document.getElementById('input-file-upload-design')

    // onchange
    inputFileUploadDesign.addEventListener('change', () => {
        // var file = this.files[0];
        const file = inputFileUploadDesign.files[0];

        // object url
        _PREVIEW_URL = URL.createObjectURL(file);

        // set src of image and show
        previewImageUploadDesign.setAttribute('src', _PREVIEW_URL);
        previewImageUploadDesign.style.display = 'inline-block';
    }) ;