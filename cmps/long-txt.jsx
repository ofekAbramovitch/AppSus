const { useState } = React

export function LongTxt({txt, length = 100}) {
    const [isRenderAll, setIsRenderAll] = useState(false)

    function renderTxt() {
        if(!txt) return
        const lengthTxt = txt.length
        if(length >= lengthTxt || isRenderAll) return txt
        else {
            while(length < lengthTxt && txt.charAt(length) !== ' ') length++
            return txt.slice(0, length)
        }
    }

    return <div>
        <div>{renderTxt()}</div>
        <div className="toggle-txt" onClick={() => setIsRenderAll(prevIsRenderAll => !prevIsRenderAll)}>{isRenderAll ? 'less' : 'more'}</div>
    </div>
}