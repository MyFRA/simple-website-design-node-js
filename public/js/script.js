// Row design
let rowDesign = document.querySelector('.row-content-wrapper-design');


// Upload Design
    var file = document.getElementById('upload-design');
    file.onchange = (e) => {
        if(file.value != undefined) {
            const form = document.getElementById('form-upload-design');
            form.setAttribute('action', '/user/upload-design');
            form.setAttribute('method', 'POST');
            form.submit();
        }
    }
