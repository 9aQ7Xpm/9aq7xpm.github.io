fetch('../log.json')
    .then(res => {
        if(!res.ok) throw new Error('Cannot fetch.');
        return res.json()
    })
    .then(data => {
        const info = data[0];
        let alertTip = `Version:${info.Version}\n`;
        for (let i = 1; i <= Object.keys(info.Context).length; i++){
            alertTip += `${i}.${info.Context[i]}\n`;
        }
        alert(alertTip);
    })
    .catch(error => {
        console.error('Failure, reason:', error);
    })