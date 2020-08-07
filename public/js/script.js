// Row design
let rowDesign = document.querySelector('.row-content-wrapper-design');


// Upload Design
if(document.getElementById('image-upload-design-preview') !== null && document.getElementById('input-file-upload-design') !== null) {
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
}


// Function add stylesheet
const addNewCss = (href) => {
    let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    head.appendChild(link);
}

// Move element with id new_script into real javascript section with id is script
if(document.getElementById('new_script') !== null) {
    const scriptSection = document.getElementById('script');
    const newScript =  [...document.getElementById('new_script').children];
    newScript.forEach((e) => {
        scriptSection.appendChild(e);
    });
}

// Move element with id new_stylesheet into head tag
if(document.getElementById('new_stylesheet') !== null) {
    const head  = document.getElementsByTagName('head')[0];
    const newStylesheet = [...document.getElementById('new_stylesheet').children]
    newStylesheet.forEach((e) => {
        head.appendChild(e);
    });
}