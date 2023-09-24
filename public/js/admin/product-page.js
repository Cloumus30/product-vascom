export default (
    window.addEventListener('load', ()=>{
        const imgInp = document.getElementById('image-inp');
        const uploadForm = document.getElementById('img-upload');

        if (uploadForm && imgInp){
            uploadForm.addEventListener('click', (ev)=>{
                imgInp.click()
            })
    
            imgInp.addEventListener('change', (ev)=>{
                // uploadForm.hidden = true;
                const imgPreview = document.getElementById('img-preview')
                const [file] = imgInp.files
                if(file){
                    const img = URL.createObjectURL(file)
                    imgPreview.hidden = false
                    imgPreview.src = img
                    console.log(img)
                }
            })
        }
    })
)