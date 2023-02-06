

const timer = (seconds) => {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
}

let thisFile = 0;
(async () => {
    while (true) {

        let r = await axios.get('http://localhost:8080/filename')
        let files = r.data.arr
        for (const file of files) {
            var durationTime = file.slice(0, -3).split('').filter(function (ele) {
                return !isNaN(ele);
            }).join('')
            if (file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.jpg')) {
                video.style.display = 'none'
                img.style.display = 'block'
                img.setAttribute('src', `../public/arquivos/${file}`)
            } else {
                img.style.display = 'none'
                video.style.display = 'block'
                video.setAttribute('src', `../public/arquivos/${file}`)
            }
            await timer(durationTime)
        }


    }

})()

