import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import SingleTour from './SingleTour'
import Loading from './Loading'
import Error from './Error'

const Dashboard = () => {
  const url = 'https://course-api.com/react-tours-project'
  const [tours, setTours] = useState([])
  const [loading, SetLoading] = useState(false)
  const [error, SetError] = useState(false)
  const removeFromList = (id) => {
    setTours(tours.filter((tour) => id !== tour.id))
  }
  const fetchData = async () => {
    SetLoading(true)
    SetError(false)
    try {
      const datafetch = await fetch(url)
      const response = await datafetch.json()
      SetLoading(false)
      setTours(response)
    } catch (error) {
      SetLoading(false)
      SetError(true)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <section>
      <div className='title'>
        <h1>Our tours</h1>
        <div className='underline'></div>
        <div className='content'>
          {tours.map((tour) => {
            return (
              <SingleTour
                key={tour.id}
                {...tour}
                handleDelete={removeFromList}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Dashboard
