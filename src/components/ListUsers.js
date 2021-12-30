import React, { useState, useEffect } from 'react'

const ListUsers = (props) => {

    const [data, setData] = useState(props)
    console.log(data)

    useEffect(() => {
        console.log(data.users)
        
    }, [])

    return (
        <div>
            <div> 
                <div> {/* tbody */}
                    <div className="table"> {/*tr*/}
                        <div className='td'>Nome</div>
                         <div className='td'>Valor</div>
                         <div className='td'>Já é cliente?</div>
                    </div> 
                </div>
                
                {/*tbody*/}
                <div>
                    {data.users.length > 0 ? (
                        data.users.map((user) => (
                        <div className="table" key={user.id}> {/*tr*/}
                            <div className='td'>{user.name}</div> 
                            <div className='td'>{user.buy}</div> 
                            <div className='td'>{user.renovation}</div> 
                        </div> 
                        ))
                    ) : (
                        <div>
                            <div>Sem registro</div>
                        </div>
                    )}
                </div> 

            </div>
        </div>
    )
}

export default ListUsers