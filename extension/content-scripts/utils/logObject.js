const logObj = () => {
    console.json = object => console.log(JSON.stringify(object, undefined, 2));
};

export default logObj;