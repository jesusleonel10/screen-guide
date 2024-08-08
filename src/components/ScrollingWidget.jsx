import { useEffect, Fragment } from 'react';

import './../scss/ScrollingWidget.scss'

const ScrollingWidget = ({children, showHeader, textHeader, region, flag, idWidget}) => {

    useEffect(() => {
        const SrollingEffect = (idWidget) => {
            const itemsScrolling = document.getElementById(`items-scrolling-${idWidget}`);
    
        let isDown = false;
        let startX;
        let startY;
        let scrollLeft;
        let scrollTop;
    
        itemsScrolling.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - itemsScrolling.offsetLeft;
        startY = e.pageY - itemsScrolling.offsetTop;
        scrollLeft = itemsScrolling.scrollLeft;
        scrollTop = itemsScrolling.scrollTop;
        itemsScrolling.style.cursor = 'grabbing';
        });
    
        itemsScrolling.addEventListener('mouseleave', () => {
        isDown = false;
        itemsScrolling.style.cursor = 'grab';
        });
    
        itemsScrolling.addEventListener('mouseup', () => {
        isDown = false;
        itemsScrolling.style.cursor = 'grab';
        });
    
        document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - itemsScrolling.offsetLeft;
        const y = e.pageY - itemsScrolling.offsetTop;
        const walkX = (x - startX) * 1; 
        const walkY = (y - startY) * 1; 
        itemsScrolling.scrollLeft = scrollLeft - walkX;
        itemsScrolling.scrollTop = scrollTop - walkY;
        });
    
        const scrollLeftButton = document.getElementById(
        `action-button--previous-${idWidget}`);
        const scrollRightButton = document.getElementById(
        `action-button--next-${idWidget}`);
    
        scrollLeftButton.addEventListener('click', () => {
            itemsScrolling.scrollBy({
                top: 0, 
                left: -200, 
                behavior: 'smooth'
            });
        });
    
        scrollRightButton.addEventListener('click', () => {
            itemsScrolling.scrollBy({
                top: 0, 
                left: 200, 
                behavior: 'smooth'
            });
        });
    
        itemsScrolling.addEventListener('scroll', () => {
            const position = itemsScrolling.scrollLeft;
            if (position === 0) {
            scrollLeftButton.disabled = true;
            } else {
            scrollLeftButton.disabled = false;
            }
    
            if (
            Math.round(position) === 
            itemsScrolling.scrollWidth - 
            itemsScrolling.clientWidth
            ) {
            scrollRightButton.disabled = true;
            } else {
            scrollRightButton.disabled = false;
            }
        });
        }

    SrollingEffect(idWidget)
        
    }, [idWidget]);
    
    return (
        <div className="container-scrolling" >
            <div className="action-buttons">
                {
                showHeader ?
                <Fragment>
                    <h3>{textHeader}</h3>
                    {
                    flag ?
                        <img
                            src={`https://flagcdn.com/w20/${region}.png`}
                            // srcSet={`https://flagcdn.com/w40/${region}.png 2x`}
                            width="22"
                            alt="">
                        </img>
                        : null
                    }
                </Fragment>
                    : null
                }
                <button type="button" disabled id={`action-button--previous-${idWidget}`} className="action-button--previous action-button--horizontal-scroll">
                    <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
                </button>
                <button type="button" id={`action-button--next-${idWidget}`} className="action-button--next action-button--horizontal-scroll">
                    <svg width="16" height="16" fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z"></path></svg>
                </button>
            </div>
            <div id={`items-scrolling-${idWidget}`} className='items-scrolling'>
                {/* Aqui van cada item para scrollear, cada debe llevar la clase .item */}
                {children}
            </div>
        </div>
    );
}
 
export default ScrollingWidget;

