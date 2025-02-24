const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isShow, setIsShow] = useState(false)

    function onToggleIsShowLong() {
        setIsShow(prevIsShow => !prevIsShow)
    }

    const isLongText = txt.length > length
    const textToShow = isShow ? txt : (txt.substring(0, length))
    return (
        <section className="long-txt">
            <h4>
                {textToShow}
                {isLongText &&
                    <button onClick={onToggleIsShowLong}>
                        {isShow ? ' Less...' : ' More...'}
                    </button>
                }
            </h4>
        </section>
    );
}