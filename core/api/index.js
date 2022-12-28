const base = 'http://localhost:3001/'
const getList = () => {
    fetch('/candidate')
        .then((data) => {
            console.log(data)
        }).catch(e => {
        console.log(e)
    })
}