const timer = (seconds) => {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
}

let thisFile = 0;
(async () => {
    while (true) {
        let r = await axios.get('http://localhost:8080/filename')
        let files = r.data.arr
        for (let file of files) {
            var durationTime = file.slice(0, -3).split('').filter(function (ele) {
                return !isNaN(ele);
            }).join('')
            file = file.toUpperCase()
            if (file.endsWith('.PNG') || file.endsWith('.JPEG') || file.endsWith('.JPG')) {
                video.setAttribute('src', ``)
                video.style.display = 'none'
                img.style.display = 'block'
                img.setAttribute('src', `../public/arquivos/${file}`)
            } else if (file.endsWith('.MP4')) {
                img.setAttribute('src', ``)
                img.style.display = 'none'
                video.style.display = 'block'
                video.setAttribute('src', `../public/arquivos/${file}`)
                video.setAttribute('type', `video/mp4`)

            }
            else if (file.endsWith('.WEBM')) {
                img.setAttribute('src', ``)
                img.style.display = 'none'
                video.style.display = 'block'
                video.setAttribute('src', `../public/arquivos/${file}`)
                video.setAttribute('type', `video/webm; codecs=vp9`)
            }
            else {
                durationTime = 0
            }
            await timer(durationTime)
        }
    }

})()

