import React, { useEffect, useRef } from 'react'
import { Search, DownUp } from '../../icons'
import './style.css'

const Matrix = () => {
    const [items, setItems] = React.useState([])
    const searchInputRef = useRef()

    React.useEffect(() => {
        const getItems = async () => {
            const res =  await fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10').then(data => data.json())

            setItems(res)
        } 
        getItems()
    }, [])

    const onHandleClick = () => {
        const getItems = async () => {
            const res =  await fetch(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10&q=${searchInputRef.current.value}`).then(data => data.json())

            setItems(res)
        } 
        getItems()
    }

    //https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10&_sort=title&_order=asc

    return (
    <div className='content'>
       <div className="search">
            <input ref={searchInputRef} className="search__input" placeholder='Поиск' type="text" />
            <div onClick={onHandleClick}>
                <Search />
            </div>
       </div>
       <div className="main">
            <div className="main__header">
                <div className="header__id">
                    <p>ID</p>
                    <DownUp />
                </div>
                <div className="header__name">
                    <p>Заголовок</p>
                    <DownUp />
                </div>
                <div className="header__body">
                    <p>Описание</p>
                    <DownUp />
                </div>
            </div>
            <div className="main__table">
                {items[0] && items.map(item => (
                    <div key={item.id} className="table__item">
                        <div className="item__id">
                            <p>{item.id}</p>
                        </div>
                        <div className="item__name">
                            <p>{item.title}</p>
                        </div>
                        <div className="item__body">
                            <p>{item.body}</p>
                        </div>
                    </div>
                ))}
                
            </div>
       </div>
       <div className="paginations">
            <div className="paginations__before">
            Назад
            </div>
            <div className="paginations__pages">
                <div className="pages__item pages__item_active">1</div>
                <div className="pages__item">2</div>
                <div className="pages__item">3</div>
                <div className="pages__item">4</div>
                <div className="pages__item">5</div>
            </div>
            <div className="paginations__after">
                Далее
            </div>
       </div>
    </div>
    
    )
}

export default Matrix