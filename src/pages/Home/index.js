import React, { useEffect, useState } from 'react'
import { message, Table, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { GetAllMovies } from '../../apicalls/movies';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading())

    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div>
      <input type="text"
        className="search-input"
        placeholder='Search for movies'
      />
      <Row
        gutter={[20]}
        className="mt-2">
        {movies.map((movie) => (
          <Col span={6}>
            <div className="card flex flex-col gap-1 cursor-pointer"
            onClick={() => 
              navigate(
              `/movie/${movie._id}?date=${moment().format('YYYY-MM-DD')}`
              )}>
            
              <img src={movie.poster} alt="" height={200} />
              <div className="flex justify-centre p-1">
                <h1 className="text-md uppercase">
                  {movie.title}
                </h1>
              </div>
            </div>
          </Col>
        ))}

      </Row>
    </div>
  )
}

export default Home
