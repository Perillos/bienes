import { Dropzone } from 'dropzone'


Dropzone.options.image = {
    dictDefaultMessage: 'Sube tus imágenes aquí',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 5,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar',
    dictMaxFilesExceede: 'El límite son 5 imagenes a la vez',
    paramName: 'image',
    init: function() {
        const dropzone = this
        const btnPublish = document.querySelector('#publicar')

        btnPublish.addEventListener('click', function () {
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function() {
            if (dropzone.getActiveFiles().length == 0) {
                window.location.href = '/mis-propiedades'
            }
        })
    }
}