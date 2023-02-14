const timer = (seconds) => {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
}
(async () => {
    while (true) {
        let r = await axios.get('http://localhost:8080/filename')
        let files = r.data.files
        if (files == 'reload') {
            window.location.reload()
        }
        for (let file of files) {
            if (file.fileType == 'image') {
                video.setAttribute('src', ``)
                video.style.display = 'none'
                img.style.display = 'block'
                img.setAttribute('src', `../public/arquivos/${file.filePath}`)
            } else if (file.fileType == 'mp4') {
                img.setAttribute('src', ``)
                img.style.display = 'none'
                video.style.display = 'block'
                video.setAttribute('src', `../public/arquivos/${file.filePath}`)
                video.setAttribute('type', `video/mp4`)
            } else if (file.fileType == 'webm') {
                img.setAttribute('src', ``)
                img.style.display = 'none'
                video.style.display = 'block'
                video.setAttribute('src', `../public/arquivos/${file.filePath}`)
                video.setAttribute('type', `video/webm; codecs=vp9`)
            }
            await timer(file.fileDurationTime)
        }
    }
})()
