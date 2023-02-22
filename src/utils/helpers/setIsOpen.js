export const setIsOpen = (obj) => {

    function serve(obj) {
        for (let key in obj) {
            if (!Array.isArray(obj[key])) {
                obj.isOpen = false
            } else {
                obj[key].forEach(el => {
                    serve(el)
                });
            }
            
        }
    }
    serve(obj)
    return obj
}