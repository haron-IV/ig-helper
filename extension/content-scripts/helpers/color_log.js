const color_log = (txt, way) => {
    if(way == 'warning'){
        console.log(`%c ${txt}`, 'background: red; color: black')
    }

    if(way == 'tip'){
        console.log(`%c ${txt}`, 'background: gold; color: black')
    }

    if(way == 'info'){
        console.log(`%c ${txt}`, 'background: green; color: white')
    }

    if(way == 'test'){
        console.log(`%c ${txt}`, 'background: yellow; color: green')
    }
};

export default color_log;